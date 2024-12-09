import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import NodeCache from 'node-cache';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import helmet from 'helmet';

// Load environment variables
import dotenv from 'dotenv';

// Load the backend-specific environment variables
dotenv.config({ path: '../../.env' });

const app = express();

// Enhanced cache configuration
const cache = new NodeCache({ 
  stdTTL: 300,
  checkperiod: 320,
  useClones: false,
  deleteOnExpire: true
});

// Add token blacklist cache
const tokenBlacklist = new NodeCache({ 
  stdTTL: 24 * 60 * 60, // 24 hours
  checkperiod: 600 // Clean up every 10 minutes
});

// Security and optimization middleware
app.use(helmet());
app.use(compression());

// Enhanced rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true
});

// Endpoint-specific rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 requests per 15 minutes for auth endpoints
  message: { error: 'Too many authentication attempts, please try again later' }
});

// Enhanced security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://api.github.com'],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "same-site" }
}));

// Optimized CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600
};
app.use(cors(corsOptions));

app.use(express.json()); 

// Validate required environment variables
const requiredEnvs = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'GITHUB_REDIRECT_URI'];
requiredEnvs.forEach(env => {
  if (!process.env[env]) {
    console.error(`ERROR: Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

// Add health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Middleware to check token blacklist
const checkTokenBlacklist = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token && tokenBlacklist.get(token)) {
    return res.status(401).json({ error: 'Token is revoked' });
  }
  next();
};

// Add token to blacklist on logout
app.post('/github/logout', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    tokenBlacklist.set(token, true);
  }
  res.json({ success: true });
});

// Optimized OAuth callback route
app.post('/github/oauth/callback', authLimiter, limiter, async (req, res) => {
  const { code, state } = req.body;
  
  if (!code || !state) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const cacheKey = `oauth_${code}_${state}`;
  const cachedResponse = cache.get(cacheKey);
  
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  try {
    const tokenResponse = await Promise.race([
      fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: process.env.GITHUB_REDIRECT_URI,
          state,
        }),
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Token request timeout')), 5000)
      )
    ]);

    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      cache.set(cacheKey, { access_token: tokenData.access_token });
    }

    return res.json(tokenData);
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Optimized user info endpoint
app.get('/github/user', checkTokenBlacklist, async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  const cacheKey = `user_${authHeader.slice(-32)}`;  // Only use part of token for key
  const cachedUser = cache.get(cacheKey);
  
  if (cachedUser) {
    return res.json(cachedUser);
  }

  try {
    const userResponse = await Promise.race([
      fetch('https://api.github.com/user', {
        headers: { 'Authorization': authHeader }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('User info request timeout')), 5000)
      )
    ]);

    const userData = await userResponse.json();
    cache.set(cacheKey, userData);
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Failed to fetch user information' });
  }
});

// Add token validation endpoint
app.post('/github/validate-token', checkTokenBlacklist, async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ valid: false });
  }

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': authHeader }
    });

    if (response.status === 401) {
      return res.json({ valid: false });
    }

    return res.json({ valid: true });
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(500).json({ valid: false });
  }
});

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Connected to frontend: ${process.env.FRONTEND_URL}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  cache.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
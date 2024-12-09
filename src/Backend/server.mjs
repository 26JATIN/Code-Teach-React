import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import NodeCache from 'node-cache';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// Load environment variables
import dotenv from 'dotenv';

// Load the backend-specific environment variables
dotenv.config({ path: '../../.env' });

const app = express();

// Enable trust proxy before other middleware
app.set('trust proxy', 1);

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
  skipSuccessfulRequests: true,
  // Add trusted proxy configuration
  trustProxy: true
});

// Endpoint-specific rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 requests per 15 minutes for auth endpoints
  message: { error: 'Too many authentication attempts, please try again later' },
  // Add trusted proxy configuration
  trustProxy: true
});

// Updated CORS configuration
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://code-teach.vercel.app',
      'http://localhost:3000'
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 600
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Pre-flight requests
app.options('*', cors(corsOptions));

// Security headers after CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://api.github.com', process.env.FRONTEND_URL],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  }
}));

app.use(cookieParser());
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
    res.clearCookie('__vercel_live_token', { sameSite: 'None', secure: true, httpOnly: true });
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
      res.cookie('__vercel_live_token', tokenData.access_token, { sameSite: 'None', secure: true, httpOnly: true });
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

  try {
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 
        'Authorization': authHeader,
        'Accept': 'application/json',
        'User-Agent': 'CodeTeach-App'
      }
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: error.message });
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
  console.log(`Server running on https://localhost:${PORT}`);
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
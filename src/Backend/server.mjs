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
dotenv.config({ path: '../../.env.backend' });

const app = express();

// Enhanced cache configuration
const cache = new NodeCache({ 
  stdTTL: 300,
  checkperiod: 320,
  useClones: false,
  deleteOnExpire: true
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

// Optimized OAuth callback route
app.post('/github/oauth/callback', limiter, async (req, res) => {
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
app.get('/github/user', async (req, res) => {
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
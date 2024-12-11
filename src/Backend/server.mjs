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

// Move CORS configuration before all other middleware
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'Accept', 'Origin', 'Cookie'],
  exposedHeaders: ['Set-Cookie', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Custom CORS handling
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === process.env.FRONTEND_URL) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
}, cors(corsOptions));

// Pre-flight requests
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (origin === process.env.FRONTEND_URL) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.status(204).end();
});

// Disable helmet's default CORS handling
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", process.env.FRONTEND_URL],
      connectSrc: ["'self'", 'https://api.github.com', process.env.FRONTEND_URL],
      scriptSrc: ["'self'", "'unsafe-inline'"],
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

// Update token blacklist middleware
const checkTokenBlacklist = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token && tokenBlacklist.get(token)) {
    res.status(401).json({ error: 'Token is revoked', tokenRevoked: true });
    return;
  }
  next();
};

// Update cookie options for better Safari support
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  path: '/',
  
  domain: process.env.NODE_ENV === 'production' 
    ? new URL(process.env.FRONTEND_URL).hostname.replace('www.', '')
    : 'localhost',
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

// Enhanced logout endpoint
app.post('/github/logout', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    tokenBlacklist.set(token, true);
    
    // Revoke token on GitHub
    try {
      await fetch(`https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/token`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}`).toString('base64')}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({ access_token: token })
      });
    } catch (error) {
      console.error('Error revoking token:', error);
    }
  }

  res.clearCookie('__vercel_live_token', cookieOptions);
  res.clearCookie('github_auth_token', cookieOptions);
  res.json({ success: true });
});

// Enhanced OAuth callback route
app.post('/github/oauth/callback', authLimiter, limiter, async (req, res) => {
  const { code, state } = req.body;
  
  if (!code || !state) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
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
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub OAuth error:', tokenData.error);
      return res.status(400).json({ error: tokenData.error_description || 'OAuth error' });
    }

    if (!tokenData.access_token) {
      return res.status(400).json({ error: 'No access token received' });
    }

    // Verify token immediately
    const verifyResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/json'
      }
    });

    if (!verifyResponse.ok) {
      throw new Error('Token verification failed');
    }

    const userData = await verifyResponse.json();
    if (!userData.login) {
      throw new Error('Invalid user data');
    }

    // Set secure cookies
    res.cookie('github_auth_token', tokenData.access_token, cookieOptions);
    
    // Return success response
    return res.json({
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      scope: tokenData.scope
    });
  } catch (error) {
    console.error('Token exchange error:', error);
    return res.status(500).json({ 
      error: 'Authentication failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Optimized user info endpoint
app.get('/github/user', checkTokenBlacklist, async (req, res) => {
  console.log('Received user info request');
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    console.log('No authorization header provided');
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  try {
    console.log('Fetching user info from GitHub');
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
        'User-Agent': 'CodeTeach-App'
      }
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error('GitHub API error:', errorData);
      throw new Error(errorData.message || `GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    console.log('Successfully fetched user data');
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Enhance token validation endpoint
app.post('/github/validate-token', checkTokenBlacklist, async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(' ')[1];

  try {
    if (tokenBlacklist.get(token)) {
      return res.json({ valid: false, revoked: true });
    }

    // Use parallel validation for all browsers
    const [githubUserResponse, githubAppResponse] = await Promise.all([
      fetch('https://api.github.com/user', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'CodeTeach-App'
        }
      }),
      fetch(`https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}`).toString('base64')}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({ access_token: token })
      })
    ]);

    if (!githubUserResponse.ok || !githubAppResponse.ok) {
      tokenBlacklist.set(token, true);
      return res.json({ valid: false, revoked: true });
    }

    return res.json({ valid: true });
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(500).json({ valid: false, error: 'Validation failed' });
  }
});

// Add new course management service
const courseManagementService = {
  async getEnrolledCourses(token, username) {
    const cacheKey = `courses_${username}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData;

    const repoResponse = await fetch(`https://api.github.com/repos/${username}/${REPO_NAME}/contents/courses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!repoResponse.ok) return [];

    const files = await repoResponse.json();
    const courses = await Promise.all(
      files
        .filter(file => file.name.endsWith('.json'))
        .map(async file => {
          const response = await fetch(file.download_url);
          return response.json();
        })
    );

    cache.set(cacheKey, courses, 300); // Cache for 5 minutes
    return courses;
  },

  async ensureRepositoryExists(token, username) {
    try {
      // First check if repo exists
      const checkRepoResponse = await fetch(`https://api.github.com/repos/${username}/${REPO_NAME}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (checkRepoResponse.ok) {
        return true; // Repo exists
      }

      // Create repository if it doesn't exist
      const createRepoResponse = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: REPO_NAME,
          private: true,
          auto_init: true,
          description: 'CodeTeach course progress tracking repository'
        })
      });

      if (!createRepoResponse.ok) {
        throw new Error('Failed to create repository');
      }

      // Create courses directory
      const createDirResponse = await fetch(`https://api.github.com/repos/${username}/${REPO_NAME}/contents/courses`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Initialize courses directory',
          content: Buffer.from('').toString('base64'),
          branch: 'main'
        })
      });

      return createDirResponse.ok;
    } catch (error) {
      console.error('Error ensuring repository exists:', error);
      return false;
    }
  },

  async enrollInCourse(token, username, courseId, courseData) {
    // Ensure repository exists before proceeding
    const repoExists = await this.ensureRepositoryExists(token, username);
    if (!repoExists) {
      throw new Error('Failed to ensure repository exists');
    }

    const path = `courses/${courseId}.json`;
    const url = `https://api.github.com/repos/${username}/${REPO_NAME}/contents/${path}`;
    
    const content = {
      courseId,
      enrolledAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      progress: 0,
      ...courseData,
      version: Date.now()
    };

    try {
      const existingResponse = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      const contentEncoded = Buffer.from(JSON.stringify(content)).toString('base64');

      if (existingResponse.ok) {
        const existingFile = await existingResponse.json();
        const existingContent = JSON.parse(Buffer.from(existingFile.content, 'base64').toString());
        
        if (existingContent.version > content.version) {
          content.progress = Math.max(existingContent.progress, content.progress);
          content.version = existingContent.version + 1;
        }

        await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Update course enrollment: ${courseId}`,
            content: contentEncoded,
            sha: existingFile.sha
          })
        });
      } else if (existingResponse.status === 404) {
        await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Add course enrollment: ${courseId}`,
            content: contentEncoded
          })
        });
      }

      // Invalidate cache
      cache.del(`courses_${username}`);
      return true;
    } catch (error) {
      console.error('Enrollment error:', error);
      return false;
    }
  }
};

// Add new endpoints
app.get('/api/courses/enrolled', checkTokenBlacklist, async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    if (!userData.login) {
      throw new Error('Invalid user data received');
    }
    
    const courses = await courseManagementService.getEnrolledCourses(token, userData.login);
    
    // Ensure we're sending a valid JSON array
    if (!Array.isArray(courses)) {
      res.json([]);
    } else {
      res.json(courses);
    }
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled courses', details: error.message });
  }
});

app.post('/api/courses/enroll', checkTokenBlacklist, async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { courseId, courseData } = req.body;

  if (!token || !courseId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const userData = await userResponse.json();

    const success = await courseManagementService.enrollInCourse(
      token,
      userData.login,
      courseId,
      courseData
    );

    if (success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Enrollment failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Enrollment failed' });
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
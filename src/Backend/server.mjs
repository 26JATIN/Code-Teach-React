import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// Load environment variables
import dotenv from 'dotenv';

// Load the backend-specific environment variables
dotenv.config({ path: '../../.env.backend' });

const app = express();

// Update CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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

// Update OAuth callback route
app.post('/github/oauth/callback', async (req, res) => {
  const { code, state } = req.body;
  
  console.log('Received callback request:', { code: code?.slice(0, 5), state: state?.slice(0, 5) });
  
  if (!code || !state) {
    console.error('Missing code or state in request body');
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    console.log('Processing OAuth callback:', { code, state });
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
    console.log('Token response:', tokenData);

    if (tokenData.error) {
      console.error('Error exchanging code for token:', tokenData.error_description);
      return res.status(400).json({ error: tokenData.error });
    }

    if (!tokenData.access_token) {
      console.error('No access token received from GitHub');
      return res.status(400).json({ error: 'No access token received' });
    }

    return res.json({ access_token: tokenData.access_token });
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GitHub user info route
app.get('/github/user', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  try {
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': authHeader
      }
    });

    const userData = await userResponse.json();
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Failed to fetch user information' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Connected to frontend: ${process.env.FRONTEND_URL}`);
});
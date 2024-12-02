import { useState, useEffect, useCallback } from 'react';

export const useGitHubAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_GITHUB_REDIRECT_URI;
  const REPO_NAME = 'codeteach';

  // Initiate GitHub OAuth login
  const initiateLogin = () => {
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`;    window.location.href = githubOAuthUrl;
  };

  // Sign out functionality
  const signOut = () => {
    localStorage.removeItem('githubAccessToken');
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
  };

  // Manage repository creation/access
  const manageRepository = useCallback(async (token) => {
    try {
      // Fetch user information
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token}`
        }
      });
      const userData = await userResponse.json();
      setUser(userData);

      // Check if repository exists, create if not
      const repoResponse = await fetch(`https://api.github.com/repos/${userData.login}/${REPO_NAME}`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });

      if (repoResponse.status === 404) {
        // Repository doesn't exist, create it
        await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: REPO_NAME,
            description: 'CodeTeach User Progress Repository',
            private: true
          })
        });
      }

      setIsAuthenticated(true);
      setAccessToken(token);
    } catch (error) {
      console.error('GitHub Authentication or Repository Management Error:', error);
    }
  }, []); // Empty dependency array as it doesn't depend on external changing values

  // Handle OAuth callback and token management
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const exchangeCodeForToken = async () => {
      if (code) {
        try {
          // Exchange code for access token (would typically be done server-side)
          const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              client_id: CLIENT_ID,
              client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
              code: code
            })
          });

          const tokenData = await tokenResponse.json();
          
          if (tokenData.access_token) {
            localStorage.setItem('githubAccessToken', tokenData.access_token);
            await manageRepository(tokenData.access_token);
          }
        } catch (error) {
          console.error('Token Exchange Error:', error);
        }
      } else {
        // Check for stored access token
        const storedToken = localStorage.getItem('githubAccessToken');
        if (storedToken) {
          await manageRepository(storedToken);
        }
      }
    };

    exchangeCodeForToken();
  }, [CLIENT_ID, manageRepository]);

  return {
    isAuthenticated,
    user,
    accessToken,
    initiateLogin,
    signOut
  };
};
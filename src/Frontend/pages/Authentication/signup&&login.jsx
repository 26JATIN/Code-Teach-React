import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Book } from 'lucide-react';
import config, { apiRequest, setAuthToken, setUser } from '../../../config/config';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Existing login logic
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }

      const endpoint = config.api.endpoints.auth.signin;
      
      try {
        const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 401) {
            throw new Error('Invalid email or password');
          } else {
            throw new Error(data.message || data.error || 'Authentication failed');
          }
        }

        if (!data.token || !data.user) {
          throw new Error('Invalid response from server');
        }

        setAuthToken(data.token);
        setUser(data.user);
        navigate('/learning-dashboard');
        
      } catch (error) {
        console.error('Auth error:', error);
        alert(error.message || 'An unexpected error occurred. Please try again.');
      }
      return;
    }

    // Signup validation
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.signup}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setIsVerifying(true);
      
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.message || 'An unexpected error occurred');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.verifyEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      setAuthToken(data.token);
      setUser(data.user);
      navigate('/learning-dashboard');
      
    } catch (error) {
      console.error('Verification error:', error);
      alert(error.message || 'Verification failed');
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.resendOtp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend code');
      }

      alert('New verification code sent to your email');
      
    } catch (error) {
      console.error('Resend error:', error);
      alert(error.message || 'Failed to resend verification code');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.forgotPassword}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to process request');
      }

      setIsVerifying(true);
      alert('Password reset instructions sent to your email');
      
    } catch (error) {
      console.error('Forgot password error:', error);
      alert(error.message || 'Failed to process forgot password request');
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Enter your email address to receive password reset instructions
          </p>
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold"
            >
              Send Reset Link
            </button>
          </form>
          <button
            onClick={() => setIsForgotPassword(false)}
            className="mt-4 w-full text-blue-600 hover:text-blue-700 text-sm"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
            Verify Your Email
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            We've sent a verification code to {email}
          </p>
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <input
              type="text"
              required
              placeholder="Enter verification code"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold"
            >
              Verify Email
            </button>
          </form>
          <button
            onClick={handleResendOTP}
            className="mt-4 w-full text-blue-600 hover:text-blue-700 text-sm"
          >
            Resend verification code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mx-auto h-16 w-16 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center mb-6"
        >
          <Book className="h-8 w-8 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100"
        >
          {isLogin ? 'Welcome Back!' : 'Join Us Today'}
        </motion.h2>

        <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
          {isLogin 
            ? 'Continue your learning journey'
            : 'Begin your path to mastery'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <input
                  type="text"
                  required
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </motion.div>
            )}

            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              required
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
              <input
                type="password"
                required
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
          </div>

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Forgot password?
              </button>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-lg shadow-lg transition-all duration-300"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-300"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

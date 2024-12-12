import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure the file exists as App.js or App.jsx in the src directory
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);


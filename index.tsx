
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Since we are not using a bundler that defines process.env, 
// we'll provide a placeholder. The actual key should be set
// in the deployment environment.
// @ts-ignore
if (!process.env.API_KEY) {
  // @ts-ignore
  process.env.API_KEY = "YOUR_API_KEY_HERE"; 
  console.warn("API_KEY is not set. Please set it in your environment variables.");
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

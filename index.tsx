import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthCallback from './components/auth/AuthCallback';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);

// This function checks if the current window is an OAuth callback popup.
const isOAuthCallbackPopup = () => {
  try {
    // "window.opener" exists if the window was opened by another window.
    // The hash parameter check is specific to the Supabase auth redirect.
    return window.opener && window.location.hash.includes('access_token');
  } catch (e) {
    // Accessing window.opener can throw a cross-origin error in some cases,
    // which also indicates it's not the context we're looking for.
    return false;
  }
};


if (isOAuthCallbackPopup()) {
  // --- We are in the popup window. ---
  // Render the dedicated handler component.
  root.render(<AuthCallback />);

} else {
  // --- This is the main application window. ---
  // Render the full application.
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
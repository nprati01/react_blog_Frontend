import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from 'react-router-dom';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-8wrs8c3s1d0cvscy.us.auth0.com"
    clientId="tTmEwKaMRLlmiATy4GLvmE5fBpVpL0cg"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <Router>
      <App />
    </Router>
  </Auth0Provider>
);

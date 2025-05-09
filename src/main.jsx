import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* Usuń BrowserRouter, ponieważ już jest w App.jsx */}
  </React.StrictMode>
);

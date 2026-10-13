import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NavigationProvider } from './contexts/NavigationContext';
import { OrbitControlsProvider } from './contexts/OrbitControlsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavigationProvider>
      <OrbitControlsProvider>
        <App />
      </OrbitControlsProvider>
    </NavigationProvider>
  </React.StrictMode>,
);

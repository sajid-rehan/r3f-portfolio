import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AnimationProvider } from './contexts/AnimationContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { OrbitControlsProvider } from './contexts/OrbitControlsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavigationProvider>
      <AnimationProvider>
        <OrbitControlsProvider>
          <App />
        </OrbitControlsProvider>
      </AnimationProvider>
    </NavigationProvider>
  </React.StrictMode>,
);

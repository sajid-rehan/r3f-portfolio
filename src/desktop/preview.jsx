import React from 'react';
import ReactDOM from 'react-dom/client';
import Desktop from './Desktop';
import './preview.css';

// Standalone preview entry (desktop.html). Not part of the production build.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ width: '100vw', height: '100vh' }}>
      <Desktop initialApps={['projects']} />
    </div>
  </React.StrictMode>,
);

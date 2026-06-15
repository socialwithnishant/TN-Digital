import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Global window polyfill for process.env to ensure zero runtime ReferenceError in pure static hosting
if (typeof window !== 'undefined') {
  if (!(window as any).process) {
    (window as any).process = { env: {} };
  } else if (!(window as any).process.env) {
    (window as any).process.env = {};
  }
}

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

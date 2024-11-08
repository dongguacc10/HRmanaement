import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastProvider } from './components/ToastProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);
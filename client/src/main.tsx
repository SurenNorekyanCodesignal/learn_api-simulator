import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';

const rootElement = document.getElementById('api-sim-root');

if (!rootElement) {
  throw new Error('API Simulator root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

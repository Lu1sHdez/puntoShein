import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SidebarProvider } from './context/SidebarContext'; // 👈 agrega esto

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </React.StrictMode>
);

reportWebVitals();

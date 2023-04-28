import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RecoilRoot } from 'recoil';
import AuthProvider from './authProvider/AuthProvider.tsx';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </AuthProvider>
  </React.StrictMode>
);

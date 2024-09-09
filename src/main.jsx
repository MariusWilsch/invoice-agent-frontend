import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'white',
            color: 'black',
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>,
)
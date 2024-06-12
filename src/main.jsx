import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './components/Utils/AuthContext.jsx'
import { VideoProvider } from './components/Utils/VideoContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <VideoProvider>
    <App />
    </VideoProvider>
    </AuthProvider>

  </React.StrictMode>,
)

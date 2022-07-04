import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatStateProvider from './context/ChatContext'
import UsersStateProvider from './context/UsersContext'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <UsersStateProvider>
      <ChatStateProvider>
        <App />
      </ChatStateProvider>
    </UsersStateProvider>
  </React.StrictMode>
)

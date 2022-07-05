import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatStateProvider from './context/ChatContext'
import UsersStateProvider from './context/UsersContext'
import WebsocketStateProvider from './context/WebsocketContext'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <WebsocketStateProvider>
      <UsersStateProvider>
        <ChatStateProvider>
          <App />
        </ChatStateProvider>
      </UsersStateProvider>
    </WebsocketStateProvider>
  </React.StrictMode>
)

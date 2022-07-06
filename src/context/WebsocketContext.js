import {useRef, createContext, useContext} from 'react'
import io from 'socket.io-client'
import useLocalStorage from '../hooks/LocalStorage'

const initialState = null

const WebsocketContext = createContext(initialState)

export function useWebsocket() {
  return {
    websocket: useContext(WebsocketContext).current
  }
}

export default function WebsocketProvider({children}) {
  const {storedValue} = useLocalStorage('userInfo')
  const url = window.location.href
  const host = window.location.host
  const port = window.location.port
  const isHttps = url.includes('https:')
  let socketUrl
  if (port === '3000') {
    socketUrl = 'ws://localhost:3011'
  } else {
    socketUrl = `ws${isHttps ? 's' : ''}://${host}`
  }
  const socket = io(socketUrl, {
    auth: [storedValue?.channel],
  })
  const websocket = useRef(socket)
  return (
    <WebsocketContext.Provider value={websocket}>
      {children}
    </WebsocketContext.Provider>
  )
}

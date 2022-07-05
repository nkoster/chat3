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
  const socket = io('ws://localhost:3011', {
    auth: [storedValue.channel],
  })
  const websocket = useRef(socket)
  return (
    <WebsocketContext.Provider value={websocket}>
      {children}
    </WebsocketContext.Provider>
  )
}

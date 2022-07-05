import {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Header from './components/Header'
import ChatBox from './components/ChatBox'
import InputBar from './components/InputBar'
import useLocalToken from './hooks/useLocalToken'
import {useWebsocket} from './context/WebsocketContext'
import useLocalStorage from './hooks/LocalStorage'

function App() {

  const {localToken, setLocalToken} = useLocalToken()
  const [token, setToken] = useState(localToken)
  const {websocket} = useWebsocket()
  const {storedValue} = useLocalStorage('userInfo')

  useEffect(() => {
    if (token) setLocalToken(token)
    websocket.on('expired', () => {
      console.log('EXPIRED')
      setToken(null)
    })
  }, [token, setLocalToken])

  useEffect(() => {
    if (token) websocket.emit('join', {
      token, channel: storedValue.channel
    })
  }, [storedValue])

  if (!token) {
    return <Login setToken={setToken}/>
  }

  const logout = () => {
    setLocalToken(null)
    setToken(null)
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Chat logout={logout}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Chat({logout}) {
  return (
    <>
      <Header logout={logout}/>
      <ChatBox />
      <InputBar />
    </>
  )
}

export default App

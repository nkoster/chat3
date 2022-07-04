import {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Header from './components/Header'
import ChatBox from './components/ChatBox'
import InputBar from './components/InputBar'
import useLocalToken from './hooks/useLocalToken'

function App() {

  const {localToken, setLocalToken} = useLocalToken()
  const [token, setToken] = useState(localToken)
  console.log(localToken)

  useEffect(() => {
    setLocalToken(token)
  }, [token, setLocalToken])

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

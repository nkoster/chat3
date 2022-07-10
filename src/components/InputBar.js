import './InputBar.css'
import {useWebsocket} from '../context/WebsocketContext'
import useLocalStorage from '../hooks/LocalStorage'
import {useState} from 'react'

export default function InputBar() {

  const [chatText, setChatText] = useState('')
  const {websocket} = useWebsocket()
  const {storedValue} = useLocalStorage('userInfo')

  function handleInput(e) {
    if (e.key === 'Enter' && e.target.value) {
      websocket.emit('message', {
        data: e.target.value,
        channel: storedValue.channel
      })
      setChatText('')
    }
  }

  function handleOnChange(e) {
    setChatText(e.target.value)
  }

  return (
    <div className='InputBar'>
      <div className='icon'>»</div><input type='text' onKeyDown={handleInput} value={chatText} onChange={handleOnChange}/>
    </div>
  )
}

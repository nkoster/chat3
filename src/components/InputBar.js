import './InputBar.css'
import {useChatState} from '../context/ChatContext'
import {useWebsocket} from '../context/WebsocketContext'
import useLocalStorage from '../hooks/LocalStorage'

export default function InputBar() {

  const {chatState, setChatState} = useChatState()
  const {websocket} = useWebsocket()
  const {storedValue} = useLocalStorage('userInfo')

  function handleInput(e) {
    if (e.key === 'Enter') {
      setChatState({
        ...chatState,
        message: ''
      })
      websocket.emit('message', {
        data: e.target.value,
        channel: storedValue.channel
      })
    }
  }

  function handleOnChange(e) {
      setChatState({
        ...chatState,
        message: e.target.value
      })
  }

  return (
    <div className='InputBar'>
      <input type='text' onKeyDown={handleInput} value={chatState.message} onChange={handleOnChange}/>
    </div>
  )
}

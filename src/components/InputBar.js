import './InputBar.css'
import {useChatState} from '../context/ChatContext'

export default function InputBar() {

  const [chatState, setChatState] = useChatState()

  function handleInput(e) {
    if (e.key === 'Enter') {
      setChatState({
        ...chatState,
        chatLines: [...chatState.chatLines, e.target.value],
        message: ''
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

import './Header.css'
import {useChatState} from '../context/ChatContext'
import useLocalStorage from '../hooks/LocalStorage'

export default function Header({logout}) {
  const {chatState} = useChatState()
  const {storedValue} = useLocalStorage('userInfo')
  function handleOnClick() {
    logout()
  }
  return (
    <div className='Header'>
      <div>{storedValue.username}@{storedValue.channel}</div>
      <div>{chatState.chatLines.length} line{chatState.chatLines.length === 1 ? '' : 's'}</div>
      <button onClick={handleOnClick}>logout</button>
    </div>
  )
}

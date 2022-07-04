import './Header.css'
import {useChatState} from '../context/ChatContext'
import useLocalStorage from '../hooks/LocalStorage'

export default function Header({logout}) {
  const [chatState] = useChatState()
  const {storedValue} = useLocalStorage('userInfo')
  function handleOnClick() {
    logout()
  }
  return (
    <div className='Header'>
      {chatState.chatLines.length}
      {storedValue.username}
      {storedValue.id}
      <button onClick={handleOnClick}>logout</button>
    </div>
  )
}

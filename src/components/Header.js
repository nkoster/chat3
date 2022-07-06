import './Header.css'
import {useChatState} from '../context/ChatContext'
import useLocalStorage from '../hooks/LocalStorage'
import {useUsersState} from '../context/UsersContext'

export default function Header({logout}) {
  const {chatState} = useChatState()
  const {storedValue} = useLocalStorage('userInfo')
  const {usersState} = useUsersState()
  function handleOnClick() {
    logout()
  }
  return (
    <div className='Header'>
      <div>{storedValue.username}@{storedValue.channel}</div>
      <div>{chatState.chatLines.length} line{chatState.chatLines.length === 1 ? '' : 's'}</div>
      <div>{usersState.length} user{usersState.length === 1 ? '' : 's'}</div>
      <button onClick={handleOnClick}>logout</button>
    </div>
  )
}

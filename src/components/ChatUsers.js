import './ChatUsers.css'
import {useUsersState} from '../context/UsersContext'

export default function ChatUsers() {
  const [usersState] = useUsersState()
  console.log('ChatUsers invoked', usersState.userList)
  return (
    <div className='ChatUsers'>
      {usersState.userList.map((user, index) => <div key={index}>{user.name}</div>)}
    </div>
  )
}

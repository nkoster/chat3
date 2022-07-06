import {useEffect} from 'react'
import './ChatUsers.css'
import {useWebsocket} from '../context/WebsocketContext'
import useLocalStorage from '../hooks/LocalStorage'
import {useUsersState} from '../context/UsersContext'

// async function loadUserList() {
//   const result = await fetch('http://localhost:3011/userlist')
//     .then(res => res.json())
//     .catch(err => console.log(err.message))
//   console.log('loadUserList', result)
// }

export default function ChatUsers() {

  const {storedValue} = useLocalStorage('userInfo')
  const {usersState, setUsersState} = useUsersState()
  const {websocket} = useWebsocket()

  useEffect(() => {
    websocket.on('newlist', l => {
      setUsersState(l)
    })
    return () => websocket.off('newlist')
  }, [])
  console.log('usersState', usersState)

  return (
    <div className='ChatUsers'>
      {usersState.filter && usersState.filter(chan => chan.name === storedValue.channel).map((chan, index) => <div key={index}>{chan.user}</div>)}
    </div>
  )
}

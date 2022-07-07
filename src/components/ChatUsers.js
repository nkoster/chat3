import {useEffect, useRef} from 'react'
import './ChatUsers.css'
import {useWebsocket} from '../context/WebsocketContext'
import useLocalStorage from '../hooks/LocalStorage'
import {useUsersState} from '../context/UsersContext'
import ChatUser from './ChatUser'

export default function ChatUsers() {

  const {storedValue} = useLocalStorage('userInfo')
  const {usersState, setUsersState} = useUsersState()
  const {websocket} = useWebsocket()
  const unique = useRef([])

  useEffect(() => {
    console.log('New list received')
    websocket.on('newlist', l => {
      setUsersState({...usersState, userList: [...l]})
    })
    return () => websocket.off('newlist')
  }, [] )

  useEffect(() => {
    if (usersState.filter) {
      if (usersState.filter.length > 2) {
        unique.current = usersState.filter && usersState.filter(chan => chan.name === storedValue.channel)
          .filter(chan => {
            const isDup = unique.current.includes(chan.user)
            if (!isDup) {
              unique.current.push(chan)
              return true
            }
            return false
          })
      } else {
        unique.current = usersState
      }
    }
  }, [usersState])

  return (
    <div className='ChatUsers'>
      {usersState.userList && usersState.userList.filter(chan => chan.name === storedValue.channel)
        .map((chan, index) => <ChatUser key={index} myKey={index} user={chan.user} />)}
    </div>
  )
}

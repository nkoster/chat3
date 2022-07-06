import {useState, createContext, useContext, useEffect} from 'react'
import {useWebsocket} from './WebsocketContext'

const initialState = {
  userList: []
}

const UsersContext = createContext(initialState)
const UsersUpdateContext = createContext()

export function useUsersState() {
  return {
    usersState: useContext(UsersContext),
    setUsersState: useContext(UsersUpdateContext)
  }
}

export default function UsersStateProvider({children}) {

  const [usersState, setUsersState] = useState(initialState)
  const {websocket} = useWebsocket()
  useEffect(() => {
    websocket.on('newlist', l => {
      console.log('usersState', usersState)
      console.log('newlist', l)
      setUsersState(l)
    })
    return () => websocket.off('newlist')
  }, [])

  function updateUsers(state) {
    setUsersState(state)
  }

  return (
    <UsersContext.Provider value={usersState}>
      <UsersUpdateContext.Provider value={updateUsers}>
        {children}
      </UsersUpdateContext.Provider>
    </UsersContext.Provider>
  )
}

import {useState, createContext, useContext} from 'react'

const initialState = {
  userList: [
    {
      id: '1',
      name: 'niels'
    },
    {
      id: '2',
      name: 'gijs'
    }
  ]
}

const UsersContext = createContext(initialState)
const UsersUpdateContext = createContext()

export function useUsersState() {
  return [useContext(UsersContext), useContext(UsersUpdateContext)]
}

export default function UsersStateProvider({children}) {
  const [usersState, setUsersState] = useState(initialState)

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

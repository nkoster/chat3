import './LoginPage.css'
import {useId} from 'react'
import useLocalStorage from '../hooks/LocalStorage'
import {uuid} from '../util'
import {useUsersState} from '../context/UsersContext'

export default function LoginPage() {
  const [userInfo, setUserInfo] = useLocalStorage('userInfo')
  const [users, updateUsers] = useUsersState()

  const nameId = useId()

  function handleSubmit(e) {
    e.preventDefault()
    const id = uuid()
    const name = e.target.name.value
    updateUsers({...users, userList: [...users.userList, {name, id}]})
    setUserInfo({...userInfo, username: name, id})
  }

  function handleOnChange() {}

  return (
    <div className='LoginPage'>
      <form onSubmit={handleSubmit}>
        <label htmlFor={nameId}></label>
        <input onChange={handleOnChange} type='text' id={nameId} name='name'/><br />
        <button>submit</button>
      </form>
    </div>
  )
}

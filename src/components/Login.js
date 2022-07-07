import {useState} from 'react'
import './Login.css'
import useLocalStorage from '../hooks/LocalStorage'
import {getHostUrl} from '../util'

async function loginUser(credentials) {
  console.log('HOST URL', getHostUrl())
  return fetch(`${getHostUrl()}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

function Login({setToken}) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [channel, setChannel] = useState()
  const {setStoredValue} = useLocalStorage('userInfo')

  const handleSubmit = async e => {
    e.preventDefault()
    const {accessToken} = await loginUser({
      channel, username, password
    })
    setToken(accessToken)
    setStoredValue({channel, username, accessToken})
  }

  function handleOnchange(event, callback) {
    callback(event.target.value)
  }

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Channel</p>
          <input type="text" onChange={e => handleOnchange(e, setChannel)} />
        </label>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => handleOnchange(e, setUsername)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => handleOnchange(e, setPassword)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )

}

export default Login

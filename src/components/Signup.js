import {useState} from 'react'
import './Signup.css'
import {getHostUrl} from '../util'

async function signupUser(credentials) {
  console.log('HOST URL', getHostUrl())
  return fetch(`${getHostUrl()}/adduser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

function Signup() {

  const [username, setUsername] = useState()
  const [password1, setPassword1] = useState()
  const [password2, setPassword2] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    if (password1 !== password2) {
      return
    }
    await signupUser({
      username, password: password2
    })
    window.location.href = '/'
  }

  function handleOnchange(event, callback) {
    callback(event.target.value)
  }

  return (
    <div className='Signup'>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" onChange={e => handleOnchange(e, setUsername)} /><br />
        <label>Password 1</label>
        <input type="password" onChange={e => handleOnchange(e, setPassword1)}/><br />
        <label>Password 2</label>
        <input type="password" onChange={e => handleOnchange(e, setPassword2)}/><br />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )

}

export default Signup

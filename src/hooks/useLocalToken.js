import {useState} from 'react'

const storage = sessionStorage // can be replaced by localStorage

function useLocalToken() {

  const getToken = () => {
    const tokenString = storage.getItem('token')
    // const userToken = JSON.parse(tokenString)
    return JSON.parse(tokenString)
  }

  const [localToken, setLocalToken] = useState(getToken())

  const saveToken = userToken => {
    if (!userToken) {
      storage.removeItem('token')
      setLocalToken(null)
      return
    }
    storage.setItem('token', JSON.stringify(userToken))
    setLocalToken(userToken.token)
  }

  return {
    setLocalToken: saveToken,
    localToken
  }

}

export default useLocalToken

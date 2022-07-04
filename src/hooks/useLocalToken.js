import {useState} from 'react'

// const storage = sessionStorage // can be replaced by localStorage
const storage = localStorage

function useLocalToken() {

  const getToken = () => {
    const tokenString = storage.getItem('userInfo')
    return JSON.parse(tokenString)
  }

  const [localToken, setLocalToken] = useState(getToken())

  const saveToken = userToken => {
    if (!userToken) {
      storage.removeItem('userInfo')
      setLocalToken(null)
      return
    }
    storage.setItem('userInfo', JSON.stringify({...getToken() }))
    setLocalToken(userToken.token)
  }

  return {
    setLocalToken: saveToken,
    localToken
  }

}

export default useLocalToken

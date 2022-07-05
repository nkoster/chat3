import {useEffect, useState} from 'react'
import './ChatUsers.css'
import {useWebsocket} from '../context/WebsocketContext'

async function loadUserList() {
  const result = await fetch('http://localhost:3011/userlist')
    .then(res => res.json())
    .catch(err => console.log(err.message))
  console.log(result)
}

export default function ChatUsers() {

  const [list, setList] = useState()
  const {websocket} = useWebsocket()

  useEffect(() => {
    loadUserList()
    websocket.on('newlist', l => {
      setList(l)
    })
  }, [])

  return (
    <div className='ChatUsers'>
      {list && list.map((chan, index) => <div key={index}>{chan.user}</div>)}
    </div>
  )
}

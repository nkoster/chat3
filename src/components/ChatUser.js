import './ChatUser.css'

function ChatUser({myKey, user}) {
  console.log('myKey', myKey)
  return (
    <div key={myKey} className='ChatUser'>{user}</div>
  )
}

export default ChatUser

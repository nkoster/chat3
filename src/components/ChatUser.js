import './ChatUser.css'

function ChatUser({myKey, user}) {
  return (
    <div key={myKey} className='ChatUser'>{user}</div>
  )
}

export default ChatUser

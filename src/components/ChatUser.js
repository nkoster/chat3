import './ChatUser.css'

function ChatUser({key, user}) {
  return (
    <div key={key} className='ChatUser'>{user}</div>
  )
}

export default ChatUser

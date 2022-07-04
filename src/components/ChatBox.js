import './ChatBox.css'
import ChatLines from './ChatLines'
import ChatUsers from './ChatUsers'

export default function ChatBox() {
  return (
    <div className='ChatBox'>
      <ChatLines />
      <ChatUsers />
    </div>
  )
}

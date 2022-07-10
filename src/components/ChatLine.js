import './ChatLine.css'

function ChatLine({mykey, line}) {
  return (
    <div className={`ChatLine ${line.user === 'server' && 'server'}`}>
      <div className='ChatLineUser'>{line.user} » </div>
      <div className='ChatLineData' key={mykey}>{line.data}</div>
      <div className='ChatLineTime'>{line.time}</div>
    </div>
  )
}

export default ChatLine

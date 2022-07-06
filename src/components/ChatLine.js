import './ChatLine.css'

function ChatLine({mykey, line}) {
  return (
    <div className='ChatLine'>
      <div className='ChatLineUser'>{line.user}:</div>
      <div className='ChatLineData' key={mykey}>{line.data}</div>
      <div className='ChatLineTime'>{line.time}</div>
    </div>
  )
}

export default ChatLine

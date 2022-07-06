import './ChatLine.css'

function ChatLine({key, line}) {
  return (
    <div className='ChatLine'>
      <div className='ChatLineUser'>{line.user}:</div>
      <div className='ChatLineData' key={key}>{line.data}</div>
      <div className='ChatLineTime'>{line.time}</div>
    </div>
  )
}

export default ChatLine

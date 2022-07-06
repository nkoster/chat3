import './ChatLine.css'

function ChatLine({key, line}) {
  return (
    <div className='ChatLine'>
      <div className='ChatLineUser'>{line.user}:</div>
      <div key={key}>{line.data}</div>
    </div>
  )
}

export default ChatLine

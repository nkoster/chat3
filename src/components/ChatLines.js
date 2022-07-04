import {useEffect, useRef} from 'react'
import './ChatLines.css'
import {useChatState} from '../context/ChatContext'

export default function ChatLines() {

  const ref = useRef()
  const [chatState] = useChatState()

  useEffect(() => {ref.current.scrollTop = ref.current.scrollHeight}, [chatState])

  return (
    <div className='ChatLines' ref={ref}>
      {chatState.chatLines.reverse().map((line, key) => {
        return <div className='ChatLine' key={key}>{line}</div>
      })}
    </div>
  )
}

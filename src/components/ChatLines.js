import {useEffect, useRef} from 'react'
import './ChatLines.css'
import {useChatState} from '../context/ChatContext'
import {useWebsocket} from '../context/WebsocketContext'

export default function ChatLines() {

  const ref = useRef()
  const {chatState, setChatState} = useChatState()
  const {websocket} = useWebsocket()

  useEffect(() => {
    websocket.on('broadcast', msg => {
      // console.log(msg)
      setChatState({
        ...chatState,
        chatLines: [...chatState.chatLines, msg.data],
      })
    })
  }, [chatState])

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight
  }, [chatState])

  return (
    <div className='ChatLines' ref={ref}>
      {chatState.chatLines.reverse().map((line, key) => {
        return <div className='ChatLine' key={key}>{line}</div>
      })}
    </div>
  )
}

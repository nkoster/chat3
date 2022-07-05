import {useState, createContext, useContext} from 'react'

const initialState = {
  id: 'aap',
  name: 'niels',
  message: '',
  chatLines: [],
}

const ChatContext = createContext(initialState)
const ChatUpdateContext = createContext()

export function useChatState() {
  return {
    chatState: useContext(ChatContext),
    setChatState: useContext(ChatUpdateContext)
  }
}

export default function ChatStateProvider({children}) {
  const [chatState, setChatState] = useState(initialState)

  function updateChat(state) {
    setChatState(state)
  }

  return (
    <ChatContext.Provider value={chatState}>
      <ChatUpdateContext.Provider value={updateChat}>
        {children}
      </ChatUpdateContext.Provider>
    </ChatContext.Provider>
  )
}

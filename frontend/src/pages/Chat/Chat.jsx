import React, { useEffect, useRef } from 'react'
import './chat.css'
import NewPrompt from '../../components/newPrompt/NewPrompt'

function Chat() {
  return <>
  <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">message from ai</div>
          <div className="message user">message from human</div>
          <div className="message">message from ai</div>
          <div className="message user">message from human</div>
          <div className="message">message from ai</div>
          <div className="message user">message from human</div>
          <div className="message">message from ai</div>
          <div className="message user">message from human</div>
          <div className="message">message from ai</div>
          <div className="message user">message from human</div>
          <div className="message">message from ai</div>
          <div className="message user">message from human</div>
          <div className="message">message from ai</div>
          <div className="message user">message from human</div>
          <div className="message">message from ai</div>
          <div className="message user">message from human</div>
          <NewPrompt/>
        </div>
      </div>
    </div>
    </>
}

export default Chat
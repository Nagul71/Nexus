import React from 'react'
import './chatList.css'
import { Link } from 'react-router-dom'

function ChatList() {
  return <>
  <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Nexus AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        <Link to='/'>My Chat Title</Link>
        <Link to='/'>My Chat Title</Link>
        <Link to='/'>My Chat Title</Link>

      </div>
      <hr />
      <div className="upgrade">
        <img src="/assets/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Nexus AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  </>
}

export default ChatList
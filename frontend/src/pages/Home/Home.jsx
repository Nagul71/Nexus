import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

function Home() {
  return <>
  <div className="homepage">
    <div className="left">
    <h3 className="gem">GEMINI'S</h3>
      <h1>NEXUS AI</h1>
      <h2>Intelligence Evolved, Possibilities Unlimited</h2>
      <h3>Transform your workflow with enterprise-grade artificial intelligence
          Experience intelligence that adapts to your enterprise needs
          Where human ingenuity meets artificial intelligence
          Elevate your business with next-generation AI solutions
      </h3>
      <Link to ='/dashboard'>Get Started</Link>
    </div>

    <div className="right">


    </div>
  </div>

  </>
}

export default Home


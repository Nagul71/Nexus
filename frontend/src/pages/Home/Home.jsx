import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';


  

function Home() {
  const test = async () => {
    await fetch(`${VITE_API_URL}/api/test`, {
      credentials: "include",
    });
  };

  return (
    <div className="homepage">
      <div className="left">
        <h1>NEXUS AI</h1>
        <h2>Intelligence Evolved, Possibilities Unlimited</h2>
        <h3 className='text'>Powered by the cutting-edge Gemini API, 
          Nexus AI delivers intelligent, dynamic, and 
          seamless conversations. Experience the future of AI-driven interaction with speed, precision, 
          and adaptability at its core.
        </h3>
        <Link to='/dashboard'>Try Nexus</Link>
      </div>

      <div className="right">
        <div className="device-showcase">
          <div className="device">
            <div className="screen">
              <div className="app-interface">
                <div className="chat-bubbles">
                  <div className="bubble user">How can you help my business?</div>
                  <div className="bubble ai">I can automate tasks, analyze data, and provide intelligent insights to optimize your operations.</div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="device-frame"></div>
            <div className="device-reflection"></div>
          </div>
          <div className="device-shadow"></div>
          
          <div className="floating-specs">
            <div className="spec-item spec1">Advanced ML Models</div>
            <div className="spec-item spec2">Real-time Processing</div>
            <div className="spec-item spec3">24/7 Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
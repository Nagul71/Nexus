import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const test = async () => {
    await fetch("http://localhost:3000/api/test", {
      credentials: "include",
    });
  };

  return (
    <div className="homepage">
      <div className="left">
        <h1>NEXUS AI</h1>
        <h2>Intelligence Evolved, Possibilities Unlimited</h2>
        <h3>Transform your workflow with enterprise-grade artificial intelligence
            Experience intelligence that adapts to your enterprise needs
            Where human ingenuity meets artificial intelligence
            Elevate your business with next-generation AI solutions
        </h3>
        <Link to='/dashboard'>Get Started</Link>
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
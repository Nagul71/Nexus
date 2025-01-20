import React from 'react'
import './price.css'
function price() {
  return <>
  <div className="container">
    <div className="header">
      <h1>Choose Your Plan</h1>
      </div>
    

    <div className="pricing-grid">
      {/* <!-- Basic Tier --> */}
      <div className="pricing-card">
        <div className="plan-name">Basic</div>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">0</span>
          <span className="period">/ month</span>
        </div>
        <div className="description">
          Start your journey with essential AI features
        </div>
        <button className="cta-button">Get Started</button>
        <ul className="features">
          <li className="feature">
            <span className="checkmark">›</span>
            Core AI assistant features
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Basic chat capabilities
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Standard response time
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Community support
          </li>
        </ul>
      </div>

      {/* <!-- Plus Tier --> */}
      <div className="pricing-card popular">
        <div className="plan-name">Plus</div>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">20</span>
          <span className="period">/ month</span>
        </div>
        <div className="description">
          Enhanced features for professionals and creators
        </div>
        <button className="cta-button">Upgrade Now</button>
        <ul className="features">
          <li className="feature">
            <span className="checkmark">›</span>
            Everything in Basic
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Advanced AI models
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Priority response time
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Custom AI templates
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Premium support
          </li>
        </ul>
      </div>

      {/* <!-- Pro Tier --> */}
      <div className="pricing-card">
        <div className="plan-name">Pro</div>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">200</span>
          <span className="period">/ month</span>
        </div>
        <div className="description">
          Ultimate AI power for enterprises and power users
        </div>
        <button className="cta-button">Go Pro</button>
        <ul className="features">
          <li className="feature">
            <span className="checkmark">›</span>
            Everything in Plus
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Unlimited AI access
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Advanced analytics
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Custom integrations
          </li>
          <li className="feature">
            <span className="checkmark">›</span>
            Dedicated support team
          </li>
        </ul>
      </div>
    </div>
  </div>
  </>
}

export default price
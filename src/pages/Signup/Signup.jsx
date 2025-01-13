import React from 'react'
import './signup.css'
import { SignUp } from '@clerk/clerk-react'

function Signup() {
  return (
    <div className='up'><SignUp path="/sign-up" signInUrl='sign-in'/></div>
  )
}

export default Signup
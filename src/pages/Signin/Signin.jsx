import React from 'react'
import './sigin.css'
import { SignIn } from '@clerk/clerk-react'

function Signin() {
  return (
    <div className='in'><SignIn path="/sign-in" signUpUrl='sign-up'/></div>
  )
}

export default Signin
import React from 'react'
import './root.css'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ClerkProvider, SignedOut } from '@clerk/clerk-react'
import { SignedIn } from '@clerk/clerk-react'
import { SignInButton } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}



function root() {
  return <>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">

    <div className='root'>
    <header>
        <Link to ='/'className='logo'>  
        <img src="src\assets\logo.png"/>
        <span>NEXUS AI</span>
        </Link>
        <div className="user">
            <SignedOut>
                <SignInButton />
            </SignedOut>
                <SignedIn>
            <UserButton />
                </SignedIn>
        </div>
    </header>
    <main>
        <Outlet/>
    </main>
    </div>
    </ClerkProvider>
    </>

}

export default root
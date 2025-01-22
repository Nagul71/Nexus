import React from 'react'
import './root.css'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ClerkProvider} from '@clerk/clerk-react'
import { SignedIn } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import {QueryClient,QueryClientProvider} from 'react-query'
import { useQuery } from 'react-query'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const queryClient = new QueryClient()



function root() {
  return <>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <QueryClientProvider client={queryClient}>

    <div className='root'>
    <header>
        <Link to ='/'className='logo'>  
        <img src="/assets/imglogo.png"/>
        <span>NEXUS AI</span>   
        </Link>
        <div className="user">
                <SignedIn>
            <UserButton />
                </SignedIn>
        </div>
    </header>
    <main>
        <Outlet/>
    </main>
    </div>
    </QueryClientProvider>
    </ClerkProvider>
    </>

}

export default root
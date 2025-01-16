import React, { useEffect } from 'react'
import './dashlay.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import ChatList from '../../components/ChatList/ChatList'

function Dashlay() {
    const {isSignedIn , isLoaded} = useAuth()
    const auth = useAuth()
 

    let navigate = useNavigate();

    useEffect(()=>{
        if(isLoaded && !isSignedIn)
        {
            navigate("/sign-in");

        }

    },[isLoaded,isSignedIn,navigate]);
    
    if (!isLoaded) return <div>Loading...</div>;

    
    return <>
  <div className="dash">
    <div className="menu"><ChatList/></div>
    <div className="content"><Outlet/>
    </div>
  </div>
  </>
}

export default Dashlay
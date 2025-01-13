import React, { useEffect } from 'react'
import './dashlay.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

function Dashlay() {
    const {isUser , isLoaded} = useAuth()

    let navigate = useNavigate();

    useEffect(()=>{
        if(isLoaded && !isUser)
        {
            navigate("/sign-in");

        }

    },[isLoaded,isUser,navigate]);


    if(!isLoaded) return "LOadin.....";
    return <>
  <div className="dash">
    <div className="menu">MENU</div>
    <div className="content"><Outlet/></div>
  </div>
  </>
}

export default Dashlay
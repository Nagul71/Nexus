import React from 'react';
import './signup.css';
import { SignIn, useUser } from '@clerk/clerk-react';

function Signin() {
  const { isSignedIn, user } = useUser(); // Hook to check user status

  if (isSignedIn) {
    console.log(user?.fullName)
    // If the user is signed in, show a welcome message or redirect
    return (
      
      <div className="in">
        <h1>Welcome back, {user?.fullName || user?.emailAddress}!</h1>
        {/* Redirect to the dashboard */}
        <a href="/dashboard">Go to Dashboard</a>
      </div>
    );
  }

  // If the user is not signed in, show the sign-in form
  return (
    <div className="in">
      <SignIn path="/sign-in" signUpUrl="sign-up" forceRedirectUrl="/dashboard" />
    </div>
  );
}

export default Signin;

import React from 'react';
import './sigin.css';
import { SignIn, useUser } from '@clerk/clerk-react';

function Signin() {
  const { isSignedIn, user } = useUser(); // Hook to check user's authentication status

  if (isSignedIn) {
    console.log(user?.fullName)
    return (
      <div className="in">
        <h1>Welcome, {user?.fullName || user?.emailAddress}!</h1>
        {/* Redirect to the dashboard or add a link */}
        <a href="/dashboard">Go to Dashboard</a>
      </div>
    );
  }

  // Render the SignIn form if the user is not signed in
  return (
    <div className="in">
      <SignIn path="/sign-in" signUpUrl="sign-up" forceRedirectUrl="/dashboard" />
    </div>
  );
}

export default Signin;

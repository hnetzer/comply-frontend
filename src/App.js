import React from 'react';
import { Router } from "@reach/router"

// Signup
import SignupScreen from 'screens/signup/SignupScreen'

// Onboarding
import OnboardingScreen from "screens/onboarding/OnboardingScreen"

import WebsiteScreen from "screens/public/Website/WebsiteScreen"
import HomeScreen from "screens/home/HomeScreen"
import LoginScreen from 'screens/public/Login/LoginScreen'

// Admin
import AdminScreen from "./screens/admin/AdminScreen"


const App = (props) => {

  return (
    <Router className="rootRouter">
      <WebsiteScreen path="/" />
      <LoginScreen path="/login" />
      <HomeScreen path="/home/*" />
      <SignupScreen path="/signup" />
      <OnboardingScreen path="/onboarding/*" />
      <AdminScreen path="/admin/*" />
    </Router>
  )
}

export default App;

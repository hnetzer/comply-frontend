import React from 'react';
import { Router } from "@reach/router"

// Signup
import GetStartedScreen from "./screens/signup/GetStartedScreen"
import CompanyDetailsScreen from "./screens/signup/CompanyDetailsScreen"
import OfficeDetailsScreen from "./screens/signup/OfficeDetailsScreen"
import SignupScreen from './screens/signup/SignupScreen'

import WebsiteScreen from "./screens/WebsiteScreen"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from './screens/LoginScreen'

// Admin
import AdminScreen from "./screens/admin/AdminScreen"


const App = (props) => {

  return (
    <Router className="rootRouter">
      <WebsiteScreen path="/" />
      <LoginScreen path="/login" />
      <HomeScreen path="/home/*" />
      <SignupScreen path="/signup">
        <GetStartedScreen path="/get-started" />
        <CompanyDetailsScreen path="/company-details" />
        <OfficeDetailsScreen path="/office-details" />
      </SignupScreen>
      <AdminScreen path="/admin/*" />
    </Router>
  )
}

export default App;

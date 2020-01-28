import React from 'react';
import { Router } from "@reach/router"

import GetStartedScreen from "./screens/signup/GetStartedScreen"
import CompanyDetailsScreen from "./screens/signup/CompanyDetailsScreen"
import OfficeDetailsScreen from "./screens/signup/OfficeDetailsScreen"
import WebsiteScreen from "./screens/WebsiteScreen"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from './screens/LoginScreen'

const App = (props) => {

  return (
    <Router>
      <WebsiteScreen path="/" />
      <LoginScreen path="/login" />
      <HomeScreen path="/home/*" />
      <GetStartedScreen path="/signup/get-started" />
      <CompanyDetailsScreen path="/signup/company-details" />
      <OfficeDetailsScreen path="/signup/office-details" />
    </Router>
  )
}

export default App;

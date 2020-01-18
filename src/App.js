import React from 'react';
import { Router } from "@reach/router"

import FilingScheduleScreen from "./screens/FilingScheduleScreen"
import GetStartedScreen from "./screens/signup/GetStartedScreen"
import CompanyDetailsScreen from "./screens/signup/CompanyDetailsScreen"
import OfficeDetailsScreen from "./screens/signup/OfficeDetailsScreen"
import HomeScreen from "./screens/HomeScreen"

const App = (props) => {

  return (
    <Router>
      <HomeScreen path="/" />
      <GetStartedScreen path="/signup/get-started" />
      <CompanyDetailsScreen path="/signup/company-details" />
      <OfficeDetailsScreen path="/signup/office-details" />
      <FilingScheduleScreen path="/schedule" />
    </Router>
  )
}

export default App;

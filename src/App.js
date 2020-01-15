import React from 'react';
import { Router } from "@reach/router"

import FilingScheduleScreen from "./screens/FilingScheduleScreen"
import GetStartedScreen from "./screens/GetStartedScreen"
import HomeScreen from "./screens/HomeScreen"

const App = (props) => {

  return (
    <Router>
      <HomeScreen path="/" />
      <GetStartedScreen path="/get-started" />
      <FilingScheduleScreen path="/schedule" />
    </Router>
  )
}

export default App;

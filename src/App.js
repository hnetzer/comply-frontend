import React from 'react';
import { Router } from "@reach/router"

import FilingScheduleScreen from "./screens/FilingScheduleScreen"
import GetStartedScreen from "./screens/GetStartedScreen"

const App = (props) => {

  return (
    <Router>
      <GetStartedScreen path="/" />
      <FilingScheduleScreen path="/schedule" />
    </Router>
  )
}

export default App;

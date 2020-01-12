import React from 'react';
import { Router, Link } from "@reach/router"

import FilingScheduleScreen from "./screens/FilingScheduleScreen"
import GetStartedScreen from "./screens/GetStartedScreen"

let Home = () => <div>Home</div>
let Dash = () => <div>Dash</div>

const App = (props) => {

  return (
    <Router>
      <GetStartedScreen path="/" />
      <FilingScheduleScreen path="/schedule" />
    </Router>
  )
}

export default App;

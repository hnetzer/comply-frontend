import React from 'react';
import { connect } from 'react-redux';
import { Router, Redirect } from "@reach/router"

// Signup
import SignupScreen from 'screens/signup/SignupScreen'

// Onboarding
import OnboardingScreen from "screens/onboarding/OnboardingScreen"

import WebsiteScreen from "screens/public/Website/WebsiteScreen"
import HomeScreen from "screens/home/HomeScreen"
import LoginScreen from 'screens/public/Login/LoginScreen'

// Admin
import AdminScreen from "./screens/admin/AdminScreen"


const App = ({ auth }) => {

  const isAuth = (auth.user) != null && (auth.token != null)

  const renderProtectedRoutes = () => {
    return (
      <>
        <OnboardingScreen path="/onboarding/*" />
        <AdminScreen path="/admin/*" />
        <HomeScreen path="/home/*" />
      </>
    )
  }

  const renderRedirects = () => {
    return (
      <>
        <Redirect from="/onboarding/*" to="/login" noThrow />
        <Redirect from="/admin/*" to="/login" noThrow />
        <Redirect from="/home/*" to="/login" noThrow />
      </>
    )
  }

  return (
    <Router className="rootRouter">
      <WebsiteScreen path="/" />
      <LoginScreen path="/login" />
      <SignupScreen path="/signup" />
      {isAuth ? renderProtectedRoutes() : renderRedirects()}
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);

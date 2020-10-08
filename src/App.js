import React from 'react';
import { connect } from 'react-redux';
import { Router, Redirect } from "@reach/router"

// Signup
import SignupScreen from 'screens/signup/SignupScreen'
import FinishSignupScreen from 'screens/signup/FinishSignupScreen'

// Onboarding
import OnboardingScreen from "screens/onboarding/OnboardingScreen"

import HomeScreen from "screens/home/HomeScreen"
import LoginScreen from 'screens/public/Login/LoginScreen'

// Admin
import AdminScreen from "./screens/admin/AdminScreen"

const App = ({ auth }) => {

  const isAuth = (auth.user) != null && (auth.token != null)

  const renderProtectedRoutes = () => {
    return (
      <>
        <OnboardingScreen path="/onboarding/company/:companyId/*" />
        <AdminScreen path="/admin/*" />
        <HomeScreen path="/company/:companyId/*" />
        <Redirect from="/home/settings" to={`/company/${auth.user.company_id}/settings`} noThrow/>
        <Redirect from="/home/*" to={`/company/${auth.user.company_id}`} noThrow/>
        <Redirect from="/onboarding" to={`/onboarding/company/${auth.user.company_id}`} noThrow/>
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
      <SignupScreen path="/" />
      <SignupScreen path="/signup" />
      <FinishSignupScreen path="/signup/:userId" />
      <LoginScreen path="/login" />

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

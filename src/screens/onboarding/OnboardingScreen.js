import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"
import { logout } from 'actions';

import { AccountMenu } from 'components/molecules'

import styles from './OnboardingScreen.module.scss'

const OnboardingScreen = ({ user, company, dispatch }) => {

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return(
    <div className={styles.onboardingContainer}>
      <header className={styles.headerBar}>
        <div className={styles.leftHeaderSection}>
          <h3 className={styles.complyLogo}>Comply</h3>
          <span className={styles.accountText}>ACCOUNT</span>
          <span className={styles.companyName}>{company.name}</span>
        </div>
        <AccountMenu
          variant="light"
          user={user}
          handleLogout={handleLogout} />
      </header>
      <main className={styles.main}>
        <h4>Onboarding</h4>
      </main>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    company: state.auth.company,
  }
}

export default connect(mapStateToProps)(OnboardingScreen);

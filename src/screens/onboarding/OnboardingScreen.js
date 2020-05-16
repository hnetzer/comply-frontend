import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"
import { logout } from 'actions';

import Button from 'react-bootstrap/Button'

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
        <section className={styles.progressBarSection}>
          <div>[progress bar]</div>
        </section>
        <section className={styles.mainContentSection}>
          <img className={styles.image} src="https://comply-assets.s3-us-west-2.amazonaws.com/bliss.png" />
          <div className={styles.content}>
            <h3>Setting up your company</h3>
            <br/>
            <p>We'll ask you a few questions about your company and agency registrations.</p>
            <p>
              Setup should take about 10 minutes. Your progress is saved between steps
              so you can leave and come back to complete the setup at any time.
            </p>
            <p>You will need the following documents</p>
            <ul>
              <li>Certificate of Incorporation</li>
              <li>Agency Registrations</li>
              <li>Business Licenses</li>
            </ul>
            <Button>Let's get started</Button>
          </div>
        </section>
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

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "@reach/router"

import { ReactComponent as SignupGraphic } from './signup.svg';

import { checkForAdmin } from 'utils';

import { Card, Button, Input } from 'components/atoms';

import styles from './WebsiteScreen.module.scss'

const WebsiteScreen = ({ token, company, user }) => {

  // If the user is already logged in, then take them to home
  if(token) {

    if (checkForAdmin(user)) {
      return <Redirect to="/admin" noThrow />;
    }

    if (!company.onboarded) {
      return <Redirect to="/onboarding" noThrow />;
    }
    return <Redirect to="/home" noThrow />;
  }

  return(
    <div className={styles.container}>
      <div className={styles.wordmarkLogo}>
        Comply
      </div>
      <Card className={styles.card}>
        <div className={styles.title}>Start for Free</div>
        <p className={styles.subtitle}>You're just seconds away from simplified compliance.</p>
        <SignupGraphic style={{ width: 401 }} />
        <input placeholder="Your Work Email" className={styles.emailInput} type="text" />
        <Button className={styles.cta}>Sign Up</Button>
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    company: state.auth.company
  }
}

export default connect(mapStateToProps)(WebsiteScreen);

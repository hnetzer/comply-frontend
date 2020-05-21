import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "@reach/router"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './Website.module.scss'

const WebsiteScreen = ({ token, company }) => {

  // If the user is already logged in, then take them to home
  if(token) {
    if (!company.onboarded) {
      return <Redirect to="/onboarding" noThrow />;
    }
    return <Redirect to="/home" noThrow />;
  }

  return(
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.complyTitle}>Comply</Card.Title>
          <Card.Subtitle className={styles.complyTagline}>Simple. Dependable. Smart.</Card.Subtitle>
          <div style={{
              marginTop: 32,
              width: '70%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly'  }}>
            <Button
              variant="primary"
              href="/signup"
            >
              Sign Up
            </Button>
            <Button
              variant="secondary"
              href="login"
            >
              Log In
            </Button>
          </div>
        </Card.Body>
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

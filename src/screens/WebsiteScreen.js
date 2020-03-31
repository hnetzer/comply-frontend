import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './Website.module.scss'

const WebsiteScreen = (props) => {
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
              href="/signup/get-started"
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

export default WebsiteScreen;

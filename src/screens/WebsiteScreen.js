import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './Website.module.css'

const WebsiteScreen = (props) => {

  return(
    <div className={styles.container}>
      <Card style={{
        width: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <Card.Body style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Card.Title><h1>Comply</h1></Card.Title>
          <Card.Subtitle>Keeping your buisness in good standing</Card.Subtitle>
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

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import styles from './Website.module.css'

import { loginRequest } from 'network/api';
import { login } from 'actions';

import { LoginForm } from 'forms'

const LoginScreen = (props) => {
  const [error, setError] = useState(null);

  const initialFormValues = {
    email: '',
    password: ''
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      const response = await loginRequest(email, password)
      props.dispatch(login(response))
      navigate('/home')
    } catch (err) {
      setError('Email and password are not valid.')
    }
  }

  return(
    <div className={styles.container}>
      <Card style={{
        width: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <Card.Body>
          <Card.Title>Login to Comply</Card.Title>
          <LoginForm
            initialValues={initialFormValues}
            handleSubmit={handleSubmit}
            error={error}
            />

        </Card.Body>
        <Button variant="link" href="/signup/get-started" style={{ marginBottom: 16 }}>
          Create account
        </Button>
      </Card>
    </div>
  )
}

export default connect()(LoginScreen);

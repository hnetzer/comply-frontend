import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import Card from 'react-bootstrap/Card';

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
      console.log(err)
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
      </Card>
    </div>
  )
}

export default connect()(LoginScreen);

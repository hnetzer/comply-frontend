import React from 'react';
import { navigate } from "@reach/router"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './Website.module.css'

import { login } from 'network/api';

import { LoginForm } from 'forms'

const LoginScreen = (props) => {

  const initialFormValues = {
    email: '',
    password: ''
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      await login(email, password)
      // props.dispatch(createAccountResponse(response))
      navigate('/home')
    } catch (err) {
      alert(err.message)
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
            handleSubmit={handleSubmit} />
        </Card.Body>
      </Card>
    </div>
  )
}

export default LoginScreen;

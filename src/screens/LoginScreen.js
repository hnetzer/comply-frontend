import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate, Redirect } from "@reach/router"

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import styles from './Website.module.scss'

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

      const { user } = response
      // If admin, then go to admin
      if (user.roles != null && user.roles.indexOf('admin') !== -1) {
        navigate('/admin')
        return
      }

      // Otherwise go to client home
      navigate('/home')
    } catch (err) {
      console.log(err)
      setError('Email and password are not valid.')
    }
  }

  if(props.token) {
    return <Redirect to="/home" noThrow />;
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

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps)(LoginScreen);

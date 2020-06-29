import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate, Redirect } from "@reach/router"

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import styles from './LoginScreen.module.scss'

import { loginRequest } from 'network/api';
import { login } from 'actions';
import { checkForAdmin } from 'utils';

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

      const { user, company } = response

      if (window.FS) {
        // Send the user info to full story
        const FS = window.FS;
        FS.identify(user.id, {
          displayName: `${user.first_name} ${user.last_name}`,
          email: user.email,
        })
      }

      // If admin, then go to admin
      if (checkForAdmin(user)) {
        navigate('/admin')
        return
      }

      if (!company.onboarded) {
        navigate('/onboarding')
        return
      }

      // Otherwise go to client home
      navigate('/home')
    } catch (err) {
      setError('Email and password are not valid.')
    }
  }

  if(props.token && props.user.roles != null && props.user.roles.indexOf('admin') === -1) {
    if(!props.company.onboarded) {
      return <Redirect to="/onboarding" noThrow />;
    }
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
        <Button variant="link" href="/signup" style={{ marginBottom: 16 }}>
          Create account
        </Button>
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

export default connect(mapStateToProps)(LoginScreen);

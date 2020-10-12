import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate, Redirect } from "@reach/router"
import { GoogleLogin } from 'react-google-login';
import { Formik, Form, Field } from 'formik';
import { Button, Divider } from 'components/atoms'
import * as Yup from 'yup';

import { login, googleLogin } from 'network/api';
import { setLogin } from 'actions';
import { checkForAdmin } from 'utils';


import styles from './LoginScreen.module.scss'

const formSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});


const LoginScreen = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)

  if (props.token && props.user.roles != null && props.user.roles.indexOf('admin') === -1) {
    if(!props.company.onboarded) {
      return <Redirect to="/onboarding" noThrow />;
    }
    return <Redirect to="/home" noThrow />;
  }


  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      setErrorMessage(null)
      const response = await login(email, password)
      onSuccess(response)
    } catch (err) {
      console.log(err)
      setErrorMessage('Incorrect email and password.')
    }
  }

  const handleGoogleLogin = async (googleUser) => {
    try {
      setErrorMessage(null)
      const response = await googleLogin(googleUser.tokenObj)
      onSuccess(response)
    } catch (err) {
      console.log(err)
      setErrorMessage('User account not found.')
    }
  }

  const onSuccess = (response) => {
    props.dispatch(setLogin(response))
    const { user, company } = response

    // Send user info to full story
    /*if (window.FS) { window.FS.identify(user.id, { email: user.email }) }*/

    if (checkForAdmin(user)) { navigate('/admin'); return;  }
    if (!company.onboarded) { navigate(`/onboarding/company/${company.id}`); return; }
    navigate('/home')
  }


  return(
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.wordmarkLogo}>
          Comply
        </div>
        <div className={styles.mainContent}>
          <div className={styles.title}>Welcome Back!</div>
          <p className={styles.desc}>Please sign in to continue</p>
          <GoogleLogin
            className={styles.googleButton}
            buttonText="Continue with Google"
            clientId="175499467696-6ge2c4lq57vkka7om81namuk0rd362pa.apps.googleusercontent.com"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin} />
          <div className={styles.orSection}>
            <Divider />
            <span className={styles.orText}>or</span>
            <Divider />
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validateOnMount
            validationSchema={formSchema}
            onSubmit={handleSubmit}>
          {({ values, errors, handleSubmit, isSubmitting, isValid }) => (
              <Form>
                <Field type="email" name="email" placeholder="Email" className={styles.input} />
                <Field type="password" name="password" placeholder="Password" className={styles.input} />
                <Button type="submit" variant="signup" disabled={!isValid} className={styles.cta}>Log In</Button>
              </Form>
            )}
          </Formik>
          <div className={styles.error}>
            {errorMessage}
          </div>
        </div>
        <div className={styles.footer}>
          <p style={{ marginRight: 4 }}>New to Comply?</p>
          <a href="/signup">Sign up now</a>
        </div>
      </div>
      <div className={styles.rightContainer}></div>
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

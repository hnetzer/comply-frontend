import React, { useState} from 'react';
import { connect } from 'react-redux';
import { Redirect, navigate } from "@reach/router"
import { GoogleLogin } from 'react-google-login';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { checkForAdmin } from 'utils';
import { googleSignup, checkEmail } from 'network/api'
import { setLogin } from 'actions';
import { ReactComponent as SignupGraphic } from './signup.svg';
import { Card, Button, Divider } from 'components/atoms';

import styles from './Signup.module.scss'

const formSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignupScreen = ({ token, company, user, dispatch }) => {
  const [errorMessage, setErrorMessage] = useState(null)

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


  const handleEmailSignup = async (values, { setSubmitting }) => {
    const data = { email: values.email }

    try {
      setErrorMessage(null)
      await checkEmail(data.email)

      // need to check email avaliablity here :)
      navigate(`/signup/${data.email}`)
    } catch (err) {
      setErrorMessage(err.message)
      console.log(err)
    }
  }

  const handleGoogleSignup = async (googleUser) => {
    try {
      setErrorMessage(null)
      const response = await googleSignup(googleUser.tokenObj)
      dispatch(setLogin(response))

      const user = response.user;
      const company = response.company;

      // Send user info to full story
      if (window.FS) {
        window.FS.identify(user.id, { email: user.email });
      }

      navigate(`/onboarding/company/${company.id}`)
    } catch (err) {
      setErrorMessage(err.message)
      console.log(err)
    }
  }

  const handleGoogleSignupError = ({ error, details }) => {
    setErrorMessage(details)
  }

  return(
    <div className={styles.signupPage}>
      <div className={styles.topBar}>
        <div className={styles.wordmarkLogo}>
          Comply
        </div>
        <div className={styles.loginLink}>
          <a href="/login">Log In</a>
        </div>
      </div>
      <Card className={styles.card}>
        <div className={styles.title}>Get Started</div>
        <p className={styles.subtitle}>You're just seconds away from simplified compliance.</p>
        <SignupGraphic style={{ width: '100%'}} />
        <GoogleLogin
          className={styles.googleButton}
          buttonText="Sign up with Google"
          clientId={GOOGLE_CLIENT_ID}
          onSuccess={handleGoogleSignup}
          onFailure={handleGoogleSignupError} />
        <div className={styles.orSection}>
          <Divider />
          <span className={styles.orText}>or</span>
          <Divider />
        </div>
        <Formik validateOnMount validationSchema={formSchema} initialValues={{ email: '' }} onSubmit={handleEmailSignup}>
          {({ values, errors, handleSubmit, isSubmitting, isValid }) => (
            <Form style={{ width: '100%'}}>
              <Field type="email" name="email" placeholder="Your Work Email" className={styles.input} />
              <Button type="submit" variant="signup" disabled={!isValid} className={styles.cta}>Sign Up</Button>
            </Form>
          )}
        </Formik>
        <div className={styles.error}>
          {errorMessage}
        </div>
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

export default connect(mapStateToProps)(SignupScreen);

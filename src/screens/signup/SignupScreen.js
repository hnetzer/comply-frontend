import React, { useState} from 'react';
import { connect } from 'react-redux';
import { Redirect, navigate } from "@reach/router"
import { GoogleLogin } from 'react-google-login';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { checkForAdmin } from 'utils';
import { createUser, googleLogin } from 'network/api'
import { login } from 'actions';
import { ReactComponent as SignupGraphic } from './signup.svg';
import { Card, Button, Input } from 'components/atoms';

import styles from './Signup.module.scss'

const formSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

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


  const handleSubmit = async (values, { setSubmitting }) => {
    const data = { email: values.email }

    try {
      setErrorMessage(null)
      const user = await createUser(data)
      navigate(`/signup/${user.id}`)

      // Send user info to full story
      if (window.FS) {
        window.FS.identify(user.id, { email: user.email })
      }

    } catch (err) {
      setErrorMessage(err.message)
      console.log(err)
    }
  }

  const handleGoogleSignin = async (googleUser) => {
    try {
      setErrorMessage(null)
      const response = await googleLogin(googleUser.tokenObj)
      dispatch(login(response))

      // Send user info to full story
      /*if (window.FS) {
        window.FS.identify(user.id, { email: user.email })
      }

      const { user, company } = response

      // If admin, then go to admin
      if (checkForAdmin(user)) {
        navigate('/admin')
        return
      }

      if (!company.onboarded) {
        navigate(`/onboarding/company/${company.id}`)
        return
      }

      // Otherwise go to client home
      navigate('/home')*/

    } catch (err) {
      setErrorMessage(err.message)
      console.log(err)
    }
  }

  return(
    <div className={styles.container}>
      <div className={styles.wordmarkLogo}>
        Comply
      </div>
      <Card className={styles.card}>
        <div className={styles.title}>Start for Free</div>
        <p className={styles.subtitle}>You're just seconds away from simplified compliance.</p>
        <SignupGraphic />
        <Formik validationSchema={formSchema} initialValues={{ email: '' }} onSubmit={handleSubmit}>
          {({ values, errors, handleSubmit, isSubmitting,isValid }) => (
            <Form style={{ width: '100%'}}>
              <Field type="email" name="email" placeholder="Your Work Email" className={styles.input} />
              <Button type="submit" disabled={!isValid} className={styles.cta}>Sign Up</Button>
            </Form>
          )}
        </Formik>
        <div className={styles.error}>
          {errorMessage}
        </div>
        <GoogleLogin
          clientId="175499467696-6ge2c4lq57vkka7om81namuk0rd362pa.apps.googleusercontent.com"
          onSuccess={handleGoogleSignin}
          onFailure={handleGoogleSignin}
        />,
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

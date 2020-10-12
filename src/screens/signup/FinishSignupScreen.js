import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { navigate } from "@reach/router"

import { signup } from 'network/api';
import { setLogin } from 'actions';
import { Card, Button } from 'components/atoms'

import styles from './Signup.module.scss'

const formSchema = Yup.object().shape({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  password: Yup.string().required()
});

const FinishSignupScreen = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)

  if (!props.userEmail) {
    setErrorMessage("No userEmail set")
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      email: props.userEmail,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
    };

    try {
      const response = await signup(data)
      props.dispatch(setLogin(response))

      // Send user info to full story
      /*if (window.FS) {
        window.FS.identify(user.id, { email: user.email })
      }*/

      const { company } = response

      if (!company.onboarded) {
        navigate(`/onboarding/company/${company.id}`)
        return
      }

      // Otherwise go to client home
      navigate('/home')

    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wordmarkLogo}>
        Comply
      </div>
      <Card className={styles.card}>
        <div className={styles.title}>Finish Signing Up</div>
        <p className={styles.subtitle}>Access your compliance dashboard in one easy step.</p>
        <Formik validationSchema={formSchema} initialValues={{ email: '' }} onSubmit={handleSubmit}>
          {({ values, errors, handleSubmit, isSubmitting,isValid }) => (
            <Form style={{ width: '100%'}}>
              <Field name="first_name" placeholder="First Name" className={styles.input} />
              <Field name="last_name" placeholder="Last Name" className={styles.input} />
              <Field type="password" name="password" placeholder="Password" className={styles.input} />
              <Button type="submit" disabled={!isValid} className={styles.cta}>Agree and Continue</Button>
            </Form>
          )}
        </Formik>
        <p className={styles.agreeText}>
          {`By continuing, you agree to our `}
          <a href="https://thinkcomply.com/terms">terms</a>
          {` and `}
          <a href="https://thinkcomply.com/policy">policy</a>
        </p>
        <div className={styles.error}>
          {errorMessage}
        </div>
      </Card>
      <p style={{ color: '#fff', paddingTop: 8 }}>Signing up as <b>{props.userEmail}</b></p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(FinishSignupScreen);

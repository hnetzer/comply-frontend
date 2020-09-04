import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { createAccountResponse } from 'actions';
import { createAccount } from 'network/api';

import { CreateAccountForm } from 'forms'

import styles from './Signup.module.scss'

const GetStartedScreen = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    company: '',
    title: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setFormValues(values)
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      title: values.title,
      email: values.email,
      password: values.password,
      company: values.company
    };

    try {
      const response = await createAccount(data)
      props.dispatch(createAccountResponse(response))
      navigate('/onboarding')

      if (window.FS) {
        // Send the user info to full story
        const FS = window.FS;
        const user = response.user
        FS.identify(user.id, {
          displayName: `${user.first_name} ${user.last_name}`,
          email: user.email,
        })
      }

    } catch (err) {
      console.log(err)
      setErrorMessage(err.message)
    }
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.titleSection}>
            <h5>Comply</h5>
            <h3>Get started for free!</h3>
          </div>
          <CreateAccountForm
            initialValues={formValues}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
            />
          <div className={styles.bottomSection}>
            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        </div>

      </section>
      <section className={styles.rightPanel}>


      </section>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(GetStartedScreen);

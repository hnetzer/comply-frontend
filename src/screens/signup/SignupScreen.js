import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { createAccountResponse } from 'actions';
import { createAccount } from 'network/api';

import { CreateAccountForm } from 'forms'

// React Bootstrap components
import Card from 'react-bootstrap/Card';

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
      navigate(`/onboarding/company/${response.company_id}`)

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
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Title style={{ marginBottom: 24 }}><h3>Get Started With Comply</h3></Card.Title>
          <CreateAccountForm
            initialValues={formValues}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
            />
        </Card.Body>
      </Card>
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

import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { createAccountResponse } from 'actions';
import { createAccount } from 'network/api';

import { CreateAccountForm } from 'forms'

// React Bootstrap components
import Card from 'react-bootstrap/Card';

import styles from './Signup.module.css'

const GetStartedScreen = (props) => {

  const initialFormValues = {
    companyName: '',
    companyPhone: '',
    yourName: '',
    yourRole: '',
    accountEmail: '',
    accountPassword: ''
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      user: {
        name: values.yourName,
        role: values.yourRole,
        email: values.accountEmail,
        password: values.accountPassword,
      },
      company: {
        name: values.companyName,
        phone: values.companyPhone
      }
    }

    try {
      const response = await createAccount(data)
      props.dispatch(createAccountResponse(response))
      navigate('/signup/company-details')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Title><h1>Get started</h1></Card.Title>
          <CreateAccountForm
            initialValues={initialFormValues}
            handleSubmit={handleSubmit} />
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

import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { createAccountResponse } from 'actions';
import { createAccount } from 'network/api';

import { CreateAccountForm } from 'forms'

// React Bootstrap components
import Card from 'react-bootstrap/Card';

import styles from './Signup.module.scss'

const GetStartedScreen = (props) => {

  const initialFormValues = {
    firstName: '',
    lastName: '',
    companyName: '',
    title: '',
    email: '',
    password: ''
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      user: {
        firstName: values.yourName,
        lastName: values.lastName,
        title: values.title,
        email: values.email,
        password: values.password,
      },
      company: {
        name: values.companyName,
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
    <Card className={styles.card}>
      <Card.Body className={styles.cardBody}>
        <Card.Title style={{ marginBottom: 24 }}><h3>Get started with Comply</h3></Card.Title>
        <CreateAccountForm
          initialValues={initialFormValues}
          handleSubmit={handleSubmit} />
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(GetStartedScreen);

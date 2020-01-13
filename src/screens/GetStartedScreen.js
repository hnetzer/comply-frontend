import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';

import { createAccount } from '../actions/signup'

// React Bootstrap components
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import styles from './GetStartedScreen.module.css'

const GetStartedScreen = (props) => {
  const [validated, setValidated] = useState(false);

  const initialFormValues = {
    companyName: 'Comply',
    companyPhone: '(412) 551-0569',
    yourName: 'Henry',
    yourRole: 'Controller',
    accountEmail: 'hnetzer19@gmail.com',
    accountPassword: 'test'
  }

  const handleValidation = values => {
    console.log('handleValidation')
    const errors = {};
    /* if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }*/
    console.log(errors)
    return errors;
  }

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('inside handle submit')
    /* setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400); */

    console.log(values)
    props.dispatch(createAccount(values))
  }

  return (
    <Container className={styles.container}>
      <h1 className={styles.header}>Get started with Comply</h1>
      <Container className={styles.formContainer}>
      <Formik
        initialValues={initialFormValues}
        validate={handleValidation}
        onSubmit={handleSubmit}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="text"
                placeholder="Comply Inc."
                value={values.companyName} />
            </Form.Group>
            <Form.Group controlId="companyPhone">
              <Form.Label>Company Phone</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="text"
                placeholder="(888) 888-8888"
                value={values.companyPhone}/>
            </Form.Group>
            <Form.Row>
              <Col>
                <Form.Group controlId="yourName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    required
                    onChange={handleChange}
                    type="text"
                    placeholder="Mike Smith"
                    value={values.yourName} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="yourRole">
                  <Form.Label>Your Role</Form.Label>
                  <Form.Control
                    required
                    onChange={handleChange}
                    value={values.yourRole}
                    as="select">
                    <option>CEO</option>
                    <option>CFO</option>
                    <option>Controller</option>
                    <option>Executive Assistant</option>
                    <option>Administrator</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="accountEmail">
              <Form.Label>Account Email</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="email"
                placeholder="mike@company.com"
                value={values.accountEmail}
                />
            </Form.Group>
            <Form.Group controlId="accountPassword">
              <Form.Label>Account Password</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="password"
                placeholder="******"
                value={values.accountPassword}
                 />
            </Form.Group>
            <Button variant="primary" type="submit" block className={styles.submitButton}>
              Next
            </Button>
          </Form>
        )}
        </Formik>
      </Container>
    </Container>
  )
}

export default connect()(GetStartedScreen);

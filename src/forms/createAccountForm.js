import React, { useState } from 'react';

import { Formik } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const CreateAccountForm = (props) => {
  const [validated] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  const handleValidation = values => {
    console.log('handling the validation')
    const errors = {};
    /* if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }*/
    return errors;
  }

  return (
    <Formik
      initialValues={props.initialValues}
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
          <Button variant="primary" type="submit" block>
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateAccountForm;

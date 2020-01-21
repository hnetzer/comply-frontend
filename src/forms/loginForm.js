import React, { useState } from 'react';

import { Formik } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const LoginForm = (props) => {
  const [validated] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  const handleValidation = values => {
    const errors = {};
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
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            type="email"
            value={values.email}
            />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            type="password"
            value={values.password}
             />
        </Form.Group>
          <Button variant="primary" type="submit" block>
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;

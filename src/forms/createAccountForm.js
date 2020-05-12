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
        <Form.Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="text"
                value={values.firstName} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="text"
                value={values.lastName} />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="companyName">
              <Form.Label>Company</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="text"
                value={values.companyName} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="yourRole">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                value={values.yourRole}
                as="select">
                <option value=""></option>
                <option value="CEO">CEO</option>
                <option value="CFO">CFO</option>
                <option value="Controller">Controller</option>
                <option value="Executive Assitant">Executive Assistant</option>
                <option value="CPA">CPA</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
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
            placeholder=""
            value={values.password}
             />
        </Form.Group>
          <div style={{ marginTop: 32, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button style={{ backgroundColor: '#309F76', borderColor: '#309F76', paddingLeft: 32, paddingRight: 32 }} type="submit">
              Let's get started
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateAccountForm;

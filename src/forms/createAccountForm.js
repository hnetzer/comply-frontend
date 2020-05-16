import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const formSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().min(4, 'To short!').required('Required')
});


const CreateAccountForm = (props) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  const renderErrorMessage = () => {
    if(!props.errorMessage) return null;

    return (
      <Alert style={{ width: '100%' }} variant="danger">
        {props.errorMessage}
      </Alert>
    );
  }

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={formSchema}
      validateOnMount={true}
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
      isValid
      /* and other goodies */
    }) => {
      return (
        <>
        {renderErrorMessage()}
        <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                isInvalid={touched.firstName && errors.firstName} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                isInvalid={touched.lastName && errors.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.lastName} />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                isInvalid={touched.title && errors.title}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
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
          <Col>
            <Form.Group controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control
                isInvalid={touched.company && errors.company}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.company} />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            isInvalid={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            value={values.email}
            />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            isInvalid={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            value={values.password}
             />
        </Form.Group>
          <div style={{
            marginTop: 32,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button
              disabled={!isValid}
              variant="primary"
              style={{ paddingLeft: 48, paddingRight: 48 }}
              type="submit">
              Get started
            </Button>
          </div>
        </Form>
        </>
      )}
    }
    </Formik>
  );
}

export default CreateAccountForm;

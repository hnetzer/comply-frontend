import React, { useState } from 'react';

import { Formik } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup'

const BusinessLicenseForm = (props) => {
  const [validated] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  const handleValidation = values => {
    const errors = {};
    return errors;
  }

  return (
    <>
    <Formik
      initialValues={{ ban: '', ein: '', pin: '', niacs: null, numEmployees: null }}
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
          <Form.Group controlId="ban">
            <Form.Label>Buisness Account Number (BAN)</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              type="text"
              value={values.ban}
              />
          </Form.Group>
          <Form.Group controlId="ein">
            <Form.Label>EIN</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              type="text"
              value={values.ein}
              />
          </Form.Group>
          <Form.Group controlId="pin">
            <Form.Label>Online PIN</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              type="text"
              value={values.pin}
              />
          </Form.Group>
          <Form.Group controlId="property">
            <Form.Label>Does your business own property in SF?</Form.Label>
            <Form.Check label="Yes" type="radio" value={true} />
            <Form.Check label="No" type="radio" />
          </Form.Group>
          <Form.Group controlId="niacs">
            <Form.Label>NIACS Buisness Activity Selection</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.niacs}
              as="select">
              <option value="niacs-56">Admin & Support Services (NIACS - 56)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="property">
            <Form.Label>Does your business recieve rental income in SF?</Form.Label>
            <Form.Check label="Yes" type="radio" value={true} />
            <Form.Check label="No" type="radio" />
          </Form.Group>
          <Form.Group controlId="pin">
            <Form.Label>Number of SF Employees</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              type="number"
              value={values.numEmployees}
              />
          </Form.Group>
          <Form.Group controlId="totalPayroll">
            <Form.Label>Total Payroll Expenses</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                onChange={handleChange}
                type="number"
                value={values.totalPayroll}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="sfPayroll">
            <Form.Label>Payroll Expenses for SF Employees</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                onChange={handleChange}
                type="number"
                value={values.sfPayroll}
              />
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Save Draft
          </Button>
          <Button variant="secondary" type="submit" block>
            Submit to Comply
          </Button>
        </Form>
      )}
    </Formik>
  </>
  );
}

export default BusinessLicenseForm;

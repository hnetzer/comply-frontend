import React, { useState } from 'react';

import { Formik } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const CompanyDetailsForm = (props) => {
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
        <Form validated={validated} onSubmit={handleSubmit} style={{ width: '100%'}}>
          <Form.Group controlId="type">
            <Form.Label>Company Type</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.type}
              as="select">
              <option value="Corporation">Corporation</option>
              <option value="LLC">LLC</option>
              <option value="LP">LP</option>
              <option value="LLP">LLP</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="tax_class">
            <Form.Label>Tax Class</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.tax_class}
              as="select">
              <option value="C Corp">C Corp</option>
              <option value="S Corp">S Corp</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formation_state">
            <Form.Label>Formation State</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.formation_state}
              as="select">
              <option>Delaware</option>
              <option>California</option>
              <option>New York</option>
            </Form.Control>
          </Form.Group>
          <Form.Label>Fiscal Year End</Form.Label>
          <Form.Row>
            <Col>
              <Form.Group controlId="year_end_month">
                <Form.Control
                  required
                  onChange={handleChange}
                  value={values.year_end_month}
                  as="select">
                  <option value={0}>January</option>
                  <option value={1}>Febrary</option>
                  <option value={2}>March</option>
                  <option value={3}>April</option>
                  <option value={4}>May</option>
                  <option value={5}>June</option>
                  <option value={6}>July</option>
                  <option value={7}>August</option>
                  <option value={8}>September</option>
                  <option value={9}>October</option>
                  <option value={10}>November</option>
                  <option value={11}>December</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="year_end_day">
                <Form.Control
                  required
                  onChange={handleChange}
                  value={values.year_end_day}
                  as="select">
                  <option value={31}>31st</option>
                  <option value={30}>30th</option>
                  <option value={29}>29th</option>
                  <option value={28}>28th</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Button variant="primary" type="submit" block>
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default CompanyDetailsForm;

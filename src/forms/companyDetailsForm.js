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
        <Form validated={validated} onSubmit={handleSubmit} style={{ width: '100%'}}>
          <Form.Group controlId="type">
            <Form.Label>Company Type</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.type}
              as="select">
              <option>Corporation</option>
              <option>LLC</option>
              <option>LP</option>
              <option>LLP</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="tax_class">
            <Form.Label>Tax Class</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.tax_class}
              as="select">
              <option>C Corp</option>
              <option>S Corp</option>
            </Form.Control>
          </Form.Group>
          <Form.Label><b>Fiscal Year End</b></Form.Label>
          <Form.Row>
            <Col>
              <Form.Group controlId="year_end_month">
                <Form.Label>Month</Form.Label>
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
                <Form.Label>Day</Form.Label>
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
          <Form.Label><b>Formation Details</b></Form.Label>
          <Form.Row>
            <Col>
              <Form.Group controlId="formation_state">
                <Form.Label>State</Form.Label>
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
            </Col>
            <Col>
              <Form.Group controlId="formation_reg_date">
                <Form.Label>Registration Date</Form.Label>
                <Form.Control
                  required
                  onChange={handleChange}
                  type="text"
                  placeholder="2018-10-31"
                  value={values.formation_reg_date} />
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

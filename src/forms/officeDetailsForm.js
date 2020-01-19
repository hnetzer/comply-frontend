import React, { useState } from 'react';

import { Formik } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const OfficeDetailsForm = (props) => {
  const [validated] = useState(false);
  const [officeCount, setOfficeCount] = useState(1);

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
            <Form.Label>Office Type</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.type}
              as="select">
              <option>Primary</option>
              <option>Secondary</option>
              <option>Remote</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              type="text"
              placeholder=""
              value={values.address} />
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.city} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  onChange={handleChange}
                  value={values.state}
                  as="select">
                  <option>California</option>
                  <option>New York</option>
                  <option>Delaware</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group controlId="zip">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              type="text"
              placeholder=""
              value={values.zip} />
          </Form.Group>
          <Button
            onPress={() => setOfficeCount(officeCount + 1)}
            variant="link">
            + Add Another Office
          </Button>
          <Button variant="primary" type="submit" block>
            Finish!
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default OfficeDetailsForm;

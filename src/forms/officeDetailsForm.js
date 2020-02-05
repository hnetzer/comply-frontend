import React, { useState } from 'react';

import { Formik, FieldArray } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const OfficeDetailsForm = (props) => {
  const [validated] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  const handleValidation = values => {
    const errors = {};
    return errors;
  }

  const getOrdinal = (index) => {
    const ordinals = ['Primary', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth'];
    return ordinals[index]
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
        <FieldArray
          name="offices"
          render={arrayHelpers => (
          <>
            {values.offices.map((office, index) => (
              <div key={index}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid #c0c0c0', marginBottom: 10}}>
                <h5>{`${getOrdinal(index)} Office`}</h5>
                {(index !== 0) ? (
                  <Button variant="link" onClick={() => arrayHelpers.remove(index)}>
                  Remove
                  </Button>) : null}
                </div>
                <Form.Group controlId={`offices[${index}].address`}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    onChange={handleChange}
                    type="text"
                    value={values.offices[index].address} />
                </Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Group controlId={`offices[${index}].city`}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        onChange={handleChange}
                        value={values.offices[index].city}
                        as="select">
                        <option value=""></option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="New York">New York</option>
                        <option value="San Francisco">San Francisco</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId={`offices[${index}].state`}>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        required
                        onChange={handleChange}
                        value={values.offices[index].state}
                        as="select">
                        <option value=""></option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                  <Form.Group controlId={`offices[${index}].zip`}>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      required
                      onChange={handleChange}
                      type="text"
                      placeholder=""
                      value={values.offices[index].zip} />
                  </Form.Group>
                  </Col>
                  <Col/>
                </Form.Row>
              </div>
            ))}
            <Button
              onClick={() => arrayHelpers.push({
                address: '',
                city: '',
                state: '',
                zip: ''
              })}
              variant="link">
              + Add Another Office
            </Button>
            </>
          )}
        />
        <Button variant="primary" type="submit" block>
          Next
        </Button>
      </Form>
    )}
    </Formik>
  );
}

export default OfficeDetailsForm;

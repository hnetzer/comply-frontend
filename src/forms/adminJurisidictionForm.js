import React, { useState } from 'react';

import { Formik } from 'formik';

import states from '../data/states.json'

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdminJurisdictionForm = (props) => {
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
      initialValues={props.initialValues === null ? { name: '', state: '', type: '' } : props.initialValues}
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
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              type="text"
              placeholder=""
              value={values.name} />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.state}
              as="select">
              <option value={null}></option>
              {states.map((s,i) => <option key={i} value={s.name}>{s.name}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.type}
              as="select">
              <option value={null}></option>
              <option value="state">State</option>
              <option value="county">County</option>
              <option value="city">City</option>
            </Form.Control>
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button variant="primary" type="submit">
              {props.initialValues === null ? 'Create' : 'Update'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  </>
  );
}

export default AdminJurisdictionForm;

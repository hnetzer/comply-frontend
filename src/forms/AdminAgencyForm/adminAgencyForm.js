import React, { useState } from 'react';

import { Formik } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdminAgencyForm = (props) => {
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
      initialValues={props.initialValues === null ? { name: '', website: ' ' } : props.initialValues}
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
          <Form.Group controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              type="text"
              placeholder=""
              value={values.website} />
          </Form.Group>
          <Form.Group controlId="jurisdiction_id">
            <Form.Label>Jurisdiction</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.jurisdiction_id}
              as="select">
              <option value={null}></option>
              {props.jurisdictions.map((j,i) => <option key={i} value={j.id}>{`${j.name} (${j.state})`}</option>)}
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

export default AdminAgencyForm;

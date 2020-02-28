import React, { useState } from 'react';

import { Formik } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdminRejectFilingForm = (props) => {
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
      initialValues={{ reason: '' }}
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
          <Form.Group controlId="reason">
            <Form.Label>Issue</Form.Label>
            <Form.Control
              required
              as="textarea"
              onChange={handleChange}
              value={values.reason}
              rows="5" />
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button variant="secondary" onClick={props.handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Confirm rejection
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  </>
  );
}

export default AdminRejectFilingForm;

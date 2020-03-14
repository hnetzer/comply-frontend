import React, { useState } from 'react';

import { Formik } from 'formik';

import style from './adminFilingForm.module.css'

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdminFilingForm = ({ filing, handleSubmit }) => {
  const [validated] = useState(false);

  const submit = async (values, { setSubmitting }) => {
    await handleSubmit(values, { setSubmitting })
  }

  const validate = values => {
    const errors = {};
    return errors;
  }

  const initial = filing != null ? { name: filing.name } : { name: '' };

  return (
    <div className={style.container}>
      <Formik
        initialValues={initial}
        validate={validate}
        onSubmit={submit}
        enableReinitialize={true}
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
          </Form>
        )}
      </Formik>
      <code>{initial.name}</code>
    </div>
  );
}

export default AdminFilingForm;

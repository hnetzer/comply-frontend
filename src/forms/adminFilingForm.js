import React, { useState } from 'react';

import { Formik } from 'formik';
import Card from 'react-bootstrap/Card';

import style from './adminFilingForm.module.css'

// Bootstrap components
import Form from 'react-bootstrap/Form';

const AdminFilingForm = ({ filing, jurisdictions, agencies, handleSubmit }) => {
  const [validated] = useState(false);

  const submit = async (values, { setSubmitting }) => {
    await handleSubmit(values, { setSubmitting })
  }

  const validate = values => {
    const errors = {};
    return errors;
  }

  const renderAgencies = (values) => {
    let a = agencies
    if (values.agency.jurisdiction_id != null) {
      // eslint-disable-next-line
      a = a.filter(a => a.jurisdiction_id == values.agency.jurisdiction_id)
    }
    return a.map((a,i) => (<option key={i} value={a.id}>{a.name}</option>))
  }

  const initial = filing != null ? filing :
    {
      name: '',
      agency_id: '',
      agency: { jurisdiction_id: '' }
    };

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
              <Form.Label>Filing Name</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="text"
                style={{ width: 300 }}
                placeholder=""
                value={values.name} />
            </Form.Group>
            <Card style={{ maxWidth: 300 }}>
              <Card.Body>
                <Form.Group controlId="agency.jurisdiction_id">
                  <Form.Label>Jurisdiction</Form.Label>
                  <Form.Control
                    required
                    onChange={handleChange}
                    value={values.agency.jurisdiction_id}
                    as="select">
                    <option value=""></option>
                    {jurisdictions.map((j,i) =>
                      <option key={i} value={j.id}>{`${j.name} (${j.state})`}</option>)}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="agency_id">
                  <Form.Label>Agency</Form.Label>
                  <Form.Control
                    required
                    onChange={handleChange}
                    value={values.agency_id}
                    as="select">
                    <option value=""></option>
                    {renderAgencies(values)}
                  </Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
      <code>{initial.name}</code>
    </div>
  );
}

export default AdminFilingForm;

import React, { useState } from 'react';

import { Formik, FieldArray } from 'formik';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import style from './adminFilingForm.module.css'

import AdminFilingDueDateSection from './adminFilingDueDateSection'

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

  const addFormField = (arrayHelpers) => {
    arrayHelpers.push({
      name: '',
      helperText: '',
      type: 'text',
      order: ''
    })
  }

  const initial = filing != null ? filing :
    {
      name: '',
      agency_id: '',
      agency: { jurisdiction_id: '' },
      fields: [],
      due_date_occurence: 'annual',
      due_date_dependency: 'none',
      due_dates: [{
        fixed_month: '',
        fixed_day: '',
        month_offset: '',
        day_offset: ''
      }]
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
          <Form validated={validated} onSubmit={handleSubmit} className={style.form}>
            <Form.Group controlId="name">
              <Form.Label>Filing Name</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                type="text"
                size="lg"
                autoComplete="off"
                style={{ width: 360 }}
                placeholder=""
                value={values.name} />
            </Form.Group>
            <div className={style.cardRow}>
              <Card className={style.shortCard}>
                <Card.Body>
                  <Card.Title>Agency</Card.Title>
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
              <Card className={style.shortCard}>
                <Card.Body>
                  <Card.Title>Due Dates</Card.Title>
                  <AdminFilingDueDateSection
                    handleChange={handleChange}
                    values={values} />
                </Card.Body>
              </Card>
            </div>
            <Card className={style.fieldsCard}>
              <Card.Body>
                <FieldArray
                  name="fields"
                  render={arrayHelpers => (
                  <>
                    <div className={style.fieldsCardTitleSection}>
                      <Card.Title>Form Fields</Card.Title>
                      <Button
                        onClick={() => addFormField(arrayHelpers)}
                        className={style.addFieldButton}
                        variant="link">+ Add Field</Button>
                    </div>
                    {values.fields.map((field, index) => (
                      <Form.Row key={index}>
                        <Form.Group controlId={`fields[${index}].name`}>
                          <Form.Control
                            required
                            onChange={handleChange}
                            type="text"
                            placeholder="Field name"
                            style={{ width: 256, marginRight: 16 }}
                            autoComplete="off"
                            value={values.fields[index].name} />
                        </Form.Group>
                        <Form.Group controlId={`fields[${index}].helperText`}>
                          <Form.Control
                            required
                            onChange={handleChange}
                            type="text"
                            placeholder="Helper text"
                            style={{ width: 376, marginRight: 16 }}
                            autoComplete="off"
                            value={values.fields[index].helperText} />
                        </Form.Group>
                        <Form.Group controlId={`fields[${index}].order`}>
                          <Form.Control
                            required
                            onChange={handleChange}
                            type="number"
                            style={{ width: 48 }}
                            autoComplete="off"
                            value={values.fields[index].order || (index+1)} />
                        </Form.Group>
                      </Form.Row>
                    ))}
                    </>
                  )}
                />
              </Card.Body>
            </Card>
            <div className={style.ctaContainer}>
              <Button className={style.submitButton} variant="secondary" type="submit">
                Save Filing
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminFilingForm;

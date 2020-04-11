import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import AdminFilingDueDateSection from './adminFilingDueDateSection'

import style from './adminFilingForm.module.css'

const FilingSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short!').required('Required'),
  agency_id: Yup.number().integer().required('Required'),
  agency: Yup.object().shape({
    jurisdiction_id: Yup.number().integer().required('Required')
  }),
  fields: Yup.array().of(Yup.object().shape({
    name: Yup.string().required('Required'),
    helper_text: Yup.string().nullable(),
    order: Yup.number().integer('Number must be an integer').nullable()
  })),
  occurence: Yup.mixed().oneOf(['annual', 'multiple', 'biennial']),
  due_dates: Yup.array().of(Yup.object().shape({
    fixed_month: Yup.number().integer().nullable(),
    fixed_day: Yup.number().integer().nullable(),
    month_offset: Yup.number().integer().nullable(),
    day_offset: Yup.mixed().oneOf(['1', '15', 'end-of-month', null]),
    offset_type: Yup.mixed().oneOf(['none', 'registration', 'year-end']),
  }))
});

const FilingInitialValues = {
  name: '',
  agency_id: '',
  agency: { jurisdiction_id: '' },
  fields: [],
  occurrence: 'annual',
  due_dates: [{
    fixed_month: null,
    fixed_day: null,
    month_offset: null,
    day_offset: null,
    offset_type: 'none'
  }]
};


const AdminFilingForm = ({ filing, jurisdictions, agencies, handleSubmit, status }) => {
  const [validated] = useState(false);

  const submit = async (values, { setSubmitting }) => {
    await handleSubmit(values, { setSubmitting })
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
      helper_text: '',
      type: 'text',
      order: null
    })
  }

  return (
    <div className={style.container}>
      <Formik
        initialValues={filing != null ? filing : FilingInitialValues}
        onSubmit={submit}
        validationSchema={FilingSchema}
        validateOnBlur={false}
        validateOnChange={false}
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
            {console.log(errors)}
            <Form.Group controlId="name">
              <Form.Label>Filing Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                size="lg"
                isInvalid={errors.name}
                autoComplete="off"
                style={{ width: 360 }}
                placeholder=""
                value={values.name} />
              <FormControl.Feedback type='invalid'>{errors.name}</FormControl.Feedback>
            </Form.Group>
            <div className={style.cardRow}>
              <Card className={style.shortCard}>
                <Card.Body>
                  <Card.Title>Agency</Card.Title>
                  <Form.Group controlId="agency.jurisdiction_id">
                    <Form.Label>Jurisdiction</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      value={values.agency.jurisdiction_id}
                      isInvalid={errors.agency && errors.agency.jurisdiction_id}
                      as="select">
                      <option value=""></option>
                      {jurisdictions.map((j,i) =>
                        <option key={i} value={j.id}>{`${j.name} (${j.state})`}</option>)}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="agency_id">
                    <Form.Label>Agency</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      value={values.agency_id}
                      isInvalid={errors.agency_id}
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
                            onChange={handleChange}
                            type="text"
                            placeholder="Field name"
                            isInvalid={errors.fields && errors.fields[index] && errors.fields[index].name}
                            style={{ width: 256, marginRight: 16 }}
                            autoComplete="off"
                            value={values.fields[index].name} />
                        </Form.Group>
                        <Form.Group controlId={`fields[${index}].helper_text`}>
                          <Form.Control
                            onChange={handleChange}
                            type="text"
                            placeholder="Helper text"
                            style={{ width: 360, marginRight: 16 }}
                            autoComplete="off"
                            value={values.fields[index].helper_text || ''} />
                        </Form.Group>
                        <Form.Group controlId={`fields[${index}].order`}>
                          <Form.Control
                            onChange={handleChange}
                            type="number"
                            style={{ width: 56, paddingRight: 8 }}
                            autoComplete="off"
                            value={values.fields[index].order || ''} />
                        </Form.Group>
                      </Form.Row>
                    ))}
                    </>
                  )}
                />
              </Card.Body>
            </Card>
            <div className={style.ctaContainer}>
              {status != null ? (
                <div style={{ color: 'green', marginRight: 16 }}>{status}</div>
              ) : null}
              <Button className={style.submitButton} variant="secondary" type="submit">
                { values.id == null ? 'Create Filing' : 'Update Filing'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminFilingForm;

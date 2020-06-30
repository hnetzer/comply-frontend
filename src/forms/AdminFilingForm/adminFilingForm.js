import React, { useState } from 'react';
import { Formik  } from 'formik';
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
  occurence: Yup.mixed().oneOf(['annual', 'multiple', 'biennial']),
  due_dates: Yup.array().of(Yup.object().shape({
    fixed_month: Yup.number().integer().nullable(),
    fixed_day: Yup.number().integer().nullable(),
    month_offset: Yup.number().integer().nullable(),
    day_offset: Yup.number().integer().nullable(),
    offset_type: Yup.mixed().oneOf(['none', 'registration', 'year-end']),
    month_end: Yup.boolean().nullable(),
  }))
});

const FilingInitialValues = {
  name: '',
  agency_id: '',
  agency: { jurisdiction_id: '' },
  occurrence: 'annual',
  due_dates: [{
    fixed_month: null,
    fixed_day: null,
    month_offset: 0,
    day_offset: 0,
    offset_type: 'none',
    month_end: false,
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

  const jurisdictionSortBy = (a, b) => {
    if (a.state > b.state) return 1;
    if (a.state < b.state) return -1;
    if (a.type > b.type) return -1;
    if (a.type < b.type) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
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
                      {jurisdictions.sort(jurisdictionSortBy).map((j,i) =>
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
            <div className={style.ctaContainer}>
              {status != null ? (
                <div style={{ color: 'green', marginRight: 16 }}>{status}</div>
              ) : null}
              <Button
                className={style.submitButton}
                variant="secondary"
                type="submit"
                disabled={isSubmitting}
              >
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

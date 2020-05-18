import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import states from 'data/states.json'

import Button from 'react-bootstrap/Button';

import style from './companyDetailsForm.module.scss'

const CompanyDetailsForm = (props) => {
  const [validated] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  const handleValidation = values => {
    const errors = {};
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
        <Form className={style.formContainer}>
          <div className={style.formRow}>
            <div className={style.labelGroup}>
              <label className={style.formLabel}>Fiscal Year End</label>
              <small className={style.required}>required</small>
            </div>
            <div className={style.fieldGroup}>
              <div className={style.field}>
                <Field as="select" name="year_end_month">
                  <option value={null}></option>
                  <option value={0}>January</option>
                  <option value={1}>Febrary</option>
                  <option value={2}>March</option>
                  <option value={3}>April</option>
                  <option value={4}>May</option>
                  <option value={5}>June</option>
                  <option value={6}>July</option>
                  <option value={7}>August</option>
                  <option value={8}>September</option>
                  <option value={9}>October</option>
                  <option value={10}>November</option>
                  <option value={11}>December</option>
                </Field>
                <Field as="select" name="year_end_day" style={{ marginLeft: 8}}>
                  <option value={null}></option>
                  <option value={28}>28th</option>
                  <option value={29}>29th</option>
                  <option value={30}>30th</option>
                  <option value={31}>31st</option>
                </Field>
              </div>
              <small>The end of your year for financial reporting.</small>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.labelGroup}>
              <label className={style.formLabel}>Entity Type</label>
              <small className={style.required}>required</small>
            </div>
            <div className={style.fieldGroup}>
              <Field as="select" name="type" className={style.field} style={{ width: 120 }}>
                <option value={null}></option>
                <option value="Corporation">Corporation</option>
                <option value="LLC">LLC</option>
                <option value="LP">LP</option>
                <option value="LLP">LLP</option>
              </Field>
              <small>The type of entity that your company formed under law.</small>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.labelGroup}>
              <label className={style.formLabel}>Tax Classification</label>
              <small className={style.required}>required</small>
            </div>
            <div className={style.fieldGroup}>
              <Field as="select" name="tax_class" className={style.field} style={{ width: 80 }}>
                <option value={null}></option>
                <option value="C Corp">C Corp</option>
                <option value="S Corp">S Corp</option>
              </Field>
              <small>C Corps are taxed seperately from their owners while S Corps are not.</small>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.labelGroup}>
              <label className={style.formLabel}>Formation State</label>
              <small className={style.required}>required</small>
            </div>
            <div className={style.fieldGroup}>
              <Field as="select" name="formation_state" className={style.field}>
                <option value={null}></option>
                {states.map((s,i) => <option key={i} value={s.name}>{s.name}</option>)}
              </Field>
              <small>The state that your business formed in.</small>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #a9a9a9', width: '100%', marginTop: 16}}></div>
          <Button variant="primary" type="submit" style={{ width: 232, marginTop: 36 }}>
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default CompanyDetailsForm;

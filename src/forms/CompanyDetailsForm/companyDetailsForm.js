import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { updateCompany } from 'network/api'
import { setCompanyDetails } from 'actions'

import states from 'data/states.json';
import Button from 'react-bootstrap/Button';
import style from './companyDetailsForm.module.scss';

const formSchema = Yup.object().shape({
  year_end_month: Yup.number().required(),
  year_end_day: Yup.number().required(),
  type: Yup.mixed().oneOf(['Corporation', 'LLC', 'LP', 'LLP']).required(),
  formation_state: Yup.mixed().oneOf(states.map(s => s.name)).required(),
});

const CompanyDetailsForm = ({ user, company, cta, onSuccess, onError, dispatch }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      name: values.name,
      type: values.type,
      year_end_month: values.year_end_month,
      year_end_day: values.year_end_day,
      formation_state: values.formation_state,
    }

    try {
      const response = await updateCompany(data, user.company_id)
      dispatch(setCompanyDetails(response))
      onSuccess(response)
    } catch (err) {
      onError(err)
    }
  }

  const initialValues = company ? {
    name: company.name || '',
    year_end_day: company.year_end_day || '',
    year_end_month: company.year_end_month || '',
    type: company.type || '',
    formation_state: company.formation_state || '',
    } : {
    name: '',
    year_end_day: '',
    year_end_month: '',
    type: '',
    formation_state: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      validateOnMount={true}
      enableReinitialize={true}
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
      isValid
      /* and other goodies */
    }) => (
        <Form className={style.formContainer}>
          { console.log('values', values) }
          { console.log('errors', errors) }
          <div className={style.formRow}>
            <div className={style.labelGroup}>
              <label className={style.formLabel}>Company Name</label>
              <small className={style.required}>required</small>
            </div>
            <div className={style.fieldGroup}>
              <Field name="name" className={style.field} style={{ width: 220 }} />
              <small>The legal name of your company.</small>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.labelGroup}>
              <label className={style.formLabel}>Formation State</label>
              <small className={style.required}>required</small>
            </div>
            <div className={style.fieldGroup}>
              <Field as="select" name="formation_state" className={style.field}>
                <option value={''}></option>
                {states.map((s,i) => <option key={i} value={s.name}>{s.name}</option>)}
              </Field>
              <small>The state where your company was formed. Startups are often formed in Delaware.</small>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.labelGroup}>
              <label className={style.formLabel}>Entity Type</label>
              <small className={style.required}>required</small>
            </div>
            <div className={style.fieldGroup}>
              <Field as="select" name="type" className={style.field} style={{ width: 120 }}>
                <option value={''}></option>
                <option value="Corporation">Corporation</option>
                <option value="LLC">LLC</option>
                <option value="LP">LP</option>
                <option value="LLP">LLP</option>
              </Field>
              <small>The entity you formed under state law.</small>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.labelGroup}>
              <label className={style.formLabel}>Fiscal Year End</label>
              <small className={style.required}>required</small>
            </div>
            <div className={style.fieldGroup}>
              <div className={style.field}>
                <Field as="select" name="year_end_month">
                  <option value={''}></option>
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
                  <option value={''}></option>
                  <option value={28}>28th</option>
                  <option value={29}>29th</option>
                  <option value={30}>30th</option>
                  <option value={31}>31st</option>
                </Field>
              </div>
              <small>The year you use for financial reporting.</small>
            </div>
          </div>
          <Button
            disabled={!isValid}
            variant="primary"
            type="submit"
            style={{ width: 232, marginTop: 36 }}
           >
            {cta}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

CompanyDetailsForm.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
  cat: 'Save'
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    company: state.company.company
  }
}

export default connect(mapStateToProps)(CompanyDetailsForm);

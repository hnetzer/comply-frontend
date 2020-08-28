import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Bootstrap components
import Button from 'react-bootstrap/Button';

import AdminFilingDueDateSection from './adminFilingDueDateSection'

import style from './adminFilingForm.module.css'

const dueDateSchema = Yup.object().shape({
  fixed_month: Yup.number().integer().nullable(),
  fixed_day: Yup.number().integer().nullable(),
  month_offset: Yup.number().integer().nullable(),
  day_offset: Yup.number().integer().nullable(),
  offset_type: Yup.mixed().oneOf(['none', 'registration', 'year-end']).required(),
  month_end: Yup.boolean().nullable(),
});

const filingSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short!').required(),
  agency_id: Yup.number().integer().required(),
  agency: Yup.object().shape({
    jurisdiction_id: Yup.number().integer().required()
  }),
  website: Yup.string().nullable(),
  description: Yup.string().nullable(),
  occurrence: Yup.mixed().oneOf(['annual', 'multiple', 'biennial']).required(),
  due_date: dueDateSchema,
  due_dates: Yup.array().of(dueDateSchema)
});

const DateInitialValues = {
  fixed_month: null,
  fixed_day: null,
  month_offset: 0,
  day_offset: 0,
  offset_type: 'none',
  month_end: false,
}

const FilingInitialValues = {
  name: '',
  agency_id: '',
  agency: { jurisdiction_id: '' },
  website: '',
  description: '',
  occurrence: 'annual',
  due_date: DateInitialValues,
  due_dates: [DateInitialValues]
};


const AdminFilingForm = ({ filing, jurisdictions, agencies, handleSubmit, status }) => {
  const submit = async (values, { setSubmitting }) => {
    if (values.occurrence !== 'multiple') {
      values.due_dates = [values.due_date];
    }

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

  const getInitalValues = () => {
    if (filing) {
      return {
        ...filing,
        due_date: filing.occurrence !== 'multiple' ? filing.due_dates[0] : DateInitialValues,
        due_dates: filing.occurrence === 'multiple' ? filing.due_dates : []
      }
    }
    return FilingInitialValues;
  }


  return (
    <div className={style.container}>
      <Formik
        initialValues={getInitalValues()}
        onSubmit={submit}
        validationSchema={filingSchema}
        enableReinitialize={true}
        validateOnMount={true}
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
          <Form autoComplete="off" className={style.form}>
            {console.log('Admin filing form is valid:', isValid)}
            {console.log("Errors", errors)}
            {console.log('Values', values)}
            <div className={style.label}>Filing Name*</div>
            <Field type="text" name="name" autoComplete="off" className={style.field} />
            <div className={style.divider} />
            <div className={style.label}>Jurisdiction*</div>
            <Field as="select" name="agency.jurisdiction_id" className={style.field}>
              <option value=""></option>
              {jurisdictions.sort(jurisdictionSortBy).map((j,i) =>
                <option key={i} value={j.id}>{`${j.name} (${j.state})`}</option>)}
            </Field>
            <div className={style.label}>Agency*</div>
            <Field as="select" name="agency_id" className={style.field} >
              <option value=""></option>
              {renderAgencies(values)}
            </Field>
            <div className={style.divider} />
            <div className={style.label}>Website URL</div>
            <Field
              type="text"
              name="website"
              value={values.website || ''}
              autoComplete="off"
              style={{ width: '100%'}}
              className={style.field} />
            <div className={style.label}>Description</div>
            <Field
              component="textarea"
              value={values.description || ''}
              name="description"
              autoComplete="off"
              rows={5}
              className={style.textArea} />
            <div className={style.divider} />
            <AdminFilingDueDateSection
              handleChange={handleChange}
              values={values} />
            <div className={style.divider} />
            <div className={style.ctaContainer}>
              {status != null ? (
                <div style={{ color: 'green', marginRight: 16 }}>{status}</div>
              ) : null}
              <Button
                disabled={!isValid || isSubmitting}
                className={style.submitButton}
                variant="secondary"
                type="submit">
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

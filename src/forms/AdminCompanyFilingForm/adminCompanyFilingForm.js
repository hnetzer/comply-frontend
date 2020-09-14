import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'components/atoms';
import * as Yup from 'yup';

import style from './adminCompanyFilingForm.module.scss'

const filingSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short!').required(),
  agency_id: Yup.number().integer().required(),
});


const AdminCompanyFilingForm = ({ companyFiling }) => {
  const submit = async (values, { setSubmitting }) => {
    if (values.occurrence !== 'multiple') {
      values.due_dates = [values.due_date];
    }

    // await handleSubmit(values, { setSubmitting })
  }

  if (!companyFiling) return null;

  return (
    <div className={style.container}>
      <Formik
        initialValues={companyFiling}
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
            <div className={style.label}>Name</div>
            <Field disabled={true} name="filing.name" className={style.field} />
            <div className={style.label}>Agency</div>
            <Field disabled={true} name="filing.agency.name" className={style.field} />
            <div className={style.label}>Jurisdiction</div>
            <Field disabled={true} name="filing.agency.jurisdiction.name" className={style.field} />
            <div className={style.divider} />

            <div className={style.ctaContainer}>
              {/*status != null ? (
                <div style={{ color: 'green', marginRight: 16 }}>{status}</div>
              ) : null */}
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

export default AdminCompanyFilingForm;

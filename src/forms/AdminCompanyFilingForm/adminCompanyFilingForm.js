import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Switch } from 'components/atoms';
import * as Yup from 'yup';

import style from './adminCompanyFilingForm.module.scss'

const companyFilingSchema = Yup.object().shape({
  due_date: Yup.date().required(),
  show: Yup.boolean().required(),
});


const AdminCompanyFilingForm = ({ companyFiling }) => {
  const submit = async (values, { setSubmitting }) => {

    console.log('values: ', values)

    // await handleSubmit(values, { setSubmitting })
  }

  if (!companyFiling) return null;
  const initialValues = {
    id: companyFiling.id,
    due_date: companyFiling.due_date,
    show: !companyFiling.hidden
  }

  return (
    <div className={style.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={companyFilingSchema}
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
            {console.log('values', values)}
            {console.log('errors', errors)}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>
                <div className={style.label}>Name</div>
                <Field disabled={true} value={companyFiling.filing.name} className={style.field} />
                <div className={style.label}>Agency</div>
                <Field disabled={true} value={companyFiling.filing.agency.name} className={style.field} />
                <div className={style.label}>Jurisdiction</div>
                <Field disabled={true} value={companyFiling.filing.agency.jurisdiction.name} className={style.field} />
              </div>
              <div>
                <div className={style.label}>Due Date</div>
                <Field type="date" name="due_date" className={style.field} />
                <div style={{ paddingTop: 30 }}>
                  <Switch
                    trueLabel="SHOW"
                    falseLabel="HIDE"
                    value={values.show}
                    name="show"
                    onChange={handleChange} />
                </div>
              </div>
            </div>

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
                Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminCompanyFilingForm;

import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, FieldArray } from 'formik';

import Button from 'react-bootstrap/Button';
import states from 'data/states.json';
import style from './officeDetailsForm.module.scss';

const formSchema = Yup.object().shape({
  offices: Yup.array().of(Yup.object().shape({
    type: Yup.mixed().oneOf(['Office', 'HQ', 'Remote']).required(),
    address: Yup.string(),
    city: Yup.string().required(),
    state: Yup.mixed().oneOf(states.map(s => s.name)).required(),
    zip: Yup.string().min(5).required()
  }))
});

const OfficeDetailsForm = (props) => {

  const newOffice =  {
    type: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
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
          <FieldArray
            name="offices"
            render={arrayHelpers => (
              <div style={{ width: '100%'}}>
                <div className={style.addRowContainer}>
                  <Button
                    variant="secondary"
                    className={style.addOfficeButton}
                    onClick={() => arrayHelpers.push(newOffice)}>
                    Add office
                  </Button>
                </div>
                <table className={style.table}>
                  <thead>
                    <tr className={style.tableHeaderRow}>
                      <th className={style.tableHeader}>Type</th>
                      <th className={style.tableHeader}>Address</th>
                      <th className={style.tableHeader}>City</th>
                      <th className={style.tableHeader}>State</th>
                      <th className={style.tableHeader}>Zip</th>
                      <th className={style.tableHeader}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.offices.map((office, index) => (
                      <tr key={index} className={style.tableBodyRow}>
                        <td className={style.tableCell}>
                          <Field
                            as="select"
                            name={`offices[${index}].type`}
                            className={style.tableSelect}
                          >
                            <option value={''}></option>
                            <option value="Office">Office</option>
                            <option value="HQ">HQ</option>
                            <option value="Remote">Remote</option>
                          </Field>
                        </td>
                        <td className={style.tableCell}>
                          <Field
                            type="text"
                            name={`offices[${index}].address`}
                            className={style.tableInput}
                            autoComplete="off"
                          />
                        </td>
                        <td className={style.tableCell}>
                          <Field
                            type="text"
                            name={`offices[${index}].city`}
                            className={style.tableInput}
                            autoComplete="off"
                          />
                        </td>
                        <td className={style.tableCell}>
                          <Field
                            as="select"
                            name={`offices[${index}].state`}
                            className={style.tableSelect}
                          >
                            <option value={''}></option>
                            {states.map((s,i) => <option key={i} value={s.name}>{s.abbreviation}</option>)}
                          </Field>
                        </td>
                        <td className={style.tableCell} >
                          <Field
                            type="text"
                            name={`offices[${index}].zip`}
                            className={style.tableInput}
                            autoComplete="off"
                            style={{ width: 56 }}
                          />
                        </td>
                        <td className={style.tableCell}>
                          <button
                            className={style.removeButton}
                            variant="secondary"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )} />
            <Button
              disabled={!isValid}
              variant="primary"
              type="submit"
              style={{ width: 232, marginTop: 56 }}
             >
              Continue
            </Button>
          </Form>
        )}
    </Formik>
  );
}

export default OfficeDetailsForm;

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

// Bootstrap components
import Button from 'react-bootstrap/Button';

import states from 'data/states.json';

import style from './officeDetailsForm.module.scss';

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
        <Form autocomplete="off" className={style.form}>
          <FieldArray
            name="offices"
            render={arrayHelpers => (
              <div style={{ width: '100%'}}>
                <div className={style.addRowContainer}>
                  <Button
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
                            autocomplete="off"
                          />
                        </td>
                        <td className={style.tableCell}>
                          <Field
                            type="text"
                            name={`offices[${index}].city`}
                            className={style.tableInput}
                            autocomplete="off"
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
                            autocomplete="off"
                            style={{ width: 56 }}
                          />
                        </td>
                        <td className={style.tableCell}>
                          <Button variant="link">-</Button>
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

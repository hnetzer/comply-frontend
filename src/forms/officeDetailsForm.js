import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, FieldArray } from 'formik';

import { Table, Header, HeaderCell, Body, Row, Cell } from 'components/atoms'

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
  })).min(1)
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

  const initialValues = props.offices.length ? {
    offices: props.offices
  } : {
    offices: [ newOffice ]
  }

  return (
    <Formik
      initialValues={initialValues}
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
                <Table>
                  <Header>
                      <HeaderCell>Type</HeaderCell>
                      <HeaderCell>Address</HeaderCell>
                      <HeaderCell>City</HeaderCell>
                      <HeaderCell>State</HeaderCell>
                      <HeaderCell>Zip</HeaderCell>
                      <HeaderCell></HeaderCell>
                  </Header>
                  <Body>
                    {values.offices.map((office, index) => (
                      <Row key={index}>
                        <Cell>
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
                        </Cell>
                        <Cell>
                          <Field
                            type="text"
                            name={`offices[${index}].address`}
                            className={style.tableInput}
                            autoComplete="off"
                          />
                        </Cell>
                        <Cell>
                          <Field
                            type="text"
                            name={`offices[${index}].city`}
                            className={style.tableInput}
                            autoComplete="off"
                          />
                        </Cell>
                        <Cell>
                          <Field
                            as="select"
                            name={`offices[${index}].state`}
                            className={style.tableSelect}
                          >
                            <option value={''}></option>
                            {states.map((s,i) => <option key={i} value={s.name}>{s.abbreviation}</option>)}
                          </Field>
                        </Cell>
                        <Cell>
                          <Field
                            type="text"
                            name={`offices[${index}].zip`}
                            className={style.tableInput}
                            autoComplete="off"
                            style={{ width: 56 }}
                          />
                        </Cell>
                        <Cell>
                          <button
                            className={style.removeButton}
                            variant="secondary"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                        </Cell>
                      </Row>
                    ))}
                  </Body>
                </Table>
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

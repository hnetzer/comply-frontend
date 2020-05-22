import React from 'react';

import { Formik, FieldArray, Field, Form } from 'formik';
import { Table, Header, HeaderCell, Body, Row, Cell } from 'components/atoms'

// Bootstrap components
import Button from 'react-bootstrap/Button';

import style from './officeDetailsForm.module.scss';

const AgenciesForm = (props) => {

  const handleSubmit = async (values, { setSubmitting }) => {
    const selectedAgencyIds = [];
    for (let agencyId in values) {
      if (values[agencyId]) {
        selectedAgencyIds.push(parseInt(agencyId))
      }
    }
    await props.handleSubmit(selectedAgencyIds, { setSubmitting })
  }

  const initialValuesMap = () => {
    return props.agencies.reduce((acc, agency) => {
      acc[agency.id] = true;
      return acc;
    }, {})
  }

  /*const getAgencyLabel = (agency, state) => {
    console.log(state)
    if (state.toLowerCase() === agency.jurisdiction.name.toLowerCase()) {
      return toTitleCase(agency.name)
    }
    return `${toTitleCase(agency.name)} (${toTitleCase(agency.jurisdiction.name)})`
  }*/

  return (
    <Formik
      initialValues={initialValuesMap()}
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
        <Form className={style.form}>
          <FieldArray
            name="agencies"
            render={arrayHelpers => {
              return (
                <Table>
                  <Header>
                    <HeaderCell>Jurisdiction</HeaderCell>
                    <HeaderCell>Agency</HeaderCell>
                    <HeaderCell>Are you registered?</HeaderCell>
                    <HeaderCell>Registration Date</HeaderCell>
                  </Header>
                  <Body>
                  {props.agencies.map((agency, index) => {
                    return (<Row key={index}>
                      <Cell>{agency.jurisdiction.name}</Cell>
                      <Cell>{agency.name}</Cell>
                      <Cell>
                        <Field
                          as="select"
                          name={agency.id}
                          onChange={handleChange}
                          className={style.tableSelect}
                        >
                          <option value={null}></option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Field>
                      </Cell>
                      <Cell></Cell>
                    </Row>)
                  })}
                  </Body>
                </Table>
              )}
            }
          />
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

export default AgenciesForm;

import React from 'react';
import * as Yup from 'yup';

import { Formik, FieldArray, Field, Form } from 'formik';
import { Table, Header, HeaderCell, Body, Row, Cell } from 'components/atoms'
import { QuestionToggle } from 'components/molecules'

// Bootstrap components
import Button from 'react-bootstrap/Button';
import style from './agenciesForm.module.scss';

const formSchema = Yup.object().shape({
  agencies: Yup.array().of(Yup.object().shape({
    registered: Yup.mixed().oneOf(["yes", "no"]).required(),
    registration_date: Yup.string().nullable(),
  }))
});

const AgenciesForm = (props) => {

  const handleSubmit = async (values, { setSubmitting }) => {

    const transform = values.agencies.map(a => {
      return {
        agency_id: a.agency_id,
        registered: a.registered === 'yes' ? true : false,
        registration: a.registration_date
      }
    })

    await props.handleSubmit(transform, { setSubmitting })
  }

  const initialValuesMap = () => {
    const companyAgencyMap = props.companyAgencies.reduce((acc, companyAgency) => {
      acc[companyAgency.agency_id] = {
        registration_date: companyAgency.registration,
        registered: companyAgency.registered
      }
      return acc;
    }, {})

    const values = props.agencies.map((agency, index) => {
      const companyAgency = companyAgencyMap[agency.id];
      if (companyAgency) {
        return {
          agency_id: agency.id,
          registered: companyAgency.registered ? 'yes' : 'no',
          registration_date: companyAgency.registration_date
        }
      }

      return {
        agency_id: agency.id,
        registered: '',
        registration_date: null
      }
    })

    return { agencies: values };
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
                    <HeaderCell>Registration date</HeaderCell>
                  </Header>
                  <Body>
                  {props.agencies.map((agency, index) => {
                    return (<Row key={index}>
                      <Cell className={style.cellText}>{agency.jurisdiction.name}</Cell>
                      <Cell className={style.cellText}>{agency.name}</Cell>
                      <Cell>
                        <Field
                          as="select"
                          name={`agencies[${index}].registered`}
                          onChange={handleChange}
                          className={style.tableSelect}
                        >
                          <option value={''}></option>
                          <option value={'yes'}>Yes</option>
                          <option value={'no'}>No</option>
                        </Field>
                      </Cell>
                      <Cell>
                        {
                          values.agencies[index].registered === 'yes' ?
                            (<Field
                              as="input"
                              type="date"
                              name={`agencies[${index}].registration_date`}
                              className={style.tableDatePicker} />)
                            : null
                        }

                      </Cell>
                    </Row>)
                  })}
                  </Body>
                </Table>
              )}
            }
          />
          <div style={{ marginTop: 32}}>
            <QuestionToggle question="Do I need to register with a state secretary of state?">
              <p>
                {`The rules for determining if you need to register with a state
                Secretary of State are written very broadly. Generally, a company is
                required to obtain authorization to conduct business in the state if
                it is “doing business” within the state borders. The definition of
                what qualifies as doing business varies by state, but usually looks
                at whether the company has a physical location, employees, or
                regularly binds contracts in that state.`}
              </p>
            </QuestionToggle>
            <QuestionToggle question="Do I need to register with a city agency or obtain a business license?">
              <p>{`Nearly all cities (and some counties) require you to obtain a
                business license to be authorized to conduct business within the
                city. Generally, having a physical presence in the city is
                sufficient to require a business license. `}</p>
            </QuestionToggle>
            <QuestionToggle
              question="Do I need to register with the city agency that oversees business licenses for remote employees?">
              <p>{`Yes. Having a remote employee work from home counts as sufficient
                business nexus with the city to require a business license. This
                requirement is often overlooked. `} </p>
            </QuestionToggle>
          </div>
          <Button
            disabled={!isValid}
            variant="primary"
            type="submit"
            style={{ width: 232, marginTop: 24 }}
           >
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AgenciesForm;

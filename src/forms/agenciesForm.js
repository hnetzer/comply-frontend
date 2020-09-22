import React from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { updateCompanyAgencies } from 'network/api';
import { setCompanyAgencies } from 'actions'

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

const AgenciesForm = ({ companyId, companyAgencies, cta, faqs, hideReg, onSuccess, onError, dispatch }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const data = values.agencies.map(a => {
      return {
        agency_id: a.agency_id,
        registered: a.registered === 'yes' ? true : false,
        registration: a.registration_date || null
      }
    })

    try {
      const agencies = await updateCompanyAgencies(data, companyId)
      dispatch(setCompanyAgencies(agencies))
      onSuccess()
    } catch (err) {
      onError(err)
    }
  }


  const initialValuesMap = () => {
    const values = companyAgencies.map((companyAgency, index) => {
      return {
        agency: companyAgency.agency,
        agency_id: companyAgency.agency_id,
        registered: companyAgency.registered ? 'yes' : 'no',
        registration_date: companyAgency.registration_date || ''
      }
    })

    return { agencies: values };
  }

  if (!companyAgencies) {
    return (<div>Loading...</div>);
  }

  return (
    <Formik
      initialValues={initialValuesMap()}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
      validateOnMount={true}
      enableReinitialize={true}
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
                    {!hideReg && (<HeaderCell>Registration date</HeaderCell>)}
                  </Header>
                  <Body>
                  {values.agencies.map((companyAgency, index) => {
                    return (<Row key={index}>
                      <Cell className={style.cellText}>{companyAgency.agency.jurisdiction.name}</Cell>
                      <Cell className={style.cellText}>{companyAgency.agency.name}</Cell>
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
                      {!hideReg && (
                        <Cell>
                        {values.agencies[index].registered === 'yes' ?
                            (<Field
                              as="input"
                              type="date"
                              name={`agencies[${index}].registration_date`}
                              className={style.tableDatePicker} />)
                            : null}
                        </Cell>
                      )}
                    </Row>)
                  })}
                  </Body>
                </Table>
              )}
            }
          />
          <div style={{ marginTop: 32, display: faqs ? 'auto' : 'none' }}>
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
            {cta}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

AgenciesForm.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
  cta: "Save",
  faqs: true
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    companyAgencies: state.company.agencies,
    agencies: state.agency.agencies
  }
}


export default connect(mapStateToProps)(AgenciesForm);

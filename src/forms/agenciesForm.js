import React, { useState } from 'react';

import { Formik, FieldArray } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const AgenciesForm = (props) => {
  const [validated] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {

    const selectedAgencyIds = [];
    for (let agencyId in values) {
      if (values[agencyId]) {
        selectedAgencyIds.push(parseInt(agencyId))
      }
    }

    await props.handleSubmit(selectedAgencyIds, { setSubmitting })
  }

  const handleValidation = values => {
    const errors = {};
    return errors;
  }

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const groupAgenciesByState = () => {
    const groupedAgencies = props.agencies.reduce((acc, agency) => {
      agency.selected = true;
      if (agency.jurisdiction.state == null) {
        acc['Federal'] = [ agency ]
        return acc
      }

      if (acc[agency.jurisdiction.state] == null) {
        acc[agency.jurisdiction.state] = [];
      }
      acc[agency.jurisdiction.state].push(agency);
      return acc
    }, {})

    let agenciesByState = []
    for (var key in groupedAgencies) {
      if (groupedAgencies.hasOwnProperty(key)) {
        agenciesByState.push({
          name: key,
          agencies: groupedAgencies[key]
        });
      }
    }

    return agenciesByState;
  }

  const agencySelectMap = () => {
    return props.agencies.reduce((acc, agency) => {
      acc[agency.id] = true;
      return acc;
    }, {})
  }

  return (
    <Formik
      initialValues={agencySelectMap()}
      validate={handleValidation}
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
      /* and other goodies */
    }) => (
        <Form validated={validated} onSubmit={handleSubmit}>
          <FieldArray
            name="states"
            render={arrayHelpers => {
              return (
                <div>
                  {groupAgenciesByState(props.agencies).map((state, stateIndex) => {
                    return (
                      <div key={stateIndex}>
                        <h3>{state.name}</h3>
                        <FieldArray
                          name="states"
                          render={arrayHelpers => (
                            <>
                              {state.agencies.map((agency, agencyIndex) => {
                                //console.log(`${state.name} - ${agency.name} - ${agency.selected}`)
                                return (
                                  <Form.Check
                                    label={toTitleCase(agency.name)}
                                    key={agencyIndex}
                                    type="checkbox"
                                    onChange={handleChange}
                                    name={agency.id}
                                    checked={values[agency.id]} />)
                                })
                              }
                            </>
                          )}
                        />
                      </div>)
                    })
                  }
                </div>)
              }
            }
          />
          <Button variant="primary" type="submit">
            Save Agencies
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AgenciesForm;

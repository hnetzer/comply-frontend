import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

// import { updateCompanyResponse } from 'actions';
import { updateCompany } from 'network/api';

import { CompanyDetailsForm } from 'forms'

// React Bootstrap components
import Card from 'react-bootstrap/Card';

import styles from './Signup.module.css'

const CompanyDetailsScreen = (props) => {

  const initialFormValues = {
    type: 'Corporation',
    tax_class: 'C Corp',
    year_end_month: 11,
    year_end_day: 31,
    formation_state: 'Delaware',
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      type: values.type,
      tax_class: values.tax_class,
      year_end_month: values.year_end_month,
      year_end_day: values.year_end_day,
      jurisdiction: {
        name: values.formation_state,
      }
    }

    try {
      await updateCompany(data, props.company.id, props.token)
      // props.dispatch(createAccountResponse(response))
      navigate('/signup/office-details')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Title><h4>Tell us about {props.company.name}</h4></Card.Title>
          <CompanyDetailsForm
            initialValues={initialFormValues}
            handleSubmit={handleSubmit} />
        </Card.Body>
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    company: state.auth.company,
  }
}

export default connect(mapStateToProps)(CompanyDetailsScreen);

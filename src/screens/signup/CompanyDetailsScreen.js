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
    companyType: 'Corporation',
    companyTaxClass: 'C Corp',
    companyYearEndMonth: 11,
    companyYearEndDay: 31,
    companyFormationState: 'California',
    companyFormationRegDate: '',
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      type: values.companyType,
      tax_class: values.companyTaxClass,
      year_end_month: values.companyYearEndMonth,
      year_end_day: values.companyYearEndDay,
      jurisdiction: {
        name: values.companyFormationState,
        registration: values.companyFormationRegDate
      }
    }

    try {
      const response = await updateCompany(data, props.company.id, props.token)
      // props.dispatch(createAccountResponse(response))
      navigate('/signup/office-details')
    } catch (err) {
      alert(err.message)
    }
  }

  console.log(props)
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
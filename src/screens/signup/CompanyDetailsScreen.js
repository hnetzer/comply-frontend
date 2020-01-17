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
      formation_state: values.companyFormationState,
      formation_registration_date: values.companyFormationRegDate
    }

    try {
      const response = await updateCompany(data, props.token)
      alert('Success updating company details!')
      // props.dispatch(createAccountResponse(response))
      // navigate('/company-details')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Title>Tell us about </Card.Title>
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

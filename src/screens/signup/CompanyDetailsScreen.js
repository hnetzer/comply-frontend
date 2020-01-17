import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

// import { updateCompanyResponse } from 'actions';
// import { updateCompany } from 'network/api';

import { CompanyDetailsForm } from 'forms'

// React Bootstrap components
import Card from 'react-bootstrap/Card';

import styles from './Signup.module.css'

const CompanyDetailsScreen = (props) => {

  const initialFormValues = {
    companyType: '',
    companyTaxClass: '',
    companyYearEndMonth: 11,
    companyYearEndDay: 31,
    companyFormationState: 'California',
    companyFormationRegDate: '2018-10-31'
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      type: values.companyType,
      taxClass: values.companyTaxClass
    }

    try {
      // const response = await createAccount(data)
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

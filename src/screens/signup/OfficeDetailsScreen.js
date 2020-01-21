import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

// import { updateOfficeResponse } from 'actions';
import { updateOffices } from 'network/api';

import { OfficeDetailsForm } from 'forms'

// React Bootstrap components
import Card from 'react-bootstrap/Card';

import styles from './Signup.module.css'

const OfficeDetailsScreen = (props) => {

  const initialFormValues = {
    offices: [{
      address: '',
      city: '',
      state: 'California',
      zip: '',
    }]
  }

  const handleSubmit = async (values, { setSubmitting }) => {

    try {
      await updateOffices(values, props.company.id, props.token)
      // props.dispatch(createAccountResponse(response))
      navigate('/home')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Title><h4>Tell us about your offices</h4></Card.Title>
          <OfficeDetailsForm
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

export default connect(mapStateToProps)(OfficeDetailsScreen);

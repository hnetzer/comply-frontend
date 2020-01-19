import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { OfficeDetailsForm } from 'forms'

// React Bootstrap components
import Card from 'react-bootstrap/Card';

import styles from './Signup.module.css'

const OfficeDetailsScreen = (props) => {

  const initialFormValues = {
    offices: [{
      address: '',
      city: '',
      state: '',
      zip: '',
    }]
  }

  const handleSubmit = async (values, { setSubmitting }) => {

    console.log(values)

    try {
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Title><h2>Where are your offices located?</h2></Card.Title>
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

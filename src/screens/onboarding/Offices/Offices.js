import React from 'react';
import { connect } from 'react-redux';

import { OfficeDetailsForm } from 'forms'
import { updateOffices } from 'network/api'

import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'

import style from '../OnboardingScreen.module.scss'
import screenStyle from './Offices.module.scss'

const Offices = ({ user, dispatch }) => {

  const initialFormValues = {
    offices: [{
      address: '',
      city: '',
      state: '',
      zip: '',
    }]
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateOffices(values, user.company_id)
      // navigate('/home')
    } catch (err) {
      // TODO: Show error message if we get an error response
      alert(err.message)
    }
  }

  return(
    <>
      <Card className={style.progressBarSection}>
        <VerticalProgressBar currentIndex={2}/>
      </Card>
      <Card className={screenStyle.mainCard}>
        <h3>Offices</h3>
        <div className={style.descriptionSection}>
          <h6 className={style.descriptionHeader}>Where are your company offices located?</h6>
          <p className={style.descriptionText}>
            Add your company office locations below. Make sure to also include the location of remote employees.
          </p>
        </div>
        <OfficeDetailsForm
          initialValues={initialFormValues}
          handleSubmit={handleSubmit} />
      </Card>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Offices);

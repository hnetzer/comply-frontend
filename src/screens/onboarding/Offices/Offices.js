import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { OfficeDetailsForm } from 'forms'

import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'

import style from '../OnboardingScreen.module.scss'
import screenStyle from './Offices.module.scss'

const Offices = ({ user, offices, companyId, dispatch }) => {
  const onSuccess = () => {
    navigate(`/onboarding/company/${companyId}/agencies`)
  }

  const onError = (err) => {
    alert(err.message)
  }

  if(!user) return null;

  return(

    <>
      <Card className={style.progressBarSection}>
        <VerticalProgressBar currentIndex={2}/>
      </Card>
      <Card className={screenStyle.mainCard}>
        <h3>Offices</h3>
        <div className={style.descriptionSection}>
          <h6 className={style.descriptionHeader}>Where are your offices?</h6>
          <p className={style.descriptionText}>
            Add your company office locations. Make sure to also include the location of remote employees.
          </p>
        </div>
        {!offices ? (<div>Loading...</div>) :
          <OfficeDetailsForm
            companyId={user.company_id}
            offices={offices}
            onSuccess={onSuccess}
            onError={onError}
            cta="Continue" />
        }
      </Card>
      <div className={style.helpSection}>
        <b>Need help?</b> Contact us <i>help@thinkcomply.com</i>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Offices);

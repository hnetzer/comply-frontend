import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { CompanyDetailsForm } from 'forms'
import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'

import style from '../OnboardingScreen.module.scss'
import screenStyle from './Company.module.scss'

const Company = ({ user, company, dispatch }) => {

  const onSaveSuccess = () => {
    navigate('/onboarding/offices')
  }

  const onSaveError = (err) => {
    alert(err.message)
  }


  return(
    <>
      <Card className={style.progressBarSection}>
        <VerticalProgressBar currentIndex={1}/>
      </Card>
      <Card className={screenStyle.mainCard}>
        <h3>Company</h3>
        <div className={style.descriptionSection}>
          <h6 className={style.descriptionHeader}>Add baseline information</h6>
          <p className={style.descriptionText}>
            Provide information on your company so that we can generate your filing schedule.
          </p>
        </div>
        {!company ? (<div>Loading...</div>) :
          <CompanyDetailsForm
            cta="Continue"
            onSuccess={onSaveSuccess}
            onError={onSaveError} />
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

export default connect(mapStateToProps)(Company);

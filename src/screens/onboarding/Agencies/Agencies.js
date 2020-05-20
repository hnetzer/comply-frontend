import React from 'react';
import { connect } from 'react-redux';

import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'

import style from '../OnboardingScreen.module.scss'

const Agencies = ({ user, offices, dispatch }) => {
  return(
    <>
      <Card className={style.progressBarSection}>
        <VerticalProgressBar currentIndex={3}/>
      </Card>
      <Card style={{ width: 800, display: 'flex', flexDirection: 'column' }}>
        <h3>Agencies</h3>
        <div className={style.descriptionSection}>
          <h6 className={style.descriptionHeader}>Add agency information</h6>
          <p className={style.descriptionText}>
            Based on your company offices, we believe you should be registered with the agencies listed below.
            Please confirm which agencies that your company is registered with. If your company is not registered with an agency,
            we will not track those filings for you.
          </p>
        </div>
      </Card>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Agencies);

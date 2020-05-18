import React from 'react';
import { connect } from 'react-redux';

import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'

import style from '../OnboardingScreen.module.scss'
import screenStyle from './Offices.module.scss'

const Offices = ({ user, dispatch }) => {
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

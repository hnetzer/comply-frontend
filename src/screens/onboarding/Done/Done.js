import React from 'react';

import Button from 'react-bootstrap/Button'
import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'

import style from '../OnboardingScreen.module.scss'

const Done = ({ user, agencies, companyId, dispatch }) => {
  return(
    <>
      <Card className={style.progressBarSection}>
        <VerticalProgressBar currentIndex={4}/>
      </Card>
      <Card style={{ width: 800, display: 'flex', flexDirection: 'column', height: 264 }}>
        <h3>Done!</h3>
        <div className={style.descriptionSection}>
          <h6 className={style.descriptionHeader}>Go to your dashboard</h6>
          <br/>
          <p className={style.descriptionText}>
            We've compiled your filings! Go to the dashboard to track your deadlines.
          </p>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button style={{ width: 232 }} href={`/company/${companyId}`}>
            Go to my Filing Dashboard
          </Button>
        </div>
      </Card>
      <div className={style.helpSection}>
        <b>Need help?</b> Contact us <i>help@thinkcomply.com</i>
      </div>
    </>
  )
}

export default Done;

import React from 'react';

import Button from 'react-bootstrap/Button'
import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'

import style from '../OnboardingScreen.module.scss'

const Done = ({ user, agencies, dispatch }) => {
  return(
    <>
      <Card className={style.progressBarSection}>
        <VerticalProgressBar currentIndex={4}/>
      </Card>
      <Card style={{ width: 800, display: 'flex', flexDirection: 'column', height: 264 }}>
        <h3>Done!</h3>
        <div className={style.descriptionSection}>
          <h6 className={style.descriptionHeader}>Your filing dashboard</h6>
          <p className={style.descriptionText}>
            We've compiled all of your filings and put togeather a schedule of when they're due. Use
            your filing dashboard to help you keep track of all of your filings!
          </p>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button style={{ width: 232 }} href="/home">
            Go to my Filing Dashboard
          </Button>
        </div>
      </Card>
    </>
  )
}

export default Done;

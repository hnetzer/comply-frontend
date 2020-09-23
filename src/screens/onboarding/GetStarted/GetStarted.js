import React from 'react';

import Button from 'react-bootstrap/Button'
import { Card } from 'components/atoms'
import { VerticalProgressBar } from 'components/molecules'

import styles from './GetStarted.module.scss'
import onboardingStyle from '../OnboardingScreen.module.scss'

const GetStarted = ({ user, companyId, dispatch }) => {
  return(
    <>
      <Card className={onboardingStyle.progressBarSection}>
        <VerticalProgressBar currentIndex={0}/>
      </Card>
      <Card className={styles.mainContentSection}>
        <img alt="bliss" className={styles.image} src="https://comply-assets.s3-us-west-2.amazonaws.com/bliss.png" />
        <div className={styles.content}>
          <div>
            <h3>Setting up your company</h3>
            <div style={{ marginTop: 24 }}>
              <p>We'll ask you a few questions about your company and locations.</p>
              <p>
                Your progress is saved between steps.
              </p>
            </div>
          </div>
          <div>
            <Button href={`/onboarding/company/${companyId}/company`}>Let's get started</Button>
          </div>
        </div>
      </Card>
      <div className={onboardingStyle.helpSection}>
        <b>Need help?</b> Contact us <i>help@thinkcomply.com</i>
      </div>
    </>
  )
}

export default GetStarted;

import React from 'react';

import Button from 'react-bootstrap/Button'
import { Card } from 'components/atoms'
import { VerticalProgressBar } from 'components/molecules'

import styles from './GetStarted.module.scss'
import onboardingStyle from '../OnboardingScreen.module.scss'

const GetStarted = ({ user, company, dispatch }) => {
  return(
    <>
      <Card className={onboardingStyle.progressBarSection}>
        <VerticalProgressBar currentIndex={0}/>
      </Card>
      <Card className={styles.mainContentSection}>
        <img alt="bliss" className={styles.image} src="https://comply-assets.s3-us-west-2.amazonaws.com/bliss.png" />
        <div className={styles.content}>
          <h3>Setting up your company</h3>
          <div>
            <p>We'll ask you a few questions about your company and agency registrations.</p>
            <p>
              Setup should take about 10 minutes. Your progress is saved between steps
              so you can leave and come back to complete the setup at any time.
            </p>
            <p>You will need the following documents</p>
            <ul>
              <li>Certificate of Incorporation</li>
              <li>Agency Registrations</li>
              <li>Business Licenses</li>
            </ul>
          </div>
          <div>
            <Button href="/onboarding/company">Let's get started</Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default GetStarted;

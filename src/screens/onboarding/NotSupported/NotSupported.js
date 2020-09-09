import React from 'react';

import { Card } from 'components/atoms'
import Button from 'react-bootstrap/Button';

import style from '../OnboardingScreen.module.scss'
import screenStyle from './NotSupported.module.scss'

const NotSupported = ({ user, company, dispatch }) => {

  return(
    <>
      <Card className={style.progressBarSection}>
      </Card>
      <Card className={screenStyle.mainCard}>
        <h3>Sorry, your company type is not supported</h3>
        <div className={style.descriptionSection}>
          <p className={style.descriptionText}>
            We currently are only supporting <b>corporation</b> and <b>LLC</b> entities at this point.
          </p>
          <p className={style.descriptionText}>
            We appreciate you exploring our product and we have your information.
            We will reach out to you via email when we start to support LP
            and LLP entity types.
          </p>
          <p>
            Thanks for you patience!
          </p>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button style={{ width: 300 }} href="http://thinkcomply.com/home">Go Home</Button>
        </div>
      </Card>
      <div className={style.helpSection}>
        <b>Need help?</b> Contact us <i>help@thinkcomply.com</i>
      </div>
    </>
  )
}

export default NotSupported;

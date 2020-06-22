import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Card } from 'components/atoms'

import style from './PremiumCard.module.scss';

const PremiumCard = ({ annualFilingCount, wantsPremium }) => {
  const [show, setShow] = useState(false);

  const handleInterestedClick = () => {
    wantsPremium()
    setShow(false)
  }

  return (
    <>
      <Card className={style.topCard} style={{ padding: 24, textAlign: 'center' }}>
        <h4>We file for you!</h4>
        <p style={{ fontSize: 16 }}>
          Get peace of mind and confidence that your compliance is under control.
        </p>
        <Button style={{ width: 240 }} onClick={() => setShow(true)}>
          Try Comply Premium
        </Button>
      </Card>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton style={{ border: 'none' }} />
        <Modal.Body className={style.premiumModal}>
          <div className={style.premiumDetails}>
            <h3 className={style.title}>Comply Premium</h3>
            <ul>
              <li>
                <div>Automated filings</div>
                <div><small><i>We do the work</i></small></div>
              </li>
              <li>
                <div>Electronic signature</div>
                <div><small><i>You signoff</i></small></div>
              </li>
              <li>
                <div>Document storage</div>
                <div><small><i>We keep you organized</i></small></div>
              </li>
            </ul>
            <div className={style.priceContainer}>
              <span className={style.price}>{`$${Math.ceil((annualFilingCount * 100) / 12)} `}</span>
              <small className={style.perFiling}>per month</small>
            </div>
            <Button
              onClick={handleInterestedClick}
              className={style.button}
            >
              I'm interested
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: 'none' }} />
    </Modal>
    </>
  )
}

export default PremiumCard;

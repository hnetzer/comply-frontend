import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Card } from 'components/atoms'

import style from './PremiumCard.module.scss';

const PremiumCard = ({ upcomingFilings, unscheduledFilings }) => {
  const [show, setShow] = useState(false);

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
        <Modal.Header closeButton>
          <h3>Comply Premium</h3>
        </Modal.Header>
        <Modal.Body>
          <p>
            We are working on building a company that gives you complete peace of mind for all of your state and local compliance needs.
            This means that we want to handle all of this nasty paper work for you.  Are you interested in a service where we would submit your filings for your business?
            Let us know. Cheers!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button>I'm interested</Button>
          <Button variant="link">No thanks</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default PremiumCard;

import React, { useState } from 'react';
import moment from 'moment'

import Modal from 'react-bootstrap/Modal'
import { Card } from 'components/atoms'
import { Table, Body, Row, Cell } from 'components/atoms'

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './UpcomingDatesCard.module.scss';

const UpcomingDatesCard = ({ upcomingFilings, notSupportedJuris }) => {
  const [show, setShow] = useState(false);

  console.log('Upcoming dates jurisdiction', notSupportedJuris)

  return (
    <>
      <Card className={style.topCard}>
        <div className={style.upcomingTitleContainer}>
          <h4>Upcoming Due Dates</h4>
          { notSupportedJuris && notSupportedJuris.length &&
            (<FontAwesomeIcon
              onClick={() => setShow(true)}
              className={style.warningIcon}
              icon={faExclamationTriangle}
            />)
          }
        </div>
        <div className={style.upcomingTableWrapper}>
          <Table>
            <Body>
              {upcomingFilings && upcomingFilings.map((f,i) => (
                <Row key={i}>
                  <Cell className={style.upcomingCell}>{f.name}</Cell>
                  <Cell className={style.upcomingCell}>{f.agency.jurisdiction.name}</Cell>
                  <Cell className={style.upcomingCell}>{moment(f.due).format("MMM Do, YYYY")}</Cell>
                </Row>
              ))}
            </Body>
          </Table>
        </div>
      </Card>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <h3>Sorry, locations not supported</h3>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UpcomingDatesCard;

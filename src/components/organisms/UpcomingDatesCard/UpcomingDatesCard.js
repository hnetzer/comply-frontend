import React, { useState } from 'react';
import moment from 'moment'

import Modal from 'react-bootstrap/Modal'
import { Card } from 'components/atoms'
import { Table, Body, Row, Cell } from 'components/atoms'

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './UpcomingDatesCard.module.scss';

const UpcomingDatesCard = ({ upcomingFilings, unscheduledFilings }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Card className={style.topCard}>
        <div className={style.upcomingTitleContainer}>
          <h4>Upcoming Due Dates</h4>
          {unscheduledFilings &&
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
          <h3>Some deadlines cannot be determined</h3>
        </Modal.Header>
        <Modal.Body>
          <p>
            Some of your filing deadlines are based your company's registration date with the agency.
            Please enter the registration dates of the agencies highlighed below to show all filing deadlines.
          </p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UpcomingDatesCard;

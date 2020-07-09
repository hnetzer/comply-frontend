import React from 'react';
import moment from 'moment'

import { Card } from 'components/atoms'
import { Table, Body, Row, Cell } from 'components/atoms'

import style from './UpcomingDatesCard.module.scss';

const UpcomingDatesCard = ({ upcomingFilings }) => {

  return (
    <>
      <Card className={style.topCard}>
        <h4>Upcoming Due Dates</h4>
        <div className={style.upcomingTableWrapper}>
          <Table>
            <Body>
              {upcomingFilings && upcomingFilings.map((f,i) => (
                <Row key={i} style={{ border: 'none' }} >
                  <Cell className={style.filingName}>{f.name}</Cell>
                  <Cell className={style.filingJurisdiction}>{f.agency.jurisdiction.name}</Cell>
                  <Cell className={style.filingDueDate}>{moment(f.due).format("MMM Do, YYYY")}</Cell>
                </Row>
              ))}
            </Body>
          </Table>
        </div>
      </Card>
    </>
  )
}

export default UpcomingDatesCard;

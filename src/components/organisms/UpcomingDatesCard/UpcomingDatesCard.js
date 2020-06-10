import React from 'react';
import moment from 'moment'


import { Card } from 'components/atoms'
import { Table, Body, Row, Cell } from 'components/atoms'
import { NotSupportedModal } from 'components/organisms'

import style from './UpcomingDatesCard.module.scss';

const UpcomingDatesCard = ({ upcomingFilings, notSupportedJuris }) => {

  return (
    <>
      <Card className={style.topCard}>
        <div className={style.upcomingTitleContainer}>
          <h4>Upcoming Due Dates</h4>
          <NotSupportedModal jurisdictions={notSupportedJuris} />
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
    </>
  )
}

export default UpcomingDatesCard;

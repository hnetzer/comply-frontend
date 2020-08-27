import React from 'react';
import moment from 'moment';
import classNames from 'classnames'
import { navigate } from "@reach/router"

import { Button } from 'components/atoms'
import style from './FilingCard.module.scss'

const FilingCard = ({ companyFilingId, name, agency, jurisdiction, dueDate, className }) => {

  const goToDetails = () => {
    navigate(`/home/filings/${companyFilingId}`);
  }

  const classes = classNames(style.card, className)
  return (
    <div className={classes}>
      <div className={style.name}>{name}</div>
      <div className={style.dueDate}>
        {`Due ${moment(dueDate).format('MMM Do, YYYY')}`}
      </div>
      <div className={style.jurisdiction}>{`${agency}, ${jurisdiction}`}</div>
      <div className={style.actionContainer}>
        <Button onClick={goToDetails} variant="secondary" outline>View Details</Button>
      </div>
    </div>
  )
}


export default FilingCard

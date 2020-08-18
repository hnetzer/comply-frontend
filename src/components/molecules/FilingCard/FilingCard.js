import React from 'react';
import moment from 'moment';
import style from './FilingCard.module.scss'

const FilingCard = ({ name, agency, jurisdiction, dueDate }) => {
  return (
    <div className={style.card}>
      <div className={style.name}>{name}</div>
      <div className={style.agency}>{agency}</div>
      <div className={style.jurisdiction}>{jurisdiction}</div>
      <div>
        <small>Due:</small>
        <div className={style.dueDate}>
          {moment(dueDate).format('MMM Do, YYYY')}
        </div>
      </div>
      {/*<div>
        <Button size="sm">Filing Details</Button>
        <Button size="sm" variant="link">Agency Website</Button>
      </div>*/}
    </div>
  )
}


export default FilingCard

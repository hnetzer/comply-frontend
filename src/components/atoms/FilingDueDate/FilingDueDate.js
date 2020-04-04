import React from 'react';
import moment from 'moment';

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './FilingDueDate.module.scss'

const FilingDueDate = ({ due, status }) => {
  const getDueText = () => {
    if (!due) {
      return 'Unable to determine'
    }
    if (status === 'filed' || status === 'complete') {
      return 'Filed on [date]'
    }

    const date = moment(due)
    return `Due ${moment().to(date)} (${date.format('M/D/YY')})`
  }

  const getClockStyle = () => {
    const now = new Date()
    const date = new Date(due)


    if (date.getTime() < now.getTime()) {
      return style.clockIconError;
    }
    if (status === 'filed' || status === 'complete') {
      return style.statusNavy;
    }

    if (!due) {
      return style.clockIconError
    }

    return style.clockIcon
  }

  return (
    <div className={getClockStyle()}>
      <FontAwesomeIcon
        className={getClockStyle()}
        icon={faClock} />
      <span className={style.dueText}>
        {getDueText()}
      </span>
    </div>
  )
}

export default FilingDueDate;

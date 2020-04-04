import React from 'react';
import moment from 'moment';

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './FilingDueDate.module.scss'

const FilingDueDate = ({ due, status }) => {
  let text = due != null ? `Due ${moment(due).toNow()}` : 'Unable to determine'
  let clockStyle = due != null ? style.clockIcon : style.clockIconError

  if (status === 'filed' || status === 'complete') {
    text = 'Filed on [date]';
    clockStyle = style.statusNavy;
  }

  if (moment(due).unix() > moment().unix()) {
    clockStyle = style.clockIconError;
  }

  return (
    <span className={clockStyle}>
      <FontAwesomeIcon
        className={clockStyle}
        icon={faClock} />
      <span className={style.dueText}>
          {text}
      </span>
    </span>
  )
}

export default FilingDueDate;

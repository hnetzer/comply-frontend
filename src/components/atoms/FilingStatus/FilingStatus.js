import React from 'react';
import { toTitleCase } from 'utils'

import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './FilingStatus.module.scss'

const FilingStatus = ({ status }) => {

  if (!status) return null;

  let statusText = status
  let statusColor = null
  switch(statusText) {
    case 'draft': {
      statusText = 'Draft';
      statusColor = style.statusSecondary;
      break
    }
    case 'submitted': {
      statusText = 'Submitted';
      statusColor = style.statusNavy;
      break
    }
    case 'needs-follow-up': {
      statusText = 'Needs Follow Up';
      statusColor = style.statusSeconadary;
      break
    }
    case 'needs-signature-payment': {
      statusText = 'Sign & Pay';
      statusColor = style.statusNavy;
      break
    }
    case 'complete': {
      statusText = 'Complete';
      statusColor = style.statusNavy;
      break
    }
    case 'filed': {
      statusText = 'Filed';
      statusColor = style.statusNavy;
      break
    }
    default : {
      statusText = '-';
      statusColor = style.statusSecondary;
    }
  }

  return (
    <span className={statusColor}>
      <span className={style.statusText}>
        {toTitleCase(statusText)}
      </span>
      <FontAwesomeIcon
        className={style.filingIcon}
        icon={faFileAlt} />
    </span>
  )
}

export default FilingStatus;

import React from 'react';
import moment from 'moment';
import { toTitleCase } from 'utils';

import { faClock, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import styles from './FilingCard.module.scss';

const FilingCard = (props) => {

  const renderDueDate = (due) => {
    const text = due != null ? `Due ${moment(due).toNow()}` : 'Unable to determine'
    const clockStyle = due != null ? styles.clockIcon : styles.clockIconError

    return (
      <span>
        <FontAwesomeIcon
          className={clockStyle}
          icon={faClock} />
        <span className={styles.dueText}>
            {text}
        </span>
      </span>
    )
  }

  const renderStatus = (status) => {
    if (!status) return null;

    return (
      <span>
        <span className={styles.statusText}>
          {toTitleCase(status)}
        </span>
        <FontAwesomeIcon
          className={styles.filingIcon}
          icon={faFileAlt} />
      </span>
    )
  }

  const renderCTA = () => {
    const { filing, companyFilingId, status, due } = props

    if (!due) {
      return (
        <Button
          href="/home/agencies"
          variant="secondary"
          block
        >
          Fix Issues
        </Button>
      );
    }

    if (companyFilingId) {
      const linkText = status === 'draft' ? 'Edit Draft' : 'View Details'
      return (
        <Button
          href={`/home/filings/${companyFilingId}`}
          variant="secondary"
          block
        >
          {linkText}
        </Button>
      )
    }


    return (
      <Button
        href={`/home/filings/new?filingId=${filing.id}&due=${due}`}
        block
        variant="secondary"
      >
        Start Filing
      </Button>
    );
  }

  return (
    <div className={props.size === "bg" ? styles.cardBig : styles.cardSmall}>
      <div className={styles.cardTopLine}>
        {renderDueDate(props.due)}
        {renderStatus(props.status)}
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.filingName} >
          {toTitleCase(props.filing.name)}
        </div>
        <div className={styles.filingAgency}>
          {toTitleCase(props.filing.agency.name)}
        </div>
        <div className={styles.filingJurisdiction}>
          {toTitleCase(props.filing.agency.jurisdiction.name)}
        </div>
      </div>
      <div>
        {renderCTA(props.filing.due, props.filing.id)}
      </div>
    </div>
  )
}


export default FilingCard;

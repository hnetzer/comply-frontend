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

  const renderDueDate = (due, status) => {

    let text = due != null ? `Due ${moment(due).toNow()}` : 'Unable to determine'
    let clockStyle = due != null ? styles.clockIcon : styles.clockIconError

    if (status === 'filed' || status === 'complete') {
      text = 'Submitted on [date]';
      clockStyle = styles.filingStatusNavy;
    }

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

    let statusText = status
    let statusColor = null
    switch(statusText) {
      case 'draft': {
        statusText = 'Draft';
        statusColor = styles.filingStatusPrimary;
        break
      }
      case 'submitted': {
        statusText = 'Submitted';
        statusColor = styles.filingStatusNavy;
        break
      }
      case 'needs-follow-up': {
        statusText = 'Needs Follow Up';
        statusColor = styles.filingStatusPrimary;
        break
      }
      case 'needs-signature-payment': {
        statusText = 'Sign & Pay';
        statusColor = styles.filingStatusNavy;
        break
      }
      case 'complete': {
        statusText = 'Complete';
        statusColor = styles.filingStatusNavy;
        break
      }
      case 'filed': {
        statusText = 'Filed';
        statusColor = styles.filingStatusNavy;
        break
      }
    }

    return (
      <span className={statusColor}>
        <span className={styles.statusText}>
          {toTitleCase(statusText)}
        </span>
        <FontAwesomeIcon
          className={styles.filingIcon}
          icon={faFileAlt} />
      </span>
    )
  }

  const renderCTA = () => {
    const { filing, companyFilingId, status, due } = props

    let text = 'View';
    let href = '';
    let variant = 'secondary'

    switch(status) {
      case 'draft': {
        text = 'Edit Draft';
        href = `/home/filings/${companyFilingId}`;
        variant = 'outline-secondary'
        break;
      }
      case 'submitted':
      case 'needs-signature-payment':
      case 'complete':
      case 'filed':
      {
        text = 'View Details';
        href = `/home/filings/${companyFilingId}`;
        variant = 'outline-secondary'
        break
      }
      case 'needs-follow-up': {
        text = 'Fix Issues';
        href = `/home/filings/${companyFilingId}`;
        variant = 'outline-primary'
        break
      }
      default: {
        if (!due) {
          text = 'Add Agency Info';
          href = '/home/agencies';
          variant = 'link'
          break
        }

        // Filing has all data but hasn't been started yet
        text = 'Start Filing';
        href = `/home/filings/new?filingId=${filing.id}&due=${due}`;
        variant = 'secondary'
      }
    }

    return (
      <Button
        href={href}
        block
        variant={variant}
      >
        {text}
      </Button>
    );
  }

  return (
    <div className={props.size === "bg" ? styles.cardBig : styles.cardSmall}>
      <div className={styles.cardTopLine}>
        {renderDueDate(props.due, props.status)}
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

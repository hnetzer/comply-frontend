import React from 'react';

import Button from 'react-bootstrap/Button';
import {
  FilingName,
  FilingAgency,
  FilingJurisdiction,
  FilingStatus,
  FilingDueDate
} from 'components/atoms'

import styles from './FilingCard.module.scss';

const FilingCard = ({ filing, status, due, companyFilingId}) => {

  const renderCTA = () => {
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
    <div className={styles.card}>
      <div className={styles.cardTitleSection}>
        <div>
          <FilingName>{filing.name}</FilingName>
          <FilingAgency>{filing.agency.name}</FilingAgency>
          <FilingJurisdiction>{filing.agency.jurisdiction.name}</FilingJurisdiction>
        </div>
        <FilingStatus status={status} />
      </div>
      <div className={styles.dueSection}>
        <FilingDueDate due={due} status={status} />
      </div>
      <div>
        {renderCTA(filing.due, filing.id)}
      </div>
    </div>
  )
}


export default FilingCard;

import React from 'react';
import moment from 'moment';
import { toTitleCase } from 'utils';

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import styles from './FilingCard.module.css';

const FilingCard = (props) => {

  const renderDueDate = (due) => {
    if (!due) {
      return (<FontAwesomeIcon size="lg" color="#dc3545" icon={faExclamationCircle}/>)
    }
    return (
      <Card.Subtitle className="mb-2 text-muted">
        {`${moment(due).format("MMM Do, YYYY")}`}
      </Card.Subtitle>
    )
  }

  const renderCTA = () => {
    const { due, companyFilingId, id, status } = props.filing

    if (!due) {
      return (<Button style={{ color: '#dc3545'}} variant="link">Add Registration Info ></Button>);
    }

    if (companyFilingId) {
      const linkText = status === 'draft' ? 'Edit' : 'View Details'
      return (<Button href={`/home/filings/${companyFilingId}`} variant="link">{linkText}</Button>)
    }

    const href = `/home/filings/new?filingId=${id}&due=${due}`;
    return (<Button href={href} variant="outline-primary">Start Filing</Button>);
  }

  const renderBadge = () => {
    const { companyFilingId, status } = props.filing
    if (!companyFilingId) return null;
    return (<Badge style={{ marginLeft: 16 }} variant="info">{status}</Badge>)
  }

  return (
    <Card className={styles.card}>
      <Card.Body className={styles.cardBody}>
        <div>
          <Card.Title>
            {toTitleCase(props.filing.name)}
            {renderBadge(props.filing)}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {toTitleCase(props.filing.agency.name)}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {props.filing.agency.jurisdiction.name}
          </Card.Subtitle>
        </div>
        <div className={styles.cardBodyRight}>
          {renderDueDate(props.filing.due)}
          {renderCTA(props.filing.due, props.filing.id)}
        </div>
      </Card.Body>
    </Card>
  )
}


export default FilingCard;

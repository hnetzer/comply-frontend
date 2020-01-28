import React from 'react';
import moment from 'moment';

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import styles from './FilingCard.module.css';

const FilingCard = (props) => {

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

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

  const renderCTA = (due) => {
    return due != null ?
      (<Button variant="outline-primary">Initialize Filing</Button>) :
      (<Button style={{ color: '#dc3545'}} variant="link">Add Registration Info ></Button>);
  }

  return (
    <Card className={styles.card}>
      <Card.Body className={styles.cardBody}>
        <div>
          <Card.Title>{props.filing.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {toTitleCase(props.filing.agency.name)}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {props.filing.agency.jurisdiction.name}
          </Card.Subtitle>
        </div>
        <div className={styles.cardBodyRight}>
          {renderDueDate(props.filing.due)}
          {renderCTA(props.filing.due)}
        </div>
      </Card.Body>
    </Card>
  )
}


export default FilingCard;

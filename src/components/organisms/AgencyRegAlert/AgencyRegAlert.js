import React from 'react';
import { Link } from '@reach/router'

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'components/atoms'

import style from './AgencyRegAlert.module.scss';

const AgencyRegistrationAlert = ({ show, onDismiss}) => {

  return (
    <Alert show={show} onDismiss={onDismiss}>
      <FontAwesomeIcon className={style.warningIcon} icon={faExclamationTriangle}/>
      {`Some of your deadlines could not be determined. Add your `}
      <Link className={style.link} to="/home/company/agencies">agency registration dates</Link>
      {` to complete your filing schedule.`}
    </Alert>
  )
}

export default AgencyRegistrationAlert;

import React, { useState } from 'react';
import { Link } from '@reach/router'

import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './AgencyRegAlert.module.scss';

const AgencyRegistrationAlert = () => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className={style.container} style={{ display: dismissed ? 'none' : 'flex'}}>
      <div>
        <FontAwesomeIcon className={style.warningIcon} icon={faExclamationTriangle}/>
        {`Some of your deadlines could not be determined. Add your `}
        <Link className={style.link} to="/home/company/agencies">agency registration dates</Link>
        {` to complete your filing schedule.`}
      </div>
      <div onClick={() => setDismissed(true)}>
        <FontAwesomeIcon
          className={style.dismissIcon}
          icon={faTimes}/>
      </div>
    </div>
  )
}

export default AgencyRegistrationAlert;

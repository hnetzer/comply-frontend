import React from 'react';

import { Card, Button } from 'components/atoms'
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './FeedbackCard.module.scss';

const FeedbackCard = () => {
  return (
    <Card className={style.card}>
      <h4 className={style.title}>Feedback</h4>
      <div className={style.iconSection}>
        <FontAwesomeIcon className={style.icon} icon={faComments} />
     </div>
     <Button>Let Us Know</Button>
    </Card>
  )
}

export default FeedbackCard;

import React from 'react';
import moment from 'moment';
import { toTitleCase } from 'utils';

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './SideListItem.module.css'


const SideListItem = ({ filing, index, onSelect }) => {

  const handleClick = () => {
    onSelect(index)
  }

  const f = filing
  return (
    <div className={style.item} onClick={handleClick}>
      <div>
        <div className={style.title}>{f.company.name}</div>
        <div className={style.subtitle}>
          {`${f.filing.name} - ${f.filing.agency.jurisdiction.name}`}
        </div>
        <div className={style.subtitle}>
          {`Due: ${moment(f.due_date).format("MMM Do, YYYY")}`}
        </div>
      </div>
      <div className={style.rightContainer}>
        <FontAwesomeIcon className={style.arrow} size="lg" icon={faAngleRight}/>
      </div>
    </div>
  )
}


export default SideListItem;

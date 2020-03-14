import React from 'react';

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './SideListItem.module.css'


const SideListItem = ({ title, subtitle, text, index, onSelect }) => {

  const handleClick = () => {
    onSelect(index)
  }

  return (
    <div className={style.item} onClick={handleClick}>
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subtitle}>{subtitle}</div>
        <div className={style.subtitle}>{text}</div>
      </div>
      <div className={style.rightContainer}>
        <FontAwesomeIcon className={style.arrow} size="lg" icon={faAngleRight}/>
      </div>
    </div>
  )
}


export default SideListItem;

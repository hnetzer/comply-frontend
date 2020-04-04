import React from 'react';
import { toTitleCase } from 'utils'
import style from './FilingAgency.module.scss'

const FilingAgency = ({ children }) => {
  return (
    <div className={style.name}>
      {toTitleCase(children)}
    </div>
  )
}

export default FilingAgency;

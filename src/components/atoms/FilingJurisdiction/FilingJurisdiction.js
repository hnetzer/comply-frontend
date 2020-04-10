import React from 'react';
import { toTitleCase } from 'utils'
import style from './FilingJurisdiction.module.scss'

const FilingJurisdiction = ({ children }) => {
  return (
    <div className={style.name}>
      {toTitleCase(children)}
    </div>
  )
}

export default FilingJurisdiction;

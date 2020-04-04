import React from 'react';
import { toTitleCase } from 'utils'
import style from './FilingName.module.scss'

const FilingName = ({ children }) => {
  return (
    <div className={style.name}>
      {toTitleCase(children)}
    </div>
  )
}

export default FilingName;

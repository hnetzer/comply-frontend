import React from 'react';

import {
  FilingName,
  FilingAgency,
  FilingJurisdiction,
  FilingStatus,
  FilingDueDate
} from 'components/atoms'

import style from './FilingHeader.module.scss'

const FilingHeader = ({ filing, due, status }) => {
  if(!filing) return null;

  return (
    <div>
      <div className={style.topSection}>
        <div>
          <FilingName>{filing.name}</FilingName>
          <FilingAgency>{filing.agency.name}</FilingAgency>
          <FilingJurisdiction>{filing.agency.jurisdiction.name}</FilingJurisdiction>
        </div>
        <div>
          <FilingStatus status={status} />
        </div>
      </div>
      <div className={style.dueSection} >
        <FilingDueDate due={due} status={status} />
      </div>
    </div>
  )
}

export default FilingHeader;

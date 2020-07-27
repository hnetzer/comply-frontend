import React from 'react';

import { Button } from 'components/atoms'

import style from './IncompleteFilingRow.module.scss';

const IncompleteFilingRow = ({ filing, ctaClick }) => {

  return (
    <div className={style.row}>
      <div style={{ width: 260 }}>
        <div className={style.name}>{filing.name}</div>
        <div className={style.jurisdiction}>{filing.agency.jurisdiction.name}</div>
      </div>
      <div className={style.description}>
        <div>Add your registration date with the {filing.agency.name} of {filing.agency.jurisdiction.name} to include this due date in your filing timeline.</div>
      </div>
      <Button onClick={ctaClick} variant="dark">Add Date</Button>
    </div>
  )
}

export default IncompleteFilingRow;

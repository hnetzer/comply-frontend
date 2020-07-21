import React from 'react';

import { Button } from 'components/atoms'

import style from './IncompleteFilingRow.module.scss';

const IncompleteFilingRow = ({ filing }) => {

  return (
    <div className={style.row}>
      <div style={{ width: 260 }}>
        <div className={style.name}>{filing.name}</div>
        <div className={style.jurisdiction}>{filing.agency.jurisdiction.name}</div>
      </div>
      <div className={style.description}>
        <div>You must add your companies registration date with the <b>{filing.agency.name}</b> of <b>{filing.agency.jurisdiction.name}</b> in order to determine this filing's due date.</div>
      </div>
      <Button variant="dark">Add Date</Button>
    </div>
  )
}

export default IncompleteFilingRow;

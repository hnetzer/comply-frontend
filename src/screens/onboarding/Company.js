import React from 'react';

import { Card } from 'components/atoms'

const Company = ({ user, company, dispatch }) => {
  return(
    <>
      <Card style={{ width: 304, height: 448, marginRight: 24 }}>
        <div>[progress bar]</div>
      </Card>
      <Card style={{ width: 800, height: 400 }}>
        <h3>Company</h3>
      </Card>
    </>
  )
}

export default Company;

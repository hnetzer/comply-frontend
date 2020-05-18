import React from 'react';
import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'

const Company = ({ user, company, dispatch }) => {
  return(
    <>
      <Card style={{ width: 304, height: 448, marginRight: 24 }}>
        <VerticalProgressBar currentIndex={1}/>
      </Card>
      <Card style={{ width: 800, height: 400 }}>
        <h3>Company</h3>
      </Card>
    </>
  )
}

export default Company;

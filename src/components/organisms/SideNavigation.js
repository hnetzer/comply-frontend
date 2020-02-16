import React from 'react';

import Nav from 'react-bootstrap/Nav'

const SideNavigation = ({ companyName }) => {

  const style = {
    top: '4rem',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    borderRight: '1px solid #ececec',
    padding: '32px 16px',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '16.6667%',
    maxWidth: '16.666667%',
  }

  return (
    <div style={style}>
      <h5>{companyName}</h5>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home/filings">Filings</Nav.Link>
        <Nav.Link href="/home/agencies">Agencies</Nav.Link>
        <Nav.Link href="/home/company">Company</Nav.Link>
      </Nav>
    </div>
  )
}

export default SideNavigation;

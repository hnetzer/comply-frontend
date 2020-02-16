import React from 'react';

import Nav from 'react-bootstrap/Nav'

const AdminNavigation = () => {

  const style = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  };

  return (
    <Nav variant="tabs" defaultActiveKey="/filings" style={style}>
      <Nav.Item>
        <Nav.Link href="/admin" disabled>Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin/filings">Filings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin/companies" disabled>
          Companies
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default AdminNavigation;

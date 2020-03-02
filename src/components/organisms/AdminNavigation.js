import React, { useState } from 'react';

import Nav from 'react-bootstrap/Nav'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const AdminNavigation = () => {
  const [ops, setOps] = useState(true);

  const style = {
    display: 'flex',
    paddingLeft: 64,
    //justifyContent: 'space-around',
    width: '100%'
  };

  const renderOpsNavItems = () => {
    return (<>
      <Nav.Item>
        <Nav.Link href="/admin/filings">Company Filings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin/companies">Company Data</Nav.Link>
      </Nav.Item>
    </>)
  }

  const renderPlatformNavItems = () => {
    return (<>
      <Nav.Item>
        <Nav.Link href="/admin/platform/jurisdictions">Jurisdictions</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin/platform/agencies">Agencies</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin/platform/filings">Filings</Nav.Link>
      </Nav.Item>
    </>)
  }

  return (
    <Nav variant="tabs" defaultActiveKey="/admin/filings" style={style}>
      <ButtonGroup style={{ marginTop: 8, marginRight: 48}} size="sm" className="mb-2">
        <Button variant={ops ? 'dark' : 'light'} onClick={() => setOps(true)}>Operations</Button>
        <Button variant={ops ? 'light' : 'dark'} onClick={() => setOps(false)}>Platform</Button>
      </ButtonGroup>
      {ops ? renderOpsNavItems() : renderPlatformNavItems()}
    </Nav>
  )
}

export default AdminNavigation;

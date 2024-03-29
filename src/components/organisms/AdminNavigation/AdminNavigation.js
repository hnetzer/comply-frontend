import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate, Link } from "@reach/router"

import { AccountMenu } from 'components/molecules'

import { logout } from 'actions';

import Nav from 'react-bootstrap/Nav'

import style from './AdminNavigation.module.css'


const pathSegment = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1)

const AdminNavigation = ({ user, dispatch }) => {
  const [key, setKey] = useState(pathSegment);

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className={style.headerBar}>
      <h3>Admin</h3>
      <Nav variant="pills" onSelect={(key, evt) => setKey(key)} activeKey={key}>
        <Nav.Link as={Link} to="/admin/companies" eventKey="companies">
          Companies
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/platform/jurisdictions" eventKey="jurisdictions">
          Jurisdictions
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/platform/agencies" eventKey="agencies">
          Agencies
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/platform/filings" eventKey="filings">
          Filings
        </Nav.Link>
      </Nav>
      <AccountMenu
        user={user}
        handleLogout={handleLogout} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(AdminNavigation);

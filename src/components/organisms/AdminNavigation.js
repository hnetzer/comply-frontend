import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AccountMenu } from '../molecules'

import { logout } from 'actions';

import Nav from 'react-bootstrap/Nav'

import style from './AdminNavigation.module.css'

const AdminNavigation = ({ user, dispatch }) => {

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className={style.headerBar}>
      <h3>Admin</h3>
      <Nav activeKey={window.location.pathname}>
        <Nav.Item>
          <Nav.Link href="/admin/companyfilings">Company Filings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled href="/admin/companies">Company Data</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/platform/jurisdictions">Jurisdictions</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/platform/agencies">Agencies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/platform/filings">Filings</Nav.Link>
        </Nav.Item>
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

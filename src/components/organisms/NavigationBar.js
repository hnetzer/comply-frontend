import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AccountMenu } from '../molecules'
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge';

import { logout } from 'actions';

const NavigationBar = ({ user, dispatch }) => {

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const logoStyle = {
    color: '#fff',
    fontWeight: 500,
    fontFamily: "'Raleway', sans-serif"
  }

  const isAdmin = user && user.roles && (user.roles.indexOf('admin') !== -1)

  const href = isAdmin ? '/admin' : '/home'

  return (
    <Navbar bg="dark" expand="lg" className="justify-content-between" style={{ paddingLeft: 64 }}>
      <div>
        <Navbar.Brand href={href}>
          <h3 style={logoStyle}>comply</h3>
        </Navbar.Brand>
        {isAdmin ? <Badge style={{ marginLeft: 16 }} variant="info">admin</Badge> : null}
      </div>

      <div style={{ marginRight: 32 }}>
        <AccountMenu
          user={user}
          handleLogout={handleLogout} />
      </div>
    </Navbar>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(NavigationBar);

import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AccountMenu } from '../molecules'
import Navbar from 'react-bootstrap/Navbar'

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

  return (
    <Navbar bg="dark" expand="lg" className="justify-content-between">
      <Navbar.Brand href="/home">
        <h3 style={logoStyle}>comply</h3>
      </Navbar.Brand>
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

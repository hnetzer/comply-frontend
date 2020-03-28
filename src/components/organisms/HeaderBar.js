import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AccountMenu } from '../molecules'

import { logout } from 'actions';

import style from './HeaderBar.module.scss'

const HeaderBar = ({ user, dispatch }) => {

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const isAdmin = user && user.roles && (user.roles.indexOf('admin') !== -1)
  const href = isAdmin ? '/admin' : '/home'

  return (
    <div className={style.headerBar}>
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

export default connect(mapStateToProps)(HeaderBar);

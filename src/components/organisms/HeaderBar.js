import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AccountMenu } from '../molecules'

import { logout } from 'actions';

import style from './HeaderBar.module.scss'

const HeaderBar = ({ user, dispatch, title = ""}) => {

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className={style.headerBar}>
      <h3>{title}</h3>
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

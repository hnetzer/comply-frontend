import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AccountMenu } from 'components/molecules'

import { logout } from 'actions';

import style from './HeaderBar.module.scss'

const HeaderBar = ({ user, company, dispatch }) => {

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className={style.headerBar}>
      <div className={style.leftHeaderSection}>
        <h3 className={style.complyLogo}>Comply</h3>
        <span className={style.accountText}>ACCOUNT</span>
        {company && (<span className={style.companyName}>{company.name}</span>)}
      </div>
      <AccountMenu
        variant="light"
        user={user}
        handleLogout={handleLogout} />
    </header>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    company: state.auth.company,
  }
}

export default connect(mapStateToProps)(HeaderBar);

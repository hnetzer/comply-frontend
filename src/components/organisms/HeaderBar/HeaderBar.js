import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AccountMenu, CompanyDropdown } from 'components/molecules'

import { logout } from 'actions';

import style from './HeaderBar.module.scss'

const HeaderBar = ({ user, company, companies, selectedCompanyId, dispatch }) => {

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className={style.headerBar}>
      <div className={style.leftHeaderSection}>
        <h3 className={style.complyLogo}>Comply</h3>
        <span className={style.accountText}>ACCOUNT</span>
        <CompanyDropdown company={company} companies={companies} selectedId={selectedCompanyId} />
      </div>
      <AccountMenu
        companyId={selectedCompanyId}
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
    companies: state.auth.companies,
  }
}

export default connect(mapStateToProps)(HeaderBar);

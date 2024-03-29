import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, navigate } from "@reach/router"
import { logout } from 'actions';

import { getCompany } from 'network/api'
import { setCompanyDetails, setCompanyOffices } from 'actions'

import { AccountMenu } from 'components/molecules'

import GetStarted from './GetStarted/GetStarted'
import Company from './Company/Company'
import Offices from './Offices/Offices'
import Agencies from './Agencies/Agencies'
import Done from './Done/Done'
import NotSupported from './NotSupported/NotSupported'

import styles from './OnboardingScreen.module.scss'

class OnboardingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { company: null, offices: null }
  }

  async componentDidMount() {
    const company = await getCompany(this.props.companyId);
    this.setState({
      company: company,
      offices: company.offices,
    })

    this.props.dispatch(setCompanyDetails(company))
    this.props.dispatch(setCompanyOffices(company.offices))
  }

  handleLogout = () => {
    this.props.dispatch(logout())
    navigate('/')
  }

  render() {
    const { company, offices } = this.state
    const { user, companyId } = this.props
    return(
      <div className={styles.onboardingContainer}>
        <header className={styles.headerBar}>
          <div className={styles.leftHeaderSection}>
            <h3 className={styles.complyLogo}>Comply</h3>
            <span className={styles.accountText}>ACCOUNT</span>
            {company && (<span className={styles.companyName}>{company.name}</span>)}
          </div>
          <AccountMenu
            variant="light"
            user={user}
            handleLogout={this.handleLogout} />
        </header>
        <main>
          <Router className={styles.main}>
            <GetStarted path="/" companyId={companyId} />
            <Company path="/company" company={company} />
            <Offices path="/offices" offices={offices} companyId={companyId} />
            <Agencies path="/agencies" companyId={companyId} />
            <Done path="/done" companyId={companyId} />
            <NotSupported path="/not-supported" />
          </Router>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    company: state.company.company
  }
}

export default connect(mapStateToProps)(OnboardingScreen);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, navigate } from "@reach/router"
import { logout } from 'actions';

import { getCompany, getAgencies } from 'network/api'

import { AccountMenu } from 'components/molecules'

import GetStarted from './GetStarted/GetStarted'
import Company from './Company/Company'
import Offices from './Offices/Offices'
import Agencies from './Agencies/Agencies'
import Done from './Done/Done'

import styles from './OnboardingScreen.module.scss'

class OnboardingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { company: null, offices: null, agencies: null }
  }

  async componentDidMount() {
    const company = await getCompany(this.props.user.company_id);
    const agencies = await getAgencies(this.props.user.company_id);
    this.setState({
      company: company,
      offices: company.offices,
      agencies: agencies
    })
  }


  handleLogout = () => {
    this.props.dispatch(logout())
    navigate('/')
  }

  render() {
    const { company, offices, agencies } = this.state
    const { user } = this.props
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
            <GetStarted path="/" />
            <Company path="/company" company={company} />
            <Offices path="/offices" offices={offices} />
            <Agencies path="/agencies" agencies={agencies} />
            <Done path="/done" />
          </Router>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    company: state.auth.company,
  }
}

export default connect(mapStateToProps)(OnboardingScreen);

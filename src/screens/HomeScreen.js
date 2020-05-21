import React from 'react';
import { connect } from 'react-redux';
import { Router } from "@reach/router"

import { getCompany } from 'network/api';

import { SideNavigation } from 'components/organisms'

// screens
import CompanyScreen from './home/CompanyScreen'
import FilingsListScreen from './home/FilingsListScreen'
import AgenciesScreen from './home/AgenciesScreen'
import DashboardScreen from './home/DashboardScreen'
import FilingScreen from './FilingScreen'

import styles from './Home.module.css'

// Maybe this should just be a functional component?
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, agencies: [], company: null };
  }

  async componentDidMount() {
    try {
      const company = await getCompany(this.props.user.company_id);
      this.setState({ company: company })
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    const { company} = this.state;
    return(
      <>
        <SideNavigation companyName={company && company.name} />
        <main className={styles.main}>
          <Router style={{ width: '100%' }}>
            <FilingsListScreen path="/filings" />
            <CompanyScreen path="/company" company={company} />
            <AgenciesScreen path="/agencies" />
            <FilingScreen path="/filings/new" />
            <FilingScreen path="/filings/:companyFilingId" />
            <DashboardScreen path="/" />
          </Router>
        </main>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(HomeScreen);

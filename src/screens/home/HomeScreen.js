import React from 'react';
import { connect } from 'react-redux';
import { Router } from "@reach/router"

import { getCompany } from 'network/api';

import { HeaderBar } from 'components/organisms'

import { SubNav } from 'components/organisms'

// screens
import CompanyScreen from './Company/CompanyScreen'
import DashboardScreen from './Dashboard/DashboardScreen'

import styles from './HomeScreen.module.scss'

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
        <HeaderBar />
        <SubNav />
        <div style={{ display: 'flex', flexDirection: 'row', minHeight: 'calc(100vh - 54px)'}}>
          <main className={styles.main}>
            <Router style={{ width: '100%' }}>
              <CompanyScreen path="/company" company={company} />
              <DashboardScreen path="/" />
            </Router>
          </main>
        </div>
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

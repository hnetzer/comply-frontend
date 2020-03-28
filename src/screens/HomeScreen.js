import React from 'react';
import { connect } from 'react-redux';
import { Router } from "@reach/router"

import { getAgencies, getCompany, updateAgencies, getCompanyFilings } from 'network/api';
import { setFilings, setCompanyAgencies } from 'actions';

import { HeaderBar, WelcomeModal, SideNavigation } from '../components/organisms'

// screens
import CompanyScreen from './home/CompanyScreen'
import FilingsListScreen from './home/FilingsListScreen'
import AgenciesScreen from './home/AgenciesScreen'
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
      // dispatch this to redux
      this.setState({ company: company })

      if (company.agencies.length === 0) {
        const agencies = await getAgencies(this.props.user.company_id);
        // dispatch this to redux
        this.setState({ agencies: agencies })
        this.setState({ show: true })
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleUpdateAgencies = async (agencyIds) => {
    try {
      this.setState({ show: false })
      const agencies = await updateAgencies({ agencies: agencyIds }, this.props.user.company_id)
      const filings = await getCompanyFilings(this.props.user.company_id)
      this.props.dispatch(setFilings(filings))
      this.props.dispatch(setCompanyAgencies(agencies))
    } catch (err) {
      alert(err)
    }
  }

  render() {
    const { company, filings } = this.state;
    return(
      <>
        <SideNavigation companyName={company && company.name} />
        <main className={styles.main}>
          <HeaderBar />
          <Router style={{ width: '100%' }}>
            <FilingsListScreen path="/" filings={filings} />
            <FilingsListScreen path="/filings" filings={filings} />
            <CompanyScreen path="/company" company={company} />
            <AgenciesScreen path="/agencies" />
            <FilingScreen path="/filings/new" />
            <FilingScreen path="/filings/:companyFilingId" />
          </Router>
        </main>
        <WelcomeModal
          show={this.state.show}
          handleHide={() => this.setState({ show: false })}
          updateAgencies={this.handleUpdateAgencies}
          agencies={this.state.agencies} />
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

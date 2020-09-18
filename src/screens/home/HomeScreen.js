import React from 'react';
import { connect } from 'react-redux';
import { Router } from "@reach/router"

import { getCompany } from 'network/api';

import { HeaderBar } from 'components/organisms'

import { SubNav } from 'components/organisms'

// screens
import CompanyScreen from './Company/CompanyScreen'
import DashboardScreen from './Dashboard/DashboardScreen'
import FilingsScreen from './Filings/FilingsScreen'
import FilingDetailsScreen from './Filings/FilingDetails/FilingDetailsScreen'
import SettingsScreen from './Settings/SettingsScreen'
import FAQScreen from './FAQ/FAQScreen'
import GuideScreen from './Guide/GuideScreen'

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
    const { company } = this.state;
    const { companyId } = this.props;
    return(
      <>
        <div style={{ position: 'fixed', width: '100%', zIndex: 1}}>
          <HeaderBar selectedCompanyId={companyId} />
          <SubNav />
        </div>
        <main className={styles.main}>
          <Router primary={false} style={{ width: '100%' }}>
            <CompanyScreen path="/company/*" company={company} />
            <FAQScreen path="/faqs" />
            <GuideScreen path="/guide" />
            <DashboardScreen companyId={companyId} path="/" />
            <FilingsScreen path="/filings" />
            <FilingDetailsScreen path="/filings/:companyFilingId" />
            <SettingsScreen path="/settings" />
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

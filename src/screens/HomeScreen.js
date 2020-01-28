import React from 'react';
import { connect } from 'react-redux';
import { Router, navigate } from "@reach/router"

import { getAgencies, getCompany, updateAgencies, getCompanyFilings } from 'network/api';
import { logout } from 'actions';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { AccountMenu, WelcomeModal } from '../components/molecules'

// screens
import CompanyScreen from './home/CompanyScreen'
import FilingsListScreen from './home/FilingsListScreen'
import AgenciesScreen from './home/AgenciesScreen'

import styles from './Home.module.css'

// Maybe this should just be a functional component?
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, agencies: [], company: null, filings: [] };
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

  handleLogout = () => {
    this.props.dispatch(logout())
    navigate('/')
  }

  handleUpdateAgencies = async (agencyIds) => {
    try {
      this.setState({ show: false })
      await updateAgencies({ agencies: agencyIds }, this.props.user.company_id)
      const filings = await getCompanyFilings(this.props.user.company_id)
      this.setState({ filings: filings })
    } catch (err) {
      alert(err)
    }
  }

  render() {
    return(
      <div>
        <Navbar bg="dark" expand="lg" className="justify-content-between">
          <Navbar.Brand href="/home">
            <h3 className={styles.logo}>comply</h3>
          </Navbar.Brand>
          <div style={{ marginRight: 32 }}>
            <AccountMenu
              user={this.props.user}
              handleLogout={this.handleLogout} />
          </div>
        </Navbar>
        <div className={styles.container}>
          <div className={styles.sideBar}>
            <h5>
              {this.state.company != null ? this.state.company.name : null}
            </h5>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="/home/filings">Filings</Nav.Link>
              <Nav.Link href="/home/agencies">Agencies</Nav.Link>
              <Nav.Link href="/home/company">Company</Nav.Link>
            </Nav>
          </div>
          <main className={styles.main}>
            <Router>
              <FilingsListScreen path="/" filings={this.state.filings} />
              <FilingsListScreen path="/filings" filings={this.state.filings} />
              <CompanyScreen path="/company" company={this.state.company} />
              <AgenciesScreen path="/agencies" />
            </Router>
          </main>
        </div>
        <WelcomeModal
          show={this.state.show}
          handleHide={() => this.setState({ show: false })}
          updateAgencies={this.handleUpdateAgencies}
          agencies={this.state.agencies} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(HomeScreen);

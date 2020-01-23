import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { getAgencies } from 'network/api';
import { logout } from 'actions';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


import { AccountMenu, WelcomeModal } from '../components/molecules'

import styles from './Home.module.css'

// Maybe this should just be a functional component?
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, agencies: []};
  }

  async componentDidMount() {
    try {
      const agencies = await getAgencies(this.props.user.company_id);
      // dispatch this shit to redux probably

      this.setState({ agencies: agencies })
      this.setState({ show: true })
    } catch (err) {
      console.log(err)
    }
  }

  handleLogout = () => {
    this.props.dispatch(logout())
    navigate('/login')
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
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="/filings" disabled>Filings</Nav.Link>
              <Nav.Link href="/agencies" disabled>Agencies</Nav.Link>
              <Nav.Link href="/company" disabled>Company</Nav.Link>
            </Nav>
          </div>
          <main className={styles.main}>
              <h1>Filing Schedule</h1>
          </main>
        </div>
        <WelcomeModal
          show={this.state.show}
          handleHide={() => this.setState({ show: false })}
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

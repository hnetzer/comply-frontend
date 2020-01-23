import React from 'react';
import { connect } from 'react-redux';

import { getAgencies } from 'network/api';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { AccountMenu } from '../components/molecules'

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

  render() {
    return(
      <div>
        <Navbar bg="dark" expand="lg" className="justify-content-between">
          <Navbar.Brand href="/home">
            <h3 className={styles.logo}>comply</h3>
          </Navbar.Brand>
          <div style={{ marginRight: 32 }}>
            <AccountMenu />
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
        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome to Comply!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Based on your office location, we believe your company needs to
              comply with the following government agencies.
            </p>
            <p>
              Unselect agencies you don't Comply to file with.
            </p>
            <Form>
              {this.state.agencies.map((agency, index) => {
                return (
                  <Form.Check
                    type="checkbox"
                    label={`${agency.name} (${agency['jurisdiction.name']})`}
                    checked={true}
                  />
                )
              })}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.setState({ show: false })}>
              Save Agencies
            </Button>
          </Modal.Footer>
      </Modal>
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

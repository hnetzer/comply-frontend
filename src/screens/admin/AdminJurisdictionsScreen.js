import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import { adminGetJurisdictions, adminCreateJurisdiction } from 'network/api';

import { AdminJurisdictionModal } from '../../components/organisms'

class AdminJurisdictionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jurisdictions: [], showModal: false };
  }

  async componentDidMount() {
    try {
      const jurisdictions = await adminGetJurisdictions();
      jurisdictions.sort(this.sortBy)
      this.setState({ jurisdictions: jurisdictions });
    } catch (err) {
      console.log(err)
    }
  }

  sortBy = (a, b) => {
    if (a.state > b.state) {
      return 1
    } else if (a.state < b.state) {
      return -1
    } else if (a.state === b.state) {
      if (a.name > b.name) {
        return 1
      } else if (a.name < b.name) {
        return -1
      }
    }
    return 0
  }

  showAddJurisdictionModal = () => {
    this.setState({ showModal: true })
  }

  handleJurisdictionFormSubmit = async (values) => {
    if (values.id) {
      // add update request here
    } else {
      const jurisdiction = await adminCreateJurisdiction(values)
      const js = this.state.jurisdictions
      js.push(jurisdiction)
      js.sort(this.sortBy)
      this.setState({ jurisdictions: js, showModal: false })
    }
    console.log(values)
  }

  render() {
    const { jurisdictions } = this.state
    return(
      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <section style={{ paddingTop: 64 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h3>Jurisdictions</h3>
            <Button onClick={this.showAddJurisdictionModal} variant="link">+ Add Jurisdiction</Button>
          </div>
          <Table striped bordered hover size="sm" style={{ width: 600, marginTop: 24}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>State</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {jurisdictions.map((j,i) => (
                <tr key={i}>
                  <td>{j.name}</td>
                  <td>{j.state}</td>
                  <td>{j.type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <AdminJurisdictionModal
            show={this.state.showModal}
            handleSubmit={this.handleJurisdictionFormSubmit}
            handleHide={() => this.setState({ showModal: false })} />
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(AdminJurisdictionsScreen);

import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import {
  adminGetAgencies,
  adminGetJurisdictions,
  adminCreateAgency
} from 'network/api';

import { setAgencies, setJurisdictions, addAgency } from 'actions';

import { AdminAgencyModal } from '../../components/organisms'

class AdminAgenciesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, selected: null };
  }

  async componentDidMount() {
    try {
      const agencies = await adminGetAgencies();
      this.props.dispatch(setAgencies(agencies))
      if (this.props.jurisdictions.length === 0) {
        const jurisdictions = await adminGetJurisdictions();
        this.props.dispatch(setJurisdictions(jurisdictions))
      }
    } catch (err) {
      console.log(err)
    }
  }

  sortBy = (a, b) => {
  }

  showAddAgencyModal = () => {
    this.setState({ showModal: true })
  }

  showEditAgencyModal = (jurisdiction) => {
    this.setState({ showModal: true, selected: jurisdiction })
  }

  hideModal = () => {
    this.setState({ showModal: false, selected: null })
  }

  handleAgencyFormSubmit = async (values) => {
    if (values.id) {
      //const jurisdiction = await adminUpdateJurisdiction(values.id, values)
      // this.props.dispatch(updateJurisdiction(jurisdiction))
      this.hideModal()
    } else {
      const agency = await adminCreateAgency(values)
      this.props.dispatch(addAgency(agency))
      this.hideModal()
    }
  }

  render() {
    const { agencies } = this.props
    agencies.sort(this.sortBy)
    return(
      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <section style={{ paddingTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h3>Agencies</h3>
            <Button onClick={this.showAddAgencyModal} variant="link">+ Add Agency</Button>
          </div>
          <Table striped bordered hover size="sm" responsive style={{ width: 600, marginTop: 24 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Jurisdiction</th>
                <th>State</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((a,i) => (
                <tr key={i}>
                  <td>{a.name}</td>
                  <td>{a.jurisdiction.name}</td>
                  <td>{a.jurisdiction.state}</td>
                  <td>
                    <Button
                      onClick={() => this.showEditAgencyModal(a)}
                      style={{ lineHeight: 1 }}
                      variant="link">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <AdminAgencyModal
            show={this.state.showModal}
            agency={this.state.selected}
            jurisdictions={this.props.jurisdictions}
            handleSubmit={this.handleAgencyFormSubmit}
            handleHide={this.hideModal} />
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    agencies: state.admin.agencies,
    jurisdictions: state.admin.jurisdictions
  }
}

export default connect(mapStateToProps)(AdminAgenciesScreen);

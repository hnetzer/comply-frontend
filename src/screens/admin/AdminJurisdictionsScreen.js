import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import {
  adminGetJurisdictions,
  adminCreateJurisdiction,
  adminUpdateJurisdiction
} from 'network/api';

import { setJurisdictions, addJurisdiction, updateJurisdiction } from 'actions';

import { AdminJurisdictionModal } from '../../components/organisms'

class AdminJurisdictionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, selected: null };
  }

  async componentDidMount() {
    try {
      const jurisdictions = await adminGetJurisdictions();
      this.props.dispatch(setJurisdictions(jurisdictions))
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

  showEditJurisdictionModal = (jurisdiction) => {
    this.setState({ showModal: true, selected: jurisdiction })
  }

  hideModal = () => {
    this.setState({ showModal: false, selected: null })
  }

  handleJurisdictionFormSubmit = async (values) => {
    if (values.id) {
      const jurisdiction = await adminUpdateJurisdiction(values.id, values)
      this.props.dispatch(updateJurisdiction(jurisdiction))
      this.hideModal()
    } else {
      const jurisdiction = await adminCreateJurisdiction(values)
      this.props.dispatch(addJurisdiction(jurisdiction))
      this.hideModal()
    }
  }

  render() {
    const { jurisdictions } = this.props
    jurisdictions.sort(this.sortBy)
    return(
      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <section style={{ paddingTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h3>Jurisdictions</h3>
            <Button onClick={this.showAddJurisdictionModal} variant="link">+ Add Jurisdiction</Button>
          </div>
          <Table striped bordered hover size="sm" responsive style={{ width: 600, marginTop: 24 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>State</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jurisdictions.map((j,i) => (
                <tr key={i}>
                  <td>{j.name}</td>
                  <td>{j.state}</td>
                  <td>{j.type}</td>
                  <td>
                    <Button
                      onClick={() => this.showEditJurisdictionModal(j)}
                      style={{ lineHeight: 1 }}
                      variant="link">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <AdminJurisdictionModal
            show={this.state.showModal}
            jurisdiction={this.state.selected}
            handleSubmit={this.handleJurisdictionFormSubmit}
            handleHide={this.hideModal} />
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jurisdictions: state.admin.jurisdictions
  }
}

export default connect(mapStateToProps)(AdminJurisdictionsScreen);

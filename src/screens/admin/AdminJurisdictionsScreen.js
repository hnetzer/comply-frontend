import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import style from './AdminScreens.module.scss'

import {
  adminGetJurisdictions,
  adminUpdateJurisdiction,
  adminDeleteJurisdiction,
} from 'network/api';

import {
  adminSetJurisdictionsAction,
  adminUpdateJurisdictionAction,
  adminDeleteJurisdictionAction
} from 'actions';

import { AdminJurisdictionModal } from '../../components/organisms'

class AdminJurisdictionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { howModal: false, selected: null };
  }

  async componentDidMount() {
    try {
      const jurisdictions = await adminGetJurisdictions()
      this.props.dispatch(adminSetJurisdictionsAction(jurisdictions))
    } catch (err) {
      console.log(err)
    }
  }

  sortBy = (a, b) => {
    if (a.supported && !b.supported) return 1;
    if (!a.supported && b.supported) return -1;
    if (a.state > b.state) return 1;
    if (a.state < b.state) return -1;
    if (a.type > b.type) return -1;
    if (a.type < b.type) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
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
      this.props.dispatch(adminUpdateJurisdictionAction(jurisdiction))
      this.hideModal()
    }
  }

  handleDeleteJurisdiction = async (jurisdictionId) => {
    await adminDeleteJurisdiction(jurisdictionId)
    this.props.dispatch(adminDeleteJurisdictionAction(jurisdictionId))
    this.hideModal()
  }

  render() {
    const { jurisdictions } = this.props
    jurisdictions.sort(this.sortBy)
    return(
      <main className={style.container}>
        <AdminJurisdictionModal
          show={this.state.showModal}
          jurisdiction={this.state.selected}
          handleSubmit={this.handleJurisdictionFormSubmit}
          handleHide={this.hideModal}
          handleDelete={this.handleDeleteJurisdiction} />
        <section className={style.content}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h3>Jurisdictions</h3>
          </div>
          <Table hover bordered className={style.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>State</th>
                <th>Type</th>
                <th>Supported</th>
                <th>Agencies</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jurisdictions.map((j,i) => (
                <tr key={i}>
                  <td>{j.name}</td>
                  <td>{j.state}</td>
                  <td>{j.type}</td>
                  <td style={{ textAlign: 'center'}}>{j.supported ? '✅' : '❌'}</td>
                  <td>{j.agencies.length}</td>
                  <td>{moment(j.createdAt).format('M/D/YYYY')}</td>
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

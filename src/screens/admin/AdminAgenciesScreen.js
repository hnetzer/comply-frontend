import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import {
  adminGetAgencies,
  adminGetJurisdictions,
  adminCreateAgency,
  adminUpdateAgency,
  adminDeleteAgency,
} from 'network/api';

import { setAgencies, setJurisdictions, addAgency, updateAgency, deleteAgency} from 'actions';

import { AdminAgencyModal } from '../../components/organisms'

import style from './AdminScreens.module.scss'

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
    if (a.jurisdiction.state > b.jurisdiction.state) return 1;
    if (a.jurisdiction.state < b.jurisdiction.state) return -1;
    if (a.jurisdiction.name > b.jurisdiction.name) return 1;
    if (a.jurisdiction.name < b.jurisdiction.name) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0
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
    try {
      if (values.id) {
        const data = { name: values.name, jurisdiction_id: values.jurisdiction_id }
        const agency = await adminUpdateAgency(values.id, data)
        this.props.dispatch(updateAgency(agency))
        this.hideModal()
      } else {
        const agency = await adminCreateAgency(values)
        this.props.dispatch(addAgency(agency))
        this.hideModal()
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteAgency = async (agencyId) => {
    await adminDeleteAgency(agencyId)
    this.props.dispatch(deleteAgency(agencyId))
    this.hideModal()
  }

  render() {
    const { agencies } = this.props
    agencies.sort(this.sortBy)
    return(
      <main className={style.container}>
        <section className={style.content}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h3>Agencies</h3>
            <Button onClick={this.showAddAgencyModal} variant="link">+ Add Agency</Button>
          </div>
          <Table hover bordered className={style.table}>
            <thead>
              <tr>
                <th>State</th>
                <th>Jurisdiction</th>
                <th>Agency</th>
                <th>Filings</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((a,i) => (
                <tr key={i}>
                  <td>{a.jurisdiction.state}</td>
                  <td>{a.jurisdiction.name}</td>
                  <td>{a.name}</td>
                  <td>{a.filings.length}</td>
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
            handleHide={this.hideModal}
            handleDelete={this.handleDeleteAgency} />
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

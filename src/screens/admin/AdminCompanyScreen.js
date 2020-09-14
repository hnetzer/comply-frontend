import React from 'react';
import moment from 'moment';
import { navigate } from "@reach/router"

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';

import { adminGetCompany, adminGetCompanyFilings } from 'network/api';
import { compareFilingsByDue } from 'utils'

import style from './AdminScreens.module.scss'

class AdminCompanyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { company: null, filings: [] };
  }

  async componentDidMount() {
    try {
      const companyId = this.props.companyId;
      const year = moment().format('YYYY');
      const data = await adminGetCompany(this.props.companyId)
      const filings = await adminGetCompanyFilings(companyId, `${year}-01-01`, `${year}-12-31`, true);
      this.setState({ company: data, filings: filings })
    } catch (err) {
      console.log(err)
    }
  }

  handleSelectCompanyFiling = (companyFilingId) => {
    const companyId = this.state.company.id
    navigate(`/admin/companies/${companyId}/filings/${companyFilingId}`)
  }

  renderBasic = (company) => {
    const { type, tax_class, year_end_month, year_end_day, formation_state } = company;
    return (
      <Table bordered>
        <tbody>
          <tr>
            <td>Formation State</td>
            <td>{formation_state}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{type}</td>
          </tr>
          <tr>
            <td>Tax Class</td>
            <td>{tax_class}</td>
          </tr>
          <tr>
            <td>Financial Year End</td>
            <td>{year_end_month != null ? `${moment().month(year_end_month).format("MMM")} ${year_end_day}` : null}</td>
          </tr>
        </tbody>
      </Table>
    )
  }

  renderUsers = (users) => {
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.title}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  renderOffices = (offices) => {
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((office, index) => (
            <tr key={index}>
              <td>{office.address}</td>
              <td>{office.city}</td>
              <td>{office.state}</td>
              <td>{office.zip}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  renderAgencies = (agencies) => {
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Agency</th>
            <th>Jurisdiction</th>
            <th>Registered</th>
            <th>Reg Date</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency, index) => {
            const { registered, registration } = agency.company_agency;
            return (
              <tr key={index}>
                <td>{agency.name}</td>
                <td>{agency.jurisdiction.name}</td>
                <td>{registered ? 'Yes' : 'No'}</td>
                <td>{registration != null ? moment(registration).format('YYYY-MM-DD') : null}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  renderJurisdictions = (jurisdictions) => {
    const companyType = this.state.company.type;
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Jurisdiction</th>
            <th>Supported</th>
          </tr>
        </thead>
        <tbody>
          {jurisdictions.map((j, index) => {
            const supported = companyType === 'Corporation' ? j.corp_supported : j.llc_supported
            return (
              <tr key={index}>
                <td>{j.name}</td>
                <td style={{ textAlign: 'center'}}>{supported ? '✅' : '❌'}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  renderFilings = (filings) => {
    return (
      <Table hover bordered className={style.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Agency</th>
            <th>Jurisdiction</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
        {filings.sort(compareFilingsByDue).map((f, index) => {
          return (
            <tr
              className={style.tableRow}
              key={index}
              onClick={() => this.handleSelectCompanyFiling(f.id)}>
              <td>{f.filing.name}</td>
              <td>{f.filing.agency.name}</td>
              <td>{f.filing.agency.jurisdiction.name}</td>
              <td>{f.due_date != null ? moment(f.due_date).format('MM/DD/YYYY') : 'N/A'}</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    )
  }

  render() {
    const { company, filings } = this.state
    if (!company) return null;
    const { users, offices, agencies, jurisdictions } = company

    return (
      <main className={style.container}>
        <div className={style.content}>
          <Breadcrumb>
            <Breadcrumb.Item href="/admin/companies">Companies</Breadcrumb.Item>
            <Breadcrumb.Item active>{company.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h3>{company.name}</h3>
          <section>
            <h4>Basic Information</h4>
            {this.renderBasic(company)}
          </section>
          <section>
            <h4>Users</h4>
            {this.renderUsers(users)}
          </section>
          <section>
            <h4>Offices</h4>
            {this.renderOffices(offices)}
          </section>
          <section>
            <h4>Jurisdictions</h4>
            {this.renderJurisdictions(jurisdictions)}
          </section>
          <section>
            <h4>Agencies</h4>
            {this.renderAgencies(agencies)}
          </section>
          <section>
            <h4>{`${moment().format('YYYY')} Filings`}</h4>
            {this.renderFilings(filings)}
          </section>

        </div>
      </main>
    )
  }
}

export default AdminCompanyScreen;

import React from 'react';
import moment from 'moment';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';

import { adminGetCompany } from 'network/api';


import style from './AdminScreens.module.scss'

class AdminCompanyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { company: null };
  }

  async componentDidMount() {
    try {
      const data = await adminGetCompany(this.props.companyId)
      this.setState({ company: data })
    } catch (err) {
      console.log(err)
    }
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
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency, index) => (
            <tr key={index}>
              <td>{agency.name}</td>
              <td>{agency.jurisdiction.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  render() {
    const { company } = this.state
    if (!company) return null;
    const { users, offices, agencies } = company

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
            <h4>Agencies</h4>
            {this.renderAgencies(agencies)}
          </section>
        </div>
      </main>
    )
  }
}

export default AdminCompanyScreen;

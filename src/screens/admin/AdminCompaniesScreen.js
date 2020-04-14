import React from 'react';
import moment from 'moment';
import { navigate } from "@reach/router"

import Table from 'react-bootstrap/Table'

import { adminGetCompanies } from 'network/api'

import style from './AdminCompaniesScreen.module.scss'

class AdminCompaniesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companies: [] };
  }

  async componentDidMount() {
    try {
      const companies = await adminGetCompanies()
      this.setState({ companies: companies })

    } catch (err) {
      console.log(err)
    }
  }

  handleSelectCompany = (companyId) => {
    navigate(`/admin/companies/${companyId}`)
  }

  render() {
    return(
      <main className={style.container}>
        <section className={style.content}>
          <h3>Companies</h3>
          <Table hover bordered className={style.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Phone</th>
                <th>Year End</th>
                <th>Agencies</th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {
                this.state.companies.map((c,i) =>
                {
                  return (
                    <tr
                      onClick={() => this.handleSelectCompany(c.id)}
                      className={style.tableRow}
                      key={i}
                    >
                      <td>{c.name}</td>
                      <td>{`${c.users[0].name} (${c.users[0].email})`}</td>
                      <td>{c.phone}</td>
                      <td>
                        {`${moment().month(c.year_end_month).format("MMM")} ${c.year_end_day}`}
                      </td>
                      <td>{c.agencies.length}</td>
                    </tr>
                  );
                }
              )
            }
            </tbody>
          </Table>
        </section>
      </main>
    )
  }
}


export default AdminCompaniesScreen;

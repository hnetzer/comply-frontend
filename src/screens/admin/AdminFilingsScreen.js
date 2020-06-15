import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";

import { adminGetFilings } from 'network/api';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'


import style from './AdminFilingsScreen.module.scss';

class AdminFilingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filings: [] };
  }

  async componentDidMount() {
    try {
      const filings = await adminGetFilings()
      filings.sort(this.sortByJurisdiction)
      this.setState({ filings: filings })
    } catch (err) {
      console.log(err)
    }
  }

  sortByJurisdiction = (a, b) => {
    if (a.agency.jurisdiction.name > b.agency.jurisdiction.name) return 1;
    if (a.agency.jurisdiction.name < b.agency.jurisdiction.name) return -1
    if (a.agency.name > b.agency.name) return 1;
    if (a.agency.name < b.agency.name) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return 1;
    return 0;
  }

  onSelectFiling = (index) => {
    const filing = this.state.filings[index]
    navigate(`/admin/platform/filings/${filing.id}`)
  }

  render() {
    return(
      <main className={style.container}>
        <section className={style.content}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <h3>Filings</h3>
            <Button href="/admin/platform/filings/new" variant="link">+ New Filing</Button>
          </div>
          <Table hover bordered className={style.table}>
            <thead>
              <tr>
                <th>Filing</th>
                <th>Agency</th>
                <th>Jurisdiction</th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {
                this.state.filings.map((f,i) =>
                  (<tr className={style.tableRow} key={i} onClick={() => this.onSelectFiling(i)}>
                    <td>{f.name}</td>
                    <td>{f.agency.name}</td>
                    <td>{f.agency.jurisdiction.name}</td>
                  </tr>)
                )
              }
            </tbody>
          </Table>
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(AdminFilingsScreen);

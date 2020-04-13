import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllCompanyFilings } from 'network/api';
import { navigate } from "@reach/router"

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { setCompanyFilings } from 'actions';

import style from './AdminCompanyFilingsListScreen.module.scss'

class AdminCompanyFilingsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: null, filter: 'all' };
  }

  async componentDidMount() {
    try {
      const data = await getAllCompanyFilings()
      this.props.dispatch(setCompanyFilings(data))
    } catch (err) {
      console.log(err)
    }
  }

  onSelectFiling = (index) => {
    this.setState({ selectedIndex: index })
  }

  handleSelectCompanyFiling = (companyFilingId) => {
    navigate(`/admin/companyfilings/${companyFilingId}`)
  }

  setFilter = (value) => {
    this.setState({ filter: value })
  }

  compareByDueDate = (a, b) => {
    const dueA = moment(a.due_date).unix()
    const dueB = moment(b.due_date).unix()
    if (dueA > dueB) {
      return 1
    } else if (dueA < dueB) {
      return -1
    }
    return 0
  }

  renderCompanyFilingRows = () => {
    let { companyfilings } = this.props;
    console.log(companyfilings)
    const { filter } = this.state
    if (filter !== 'all') {
      companyfilings = companyfilings.filter(f => f.status === filter)
    }

    return companyfilings
      .sort(this.compareByDueDate)
      .map((f,i) => {
        return (
        <tr
          onClick={() => this.handleSelectCompanyFiling(f.id)}
          className={style.tableRow}
        >
          <td>{f.company.name}</td>
          <td>{f.filing.name}</td>
          <td>{f.filing.agency.name}</td>
          <td>{f.filing.agency.jurisdiction.name}</td>
          <td>{moment(f.due_date).format("M/D/YY")}</td>
          <td>{f.status}</td>
        </tr>
      );
    });
  }

  render() {
    const { filter } = this.state
    return(
      <main className={style.container}>
        <section className={style.content}>
          <h3>Company Filings</h3>
          <div>
            <ButtonGroup className={style.buttonGroup}>
              <Button
                className={style.filterButton}
                onClick={() => this.setState({ filter: 'all'})}
                variant={filter === 'all' ? 'primary' : 'secondary'}>
                All
              </Button>
              <Button
                className={style.filterButton}
                onClick={() => this.setState({ filter: 'draft'})}
                variant={filter === 'draft' ? 'primary' : 'secondary'}>
                Draft
              </Button>
              <Button
                className={style.filterButton}
                onClick={() => this.setState({ filter: 'submitted'})}
                variant={filter === 'submitted' ? 'primary' : 'secondary'}>
                Submitted
              </Button>
              <Button
                className={style.filterButton}
                onClick={() => this.setState({ filter: 'needs-follow-up'})}
                variant={filter === 'needs-follow-up' ? 'primary' : 'secondary'}>
                Follow Up
              </Button>
              <Button
                className={style.filterButton}
                onClick={() => this.setState({ filter: 'needs-signature-payment'})}
                variant={filter === 'needs-signature-payment' ? 'primary' : 'secondary'}>
                Sign/Pay
              </Button>
              <Button
                className={style.filterButton}
                onClick={() => this.setState({ filter: 'filed'})}
                variant={filter === 'filed' ? 'primary' : 'secondary'}>
                Filed
              </Button>
              <Button
                className={style.filterButton}
                onClick={() => this.setState({ filter: 'complete'})}
                variant={filter === 'complete' ? 'primary' : 'secondary'}>
                Complete
              </Button>
            </ButtonGroup>
          </div>
          <Table hover bordered className={style.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Filing</th>
                <th>Agency</th>
                <th>Jurisdiction</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {this.renderCompanyFilingRows()}
            </tbody>
          </Table>
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    companyfilings: state.admin.companyfilings
  }
}

export default connect(mapStateToProps)(AdminCompanyFilingsListScreen);

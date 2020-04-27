import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    this.state = { selectedIndex: null, filter: 'all', sortBy: 'due_date' };
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

  sortByProperty = (property) => {
    return (a, b) => {
      const propA = _.get(a, property)
      const propB = _.get(b, property)
      if (propA > propB) {
        return 1;
      } else if (propA < propB) {
        return -1;
      }
      return 0;
    }
  }

  renderCompanyFilingRows = () => {
    let { companyfilings } = this.props;
    const { filter, sortBy } = this.state
    if (filter !== 'all') {
      companyfilings = companyfilings.filter(f => f.status === filter)
    }

    let sortFunc = this.sortByProperty(sortBy)
    if (sortFunc === 'due_date') {
      sortFunc = this.compareByDueDate
    }

    return companyfilings
      .sort(sortFunc)
      .map((f,i) => {
        return (
        <tr
          onClick={() => this.handleSelectCompanyFiling(f.id)}
          className={style.tableRow}
          key={i}
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
    const { filter, sortBy } = this.state
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
                <th
                  className={style.columnHeader}
                  onClick={() => this.setState({ sortBy: 'company.name' })}
                >
                  Company
                  {sortBy === 'company.name' &&
                    <FontAwesomeIcon
                      className={style.sortIcon}
                      icon={faSortUp} />}
                </th>
                <th
                  className={style.columnHeader}
                  onClick={() => this.setState({ sortBy: 'filing.name' })}
                >
                  Filing
                  {sortBy === 'filing.name' &&
                    <FontAwesomeIcon
                      className={style.sortIcon}
                      icon={faSortUp} />}
                </th>
                <th
                  className={style.columnHeader}
                  onClick={() => this.setState({ sortBy: 'filing.agency.name' })}
                >
                  Agency
                  {sortBy === 'filing.agency.name' &&
                    <FontAwesomeIcon
                      className={style.sortIcon}
                      icon={faSortUp} />}
                </th>
                <th
                  className={style.columnHeader}
                  onClick={() => this.setState({ sortBy: 'filing.agency.jurisdiction.name' })}
                >
                Jurisdiction
                {sortBy === 'filing.agency.jurisdiction.name' &&
                  <FontAwesomeIcon
                    className={style.sortIcon}
                    icon={faSortUp} />}
                </th>
                <th
                  className={style.columnHeader}
                  onClick={() => this.setState({ sortBy: 'due_date' })}
                >
                Due
                {sortBy === 'due_date' &&
                  <FontAwesomeIcon
                    className={style.sortIcon}
                    icon={faSortUp} />}
                </th>
                <th
                  className={style.columnHeader}
                  onClick={() => this.setState({ sortBy: 'status' })}
                >
                Status
                {sortBy === 'status' &&
                  <FontAwesomeIcon
                    className={style.sortIcon}
                    icon={faSortUp} />}
                </th>
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

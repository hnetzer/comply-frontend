import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllCompanyFilings } from 'network/api';

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

import { setCompanyFilings } from 'actions';

import { SideListItem } from '../../components/molecules'
import { AdminCompanyFilingDetailsSection } from '../../components/sections'

import style from './AdminScreens.module.css'

class AdminCompanyFilingsScreen extends React.Component {
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

  renderFilingList = () => {
    let { companyfilings } = this.props;
    console.log(companyfilings)
    const { filter } = this.state
    if (filter !== 'all') {
      companyfilings = companyfilings.filter(f => f.status === filter)
    }


    return companyfilings.sort(this.compareByDueDate).map((f,i) =>
      (<SideListItem
          title={f.company.name}
          subtitle={`${f.filing.name} - ${f.filing.agency.jurisdiction.name}`}
          text={`Due: ${moment(f.due_date).format("MMM Do, YYYY")}`}
          key={i}
          index={i}
          onSelect={this.onSelectFiling} />)
    )
  }

  render() {
    const { filter } = this.state
    return(
      <main style={{ width: '100%', display: 'flex' }}>
        <section className={style.sideList}>
          <div style={{ padding: 16 }}>
            <ButtonGroup>
              <Button size="sm"
                onClick={() => this.setState({ filter: 'all'})}
                variant={filter === 'all' ? 'primary' : 'secondary'}>
                All
              </Button>
              <Button size="sm"
                onClick={() => this.setState({ filter: 'submitted'})}
                variant={filter === 'submitted' ? 'primary' : 'secondary'}>
                Submitted
              </Button>
              <Button size="sm"
                onClick={() => this.setState({ filter: 'needs-follow-up'})}
                variant={filter === 'needs-follow-up' ? 'primary' : 'secondary'}>
                Follow
              </Button>
              <Button size="sm"
                onClick={() => this.setState({ filter: 'needs-signature-payment'})}
                variant={filter === 'needs-signature-payment' ? 'primary' : 'secondary'}>
                Sign/Pay
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <div className={style.companyFilingsHeader}>
              Company filings
            </div>
            <div className={style.filingsList}>
              {this.renderFilingList()}
            </div>
          </div>
        </section>
        <AdminCompanyFilingDetailsSection
          companyFiling={this.props.companyfilings[this.state.selectedIndex]} />
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    companyfilings: state.admin.companyfilings
  }
}

export default connect(mapStateToProps)(AdminCompanyFilingsScreen);

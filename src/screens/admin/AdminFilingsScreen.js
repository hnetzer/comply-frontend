import React from 'react';
import { connect } from 'react-redux';
import { getAllCompanyFilings } from 'network/api';

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { setCompanyFilings } from 'actions';

import { SideListItem } from '../../components/molecules'
import { AdminFilingDetailsSection } from '../../components/sections'

import style from './AdminFilingsScreen.module.css'

class AdminFilingsScreen extends React.Component {
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

  renderFilingList = () => {
    let { companyfilings } = this.props;
    console.log(companyfilings)
    const { filter } = this.state
    if (filter != 'all') {
      companyfilings = companyfilings.filter(f => f.status === filter)
    }

    console.log(companyfilings)
    return companyfilings.map((f,i) =>
      (<SideListItem filing={f} key={i} index={i} onSelect={this.onSelectFiling} />)
    )
  }

  render() {
    const { showRejectModal, filter } = this.state
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
        <AdminFilingDetailsSection companyFiling={this.props.companyfilings[this.state.selectedIndex]} />
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    companyfilings: state.admin.companyfilings
  }
}

export default connect(mapStateToProps)(AdminFilingsScreen);

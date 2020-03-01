import React from 'react';
import { connect } from 'react-redux';
import { getAllCompanyFilings } from 'network/api';

import Form from 'react-bootstrap/Form'

import { setCompanyFilings } from 'actions';

import { SideListItem } from '../../components/molecules'
import { AdminFilingDetailsSection } from '../../components/sections'

import style from './AdminFilingsScreen.module.css'

class AdminFilingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: null };
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

  render() {
    const { companyFilings, showRejectModal } = this.state
    return(
      <main style={{ width: '100%', display: 'flex' }}>
        <section className={style.sideList}>
          <div style={{ padding: 16 }}>
            <Form.Control type="text" placeholder="Search company filings" />
          </div>
          <div>
          <div className={style.companyFilingsHeader}>
            Company filings
          </div>
          <div className={style.filingsList}>
            {this.props.companyfilings.map((f,i) =>
              (<SideListItem filing={f} key={i} index={i} onSelect={this.onSelectFiling} />)
            )}
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

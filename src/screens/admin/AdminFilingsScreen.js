import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllCompanyFilings, adminRejectCompanyFiling } from 'network/api';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import { SideListItem, FilingDataList } from '../../components/molecules'
import { AdminRejectFilingModal } from '../../components/organisms'

import style from './AdminFilingsScreen.module.css'

class AdminFilingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companyFilings: [], selectedIndex: null, showRejectModal: false };
  }

  async componentDidMount() {
    try {
      const data = await getAllCompanyFilings()
      this.setState({ companyFilings: data })
    } catch (err) {
      console.log(err)
    }
  }

  onSelectFiling = (index) => {
    this.setState({ selectedIndex: index })
  }

  renderFilingTitle = () => {
    const { selectedIndex, companyFilings } = this.state
    if(selectedIndex === null) return null;

    const c = companyFilings[selectedIndex]
    const { filing } = c

    return (<>
      <h4>{c.company.name}</h4>
      <h5>{filing.name}</h5>
      <h5 className="mb-2 text-muted">
        {`${filing.agency.name} - ${filing.agency.jurisdiction.name}`}
      </h5>
      <span className="mb-2 text-muted">
        {`Due: ${moment(filing.due).format('MMM Do, YYYY')}`}
      </span>
    </>)
  }

  renderFilingDataList = () => {
    const { selectedIndex, companyFilings } = this.state
    if(selectedIndex === null) return null;
    const c = companyFilings[selectedIndex]

    return (<>
      <FilingDataList data={c.field_data} />
      <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => this.setState({ showRejectModal: true})} variant="danger">
          Reject
        </Button>
        <Button variant="success">Accept</Button>
      </div>
    </>)
  }

  rejectFiling = async (values) => {
    const { selectedIndex, companyFilings } = this.state
    if(selectedIndex === null) return null;
    const c = companyFilings[selectedIndex]
    console.log(values)
    try {
      //const data = { reason: values.reason }
      await adminRejectCompanyFiling(c.id, values)
      this.setState({ showRejectModal: false})
    } catch (err) {
      console.log(err)
    }
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
            {companyFilings.map((f,i) =>
              (<SideListItem filing={f} key={i} index={i} onSelect={this.onSelectFiling} />)
            )}
          </div>
          </div>
        </section>
        <section className={style.content}>
          {this.renderFilingTitle()}
          {this.renderFilingDataList()}
        </section>
        <AdminRejectFilingModal
          show={showRejectModal}
          handleHide={() => this.setState({ showRejectModal: false })}
          handleSubmit={this.rejectFiling} />
      </main>
    )
  }
}

export default connect(state => state)(AdminFilingsScreen);

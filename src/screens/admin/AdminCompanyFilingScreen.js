import React from 'react';

import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { FilingHeader, FilingDataList } from 'components/molecules'
import { AdminRejectFilingModal } from 'components/organisms'

import {
  adminGetCompanyFiling,
  adminRejectCompanyFiling,
  adminUpdateCompanyFilingStatus
} from 'network/api';

import style from './AdminCompanyFilingScreen.module.scss'

class AdminCompanyFilingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companyFiling: null, showRejectModal: false };
  }

  async componentDidMount() {
    try {
      const data = await adminGetCompanyFiling(this.props.companyFilingId)
      this.setState({ companyFiling: data })
    } catch (err) {
      console.log(err)
    }
  }


  updateStatus = async (status) => {
    try {
      const companyFilingId = this.state.companyFiling.id
      const update = await adminUpdateCompanyFilingStatus(companyFilingId, { status: status })
      this.setState({ companyFiling: update })
    } catch (err) {
      console.warn(err)
    }
  }

  rejectFiling = async (values) => {
    try {
      //const data = { reason: values.reason }
      const companyFilingId = this.state.companyFiling.id
      const update = await adminRejectCompanyFiling(companyFilingId, values)
      this.setState({ showRejectModal: false, companyFiling: update })
    } catch (err) {
      console.warn(err)
    }
  }


  renderCTAs = (status) => {
    if (status === 'submitted') {
      return (
        <div className={style.cta}>
          <Button onClick={() => this.setState({ showRejectModal: true })} variant="danger">
            Reject
          </Button>
          <Button onClick={() => this.updateStatus('needs-signature-payment')} variant="success">Accept</Button>
        </div>
      )
    }
    if (status === 'needs-follow-up') {
      return (
        <div className={style.cta}>
          <Button onClick={() => this.updateStatus('submitted')} variant="success">Mark Submitted</Button>
        </div>
      )
    }

    if (status === 'needs-signature-payment') {
      return (
        <div className={style.cta}>
          <Button onClick={() => this.updateStatus('submitted')} variant="secondary">Back to Submitted</Button>
          <Button onClick={() => this.updateStatus('filed')} variant="success">Filed</Button>
        </div>
      )
    }

    if (status === 'filed') {
      return (
        <div className={style.cta}>
          <Button onClick={() => this.updateStatus('needs-signature-payment')} variant="secondary">Back to Sign & Pay</Button>
          <Button onClick={() => this.updateStatus('complete')} variant="success">Complete</Button>
        </div>
      )
    }

    if (status === 'complete') {
      return (
        <div className={style.cta}>
          <Button onClick={() => this.updateStatus('filed')} variant="secondary">Back to Filed</Button>
        </div>
      )
    }
  }


  render() {
    if (!this.state.companyFiling) return null;
    const { filing, status, fields, company, due_date } = this.state.companyFiling

    return(
      <>
        <main className={style.container}>
          <section className={style.content}>
            <Breadcrumb>
              <Breadcrumb.Item href="/admin/companyfilings">Company Filings</Breadcrumb.Item>
              <Breadcrumb.Item active>{company.name}</Breadcrumb.Item>
              <Breadcrumb.Item active>{filing.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className={style.headerSection}>
              <h4>{company.name}</h4>
              <FilingHeader filing={filing} status={status} due={due_date} title={false} />
            </div>
            <div className={style.divider} />
            <div style={{ width: '70%'}}>
              <h5>Form Data</h5>
              <FilingDataList data={fields} />
              {this.renderCTAs(status)}
            </div>
          </section>
        </main>
        <AdminRejectFilingModal
          show={this.state.showRejectModal}
          handleHide={() => this.setShowRejectModal(false)}
          handleSubmit={this.rejectFiling} />
      </>
    )
  }
}

export default AdminCompanyFilingScreen;

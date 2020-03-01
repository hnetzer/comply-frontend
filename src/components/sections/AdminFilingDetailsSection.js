import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { adminRejectCompanyFiling, adminUpdateCompanyFilingStatus } from 'network/api';

import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { FilingDataList } from '../../components/molecules'
import { AdminRejectFilingModal } from '../../components/organisms'

import { updateCompanyFiling } from 'actions';

import style from './AdminFilingDetailsSection.module.css'

const AdminFilingDetailsSection = ({ companyFiling, dispatch }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const updateStatus = async (status) => {
    try {
      const data = await adminUpdateCompanyFilingStatus(companyFiling.id, { status: status })
      dispatch(updateCompanyFiling(data))
    } catch (err) {
      console.warn(err)
    }
  }

  const rejectFiling = async (values) => {
    try {
      //const data = { reason: values.reason }
      const data = await adminRejectCompanyFiling(companyFiling.id, values)
      dispatch(updateCompanyFiling(data))
      setShowRejectModal(false)
    } catch (err) {
      console.warn(err)
    }
  }


  const renderCTAs = () => {
    const { status } = companyFiling
    if (status === 'submitted') {
      return (
        <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setShowRejectModal(true)} variant="danger">
            Reject
          </Button>
          <Button onClick={() => updateStatus('needs-signature-payment')} variant="success">Accept</Button>
        </div>
      )
    }
    if (status === 'needs-follow-up') {
      return (
        <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => updateStatus('submitted')} variant="success">Mark Submitted</Button>
        </div>
      )
    }

    if (status === 'needs-signature-payment') {
      return (
        <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => updateStatus('submitted')} variant="secondary">Back to Submitted</Button>
          <Button onClick={() => updateStatus('filed')} variant="success">Filed</Button>
        </div>
      )
    }

    if (status === 'filed') {
      return (
        <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => updateStatus('complete')} variant="success">Complete</Button>
        </div>
      )
    }
  }


  if (!companyFiling) return null;
  const { filing, status, field_data, company } = companyFiling
  return (
    <>
      <section className={style.content}>
        <h4>{company.name}</h4>
        <div>
          <span style={{ fontSize: 20 }}>{filing.name}</span>
          <Badge style={{ marginLeft: 16 }} variant="info">{status}</Badge>
        </div>
        <h5 className="mb-2 text-muted">
          {`${filing.agency.name} - ${filing.agency.jurisdiction.name}`}
        </h5>
        <span className="mb-2 text-muted">
          {`Due: ${moment(filing.due).format('MMM Do, YYYY')}`}
        </span>
        <FilingDataList data={field_data} />
        {renderCTAs()}
      </section>
      <AdminRejectFilingModal
        show={showRejectModal}
        handleHide={() => setShowRejectModal(false)}
        handleSubmit={rejectFiling} />
    </>
  )
}


export default connect(state => state)(AdminFilingDetailsSection);

import React, { useState } from 'react';
import moment from 'moment';
import { adminRejectCompanyFiling } from 'network/api';

import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { FilingDataList } from '../../components/molecules'
import { AdminRejectFilingModal } from '../../components/organisms'

import style from './AdminFilingDetailsSection.module.css'

const AdminFilingDetailsSection = ({ companyFiling }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const updateFilingStatus = async (status) => {

  }

  const rejectFiling = async (values) => {
    const { selectedIndex, companyFilings } = this.state
    if(selectedIndex === null) return null;
    const c = companyFilings[selectedIndex]
    try {
      //const data = { reason: values.reason }
      const response = await adminRejectCompanyFiling(c.id, values)
      this.setState({ showRejectModal: false})
    } catch (err) {
      console.warn(err)
    }
  }


  const renderCTAs = () => {
    const { status } = companyFiling
    if (status === 'submitted') {
      return (
        <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => showRejectModal(true)} variant="danger">
            Reject
          </Button>
          <Button variant="success">Accept</Button>
        </div>
      )
    }
    if (status === 'needs-follow-up') {
      return (
        <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="success">Mark Submitted</Button>
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


export default AdminFilingDetailsSection;

import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { AdminRejectFilingForm } from 'forms'

const AdminRejectFilingModal = (props) => {

  const handleSubmit = async (values, { setSubmitting }) => {
    props.handleSubmit(values)
  }

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Reason for Rejection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Describe what information is missing or what looks incorrect in the filing
        </p>
        <AdminRejectFilingForm
          handleSubmit={handleSubmit}
          handleCancel={props.handleHide} />
      </Modal.Body>
  </Modal>
  )
}


export default AdminRejectFilingModal

import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { AdminJurisdictionForm } from 'forms'

const AdminJurisdictionModal = (props) => {

  const handleSubmit = async (values, { setSubmitting }) => {
    props.handleSubmit(values)
  }

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.jurisdiction === null ? 'Create Jurisdiction' : 'Edit Jurisdiction'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminJurisdictionForm
          initialValues={props.jurisdiction}
          handleSubmit={handleSubmit} />
      </Modal.Body>
  </Modal>
  )
}


export default AdminJurisdictionModal

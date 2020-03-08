import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { AdminAgencyForm } from 'forms'

const AdminAgencyModal = (props) => {

  const handleSubmit = async (values, { setSubmitting }) => {
    props.handleSubmit(values)
  }

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.agency === null ? 'Create Agency' : 'Edit Agency'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminAgencyForm
          initialValues={props.agency}
          jurisdictions={props.jurisdictions}
          handleSubmit={handleSubmit} />
      </Modal.Body>
  </Modal>
  )
}


export default AdminAgencyModal

import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AdminJurisdictionForm } from 'forms'

const AdminJurisdictionModal = (props) => {

  const handleSubmit = async (values, { setSubmitting }) => {
    props.handleSubmit(values)
  }

  const handleDelete = async () => {
    const x = window.confirm('Are you sure you want to delete this JURISDICTION?')
    if(x) {
      props.handleDelete(props.jurisdiction.id)
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div>Edit Jurisdiction</div>
          {(props.jurisdiction && (props.jurisdiction.agencies.length === 0)) && (
            <Button onClick={handleDelete} variant="danger">
              <FontAwesomeIcon icon={faTrash}/>
            </Button>)}
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

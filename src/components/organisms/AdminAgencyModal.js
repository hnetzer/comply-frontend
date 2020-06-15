import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { AdminAgencyForm } from 'forms'

const AdminAgencyModal = (props) => {

  const handleSubmit = async (values, { setSubmitting }) => {
    props.handleSubmit(values)
  }

  const handleDelete = async () => {
    const x = window.confirm('Are you sure you want to delete this AGENCY?')
    if(x) {
      props.handleDelete(props.agency.id)
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div>{props.agency === null ? 'Create Agency' : 'Edit Agency'}</div>
            {(props.agency && (props.agency.filings.length === 0)) && (
              <Button onClick={handleDelete} variant="danger">
                <FontAwesomeIcon icon={faTrash}/>
              </Button>)}
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

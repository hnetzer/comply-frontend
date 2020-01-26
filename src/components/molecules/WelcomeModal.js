import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { AgenciesForm } from 'forms'


const WelcomeModal = (props) => {

  const getInitalFormValues = () => {
    return props.agencies.reduce((acc, a) => {
      acc[a.id] = true;
      return acc
    }, {})
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    props.updateAgencies(values)
  }

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title><h1>Welcome to Comply!</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Based on your <b>office location</b> and <b>formation state</b>,
          we reccomend that your company should comply with the following government agencies.
        </p>
        <p>
          Please unselect any agencies you do not want us to manage compliance.
        </p>
        <AgenciesForm
          agencies={props.agencies}
          initialValues={getInitalFormValues()}
          handleSubmit={handleSubmit} />
      </Modal.Body>
  </Modal>
  )
}


export default WelcomeModal

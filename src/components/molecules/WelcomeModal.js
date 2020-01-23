import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const WelcomeModal = (props) => {

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Comply!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Based on your office location, we believe your company needs to
          comply with the following government agencies.
        </p>
        <p>
          Unselect agencies you don't Comply to file with.
        </p>
        <Form>
          {props.agencies.map((agency, index) => {
            return (
              <Form.Check
                type="checkbox"
                label={`${agency.name} (${agency['jurisdiction.name']})`}
                checked={true}
              />
            )
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => props.handleHide()}>
          Save Agencies
        </Button>
      </Modal.Footer>
  </Modal>
  )
}


export default WelcomeModal

import React, { useState } from 'react';

// React Bootstrap components
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import styles from './GetStartedScreen.module.css'

const GetStartedScreen = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
     const form = event.currentTarget;
     if (form.checkValidity() === false) {
       event.preventDefault();
       event.stopPropagation();
     }
     setValidated(true);
  };


  return (
    <Container className={styles.container}>
      <h1 className={styles.header}>Get started with Comply</h1>
      <Container className={styles.formContainer}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Comply Inc." />
          </Form.Group>
          <Form.Group controlId="companyPhone">
            <Form.Label>Company Phone</Form.Label>
            <Form.Control type="text" placeholder="(888) 888-8888" />
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group controlId="yourName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Mike Smith" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="yourROle">
                <Form.Label>Your Role</Form.Label>
                <Form.Control as="select">
                  <option>CEO</option>
                  <option>CFO</option>
                  <option>Controller</option>
                  <option>Executive Assistant</option>
                  <option>Administrator</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group controlId="accountEmail">
            <Form.Label>Account Email</Form.Label>
            <Form.Control type="email" placeholder="mike@company.com" />
          </Form.Group>
          <Form.Group controlId="accountPassword">
            <Form.Label>Account Password</Form.Label>
            <Form.Control type="password" placeholder="******" />
          </Form.Group>
          <Button variant="primary" type="submit" block className={styles.submitButton}>
            Next
          </Button>
        </Form>
      </Container>
    </Container>
  )
}

export default GetStartedScreen;

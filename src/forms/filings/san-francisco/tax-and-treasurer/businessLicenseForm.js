import React, { useState } from 'react';

import { Formik } from 'formik';

import { InfoPopover } from 'components/molecules'

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'

const BusinessLicenseForm = (props) => {
  const [validated] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  const handleValidation = values => {
    const errors = {};
    return errors;
  }

  const NIACS_OPTIONS = [
    { name: 'Choose one...', code: null },
    { name: 'Agriculture, Forestry, Fishing and Hunting', code: 11 },
    { name: 'Mining', code: 21 },
    { name: 'Utilities', code: 22 },
    { name: 'Construction', code: 23 },
    { name: 'Manufacturing', code: 31 },
    { name: 'Wholesale Trade', code: 42 },
    { name: 'Retail Trade', code: 44 },
    { name: 'Transportation and Warehousing', code: 48 },
    { name: 'Information', code: 51 },
    { name: 'Finance and Insurance', code: 52 },
    { name: 'Real Estate Rental and Leasing', code: 53 },
    { name: 'Professional, Scientific, and Technical Services', code: 54 },
    { name: 'Administrative and Support Servies', code: 56 },
    { name: 'Educational Services', code: 61 },
    { name: 'Health Care and Social Assistance', code: 62 },
    { name: 'Arts, Entertainment, and Recreation', code: 71 },
    { name: 'Accommodation and Food Services', code: 72 },
    { name: 'Other Services (except Public Administration)', code: 81 },
    { name: 'Public Administration', code: 92 },
  ];

  const initialValues = {
    ban: '',
    ein: '',
    pin: '',
    niacs: '' ,
    property: false,
    rentalIncome: false,
    numEmployees: '',
    totalPayroll: '',
    sfPayroll: ''
  }

  return (
    <>
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={handleSubmit}
    >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    }) => (
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Group controlId="ban">
                <Form.Label>
                  <span>BAN</span>
                  <InfoPopover
                    content="Business account number.  Specific to this agency."
                  />
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  value={values.ban}
                  />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="ein">
                <Form.Label>
                  <span>EIN</span>
                  <InfoPopover
                    content="Your EIN number from the IRS"
                  />
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  value={values.ein}
                  />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="pin">
                <Form.Label>
                  <span>Online PIN</span>
                  <InfoPopover
                    content="You will recieved a new online PIN each year in an email from the agency."
                  />
                </Form.Label>
                <Form.Control
                  required
                  onChange={handleChange}
                  type="text"
                  value={values.pin}
                  />
              </Form.Group>
            </Col>
            <Col>
            </Col>
          </Form.Row>
          <Form.Group controlId="niacs">
            <Form.Label>NIACS Buisness Activity Selection</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              value={values.niacs}
              as="select">
              {NIACS_OPTIONS.map(
                (option, i) => (<option key={i} value={option.code}>{option.name}</option>)
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="property">
            <Form.Check
              label="Buisness owns property in SF"
              type="checkbox"
              value={values.property} />
          </Form.Group>
          <Form.Group controlId="rentalIncome">
            <Form.Check
              label="Buisness recieves rental income in SF"
              type="checkbox"
              value={values.rentalIncome} />
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group controlId="numEmployees">
                <Form.Label>Number of SF Employees</Form.Label>
                <Form.Control
                  required
                  onChange={handleChange}
                  type="number"
                  value={values.numEmployees}
                  />
              </Form.Group>
            </Col>
            <Col/>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="totalPayroll">
                <Form.Label>Total Payroll</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    onChange={handleChange}
                    type="number"
                    value={values.totalPayroll}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="sfPayroll">
                <Form.Label>Payroll for SF Employees</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    onChange={handleChange}
                    type="number"
                    value={values.sfPayroll}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: 24 }}>
            <Col>
              <Button variant="secondary" type="submit" block>
                Save Draft
              </Button>
            </Col>
            <Col>
              <Button variant="primary" type="submit" block>
                Submit to Comply
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )}
    </Formik>
  </>
  );
}



export default BusinessLicenseForm;

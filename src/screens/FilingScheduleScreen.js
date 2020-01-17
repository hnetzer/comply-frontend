import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import { getFilings } from 'actions';

import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

const FilingScheduleScreen = (props) => {

  const onSelectCompany = (companyId) => {
    props.dispatch(getFilings(companyId))
  }

  const renderCompany = (company) => {
    if(!company) return null;

    return (
      <Card style={{ width: '18rem', marginTop: 16, marginBottom: 16 }}>
        <Card.Body>
          <Card.Title>{company.name}</Card.Title>
          <Card.Text>
            {'Financial Year End: '}
            <b>{moment(company.year_end).format('MMMM Do, YYYY')}</b>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  const renderFilingSchedule = (filings) => {
    const filingsWithDates = filings.map(f => {
      f.due = new Date(f.due);
      return f
    })

    const sortedFilings = filingsWithDates.sort((a, b) => a.due - b.due)
    const body = sortedFilings.map((a,i) => {
      return (
        <tr key={i}>
          <td>{moment(a.due).format('MMMM Do, YYYY')}</td>
          <td>{a.name}</td>
          <td>{a.agency.name}</td>
          <td>{a.agency.jurisdiction.name}</td>
        </tr>
      )
    })

    return (
      <>
      <h2 style={{ marginTop: 16, marginBottom: 16 }}>Filing Schedule</h2>
      <Table striped bordered hover style={{ marginTop: 16, marginBottom: 16 }}>
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Document</th>
            <th>Agency</th>
            <th>Jurisdiction</th>
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </Table>
      </>
    );
  }

  return (
    <div style={{ padding: 28 }}>
      <h1>Comply Demo</h1>
      <Dropdown onSelect={onSelectCompany}>
        <Dropdown.Toggle variant="primary">
          Choose company
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">Company A</Dropdown.Item>
          <Dropdown.Item eventKey="2">Company B</Dropdown.Item>
          <Dropdown.Item eventKey="3">Company C</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {renderCompany(props.company)}
      {renderFilingSchedule(props.filings)}
    </div>
  );
}

const mapStateToProps = state => {
  const data = state.filing
  return data
}

export default connect(mapStateToProps)(FilingScheduleScreen);

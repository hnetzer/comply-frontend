import React from 'react';
import { connect } from 'react-redux';

import { simpleAction, getFilings } from './actions/simpleAction';

import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

const App = (props) => {
  const onSelectCompany = (companyId) => {
    props.dispatch(getFilings(companyId))
  }

  const renderCompany = (company) => {
    if(!company) return null;
    return (<div>
      <h1>{company.name}</h1>
      <div>
        <label>{`Financial Year End:  `}</label>
        <b>{company.year_end}</b>
      </div>
    </div>)
  }

  const renderFilingSchedule = (filings) => {
    const filingsWithDates = filings.map(f => {
      f.due = new Date(f.due);
      return f
    })

    const sortedFilings = filingsWithDates.sort((a, b) => a.due - b.due)
    const body = sortedFilings.map((a,i) => {
      const date = a.due.toString()
      return (
        <tr key={i}>
          <td>{date}</td>
          <td>{a.name}</td>
          <td>{a.agency.name}</td>
          <td>{a.agency.jurisdiction.name}</td>
        </tr>
      )
    })

    return (
      <>
      <h2>Filing Schedule</h2>
      <Table striped bordered hover>
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
    <div className="App">
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
  const data = state.simpleReducer
  return data
}



export default connect(mapStateToProps)(App);

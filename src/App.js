import React from 'react';
import { connect } from 'react-redux';

import { simpleAction, getFilings } from './actions/simpleAction';

import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';

const App = (props) => {

  const onSelectCompany = (companyId) => {
    props.dispatch(simpleAction())
    props.dispatch(getFilings(companyId))
  }

  return (
    <div className="App">
      <Dropdown onSelect={onSelectCompany}>
        <Dropdown.Toggle variant="primary">
          Choose company
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="A">Company A</Dropdown.Item>
          <Dropdown.Item eventKey="B">Company B</Dropdown.Item>
          <Dropdown.Item eventKey="C">Company C</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <pre>{ JSON.stringify(props)}</pre>
    </div>
  );
}

const mapStateToProps = state => ({
 ...state
})

export default connect(mapStateToProps)(App);

import React from 'react';
import './App.css';

import Dropdown from 'react-bootstrap/Dropdown';

function App() {

  const onSelectCompany = (companyId) => {
    console.log(companyId)
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
    </div>
  );
}

export default App;

import React from 'react';

import Table from 'react-bootstrap/Table'

const FilingDataList = ({ data }) => {
  console.log(data)
  if(!data) return null;
  const fields = data
  console.log(fields)

  return (<>
    <Table striped bordered hover>
      <tbody>
      {fields.map((field, index) => (
        <tr key={index}>
          <td>{field.filing_field.name}</td>
          <td>{field.value}</td>
        </tr>))}
      </tbody>
    </Table>
  </>
  );
}

export default FilingDataList;

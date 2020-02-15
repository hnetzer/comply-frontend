import React from 'react';

import Table from 'react-bootstrap/Table'

const FilingDataList = ({ data }) => {
  if(!data) return null;
  const fields = Object.keys(data)

  return (<>
    <Table striped bordered hover>
      <tbody>
      {fields.map((field, index) => (
        <tr>
          <td>{field}</td>
          <td>{data[field]}</td>
        </tr>))}
      </tbody>
    </Table>
  </>
  );
}

export default FilingDataList;

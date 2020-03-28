import React from 'react';

import Badge from 'react-bootstrap/Badge';

import { toTitleCase } from 'utils'
import moment from 'moment'

const FilingHeader = ({ filing, due, status, title = true }) => {
  if(!filing) return null;

  return (
    <div>
      {title && (<h2>{toTitleCase(filing.name)}</h2>)}
      <h5 className="mb-2 text-muted">
        {`${toTitleCase(filing.agency.name)} - ${filing.agency.jurisdiction.name}`}
      </h5>
      <span className="mb-2 text-muted">
        {`Due: ${moment(filing.due).format('MMM Do, YYYY')}`}
      </span>
      {status &&  (<Badge style={{ marginLeft: 16 }} variant="info">
        {status}
      </Badge>)}
    </div>
  )
}

export default FilingHeader;

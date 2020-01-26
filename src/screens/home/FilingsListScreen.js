import React from 'react';
import { connect } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const FilingsListScreen = (props) => {
  return(
    <div>
      <h2>Filing Schedule</h2>
    </div>
  )
}

export default connect()(FilingsListScreen);

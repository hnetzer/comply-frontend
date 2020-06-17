import React from 'react';
import Form from 'react-bootstrap/Form';
import _ from 'lodash';

const DueDayPicker = ({ value, handleChange, month }) => {
  const getLastDayOfMonth = () => {
    let m = month
    if (typeof(month) === 'string') {
      m = parseInt(month)
    }

    const thirtyOneMonths = [0,2,4,6,7,9,11]
    const thirtyMonths = [3,5,8,9]
    const february = [1]

    if (thirtyOneMonths.indexOf(m) > -1) {
      return 31
    }

    if (thirtyMonths.indexOf(m) > -1) {
      return 30
    }

    if (february.indexOf(m) > -1) {
      return 28
    }
  }



  return (<Form.Control
    required
    onChange={handleChange}
    value={value || ''}
    size="sm"
    as="select">
    <option value={null}>select day</option>
    {_.range(1, getLastDayOfMonth() + 1).map((day,i) =>(<option key={i} value={day}>{day}</option>))}
  </Form.Control>)

}

export default DueDayPicker;

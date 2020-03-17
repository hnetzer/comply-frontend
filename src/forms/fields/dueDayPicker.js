import React from 'react';
import Form from 'react-bootstrap/Form';

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

  const suffix = (value) => {
    switch(value) {
      case 31:
        return 'st';
      case 30:
      case 28:
        return 'th';
      default:
        return 'th';
    }
  }


  return (<Form.Control
    required
    onChange={handleChange}
    value={value || ''}
    size="sm"
    as="select">
    <option value={null}>select day</option>
    <option value={15}>15th</option>
    <option value={getLastDayOfMonth()}>
    {`${getLastDayOfMonth()}${suffix(getLastDayOfMonth())}`}
    </option>
  </Form.Control>)

}

export default DueDayPicker;

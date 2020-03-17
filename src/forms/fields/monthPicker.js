import React from 'react';
import Form from 'react-bootstrap/Form';

const MonthPicker = ({ value, handleChange }) => {
  return (<Form.Control
    required
    onChange={handleChange}
    value={value || ''}
    size="sm"
    as="select">
    <option value={null}>select month</option>
    <option value={0}>January</option>
    <option value={1}>Febrary</option>
    <option value={2}>March</option>
    <option value={3}>April</option>
    <option value={4}>May</option>
    <option value={5}>June</option>
    <option value={6}>July</option>
    <option value={7}>August</option>
    <option value={8}>September</option>
    <option value={9}>October</option>
    <option value={10}>November</option>
    <option value={11}>December</option>
  </Form.Control>)

}

export default MonthPicker;

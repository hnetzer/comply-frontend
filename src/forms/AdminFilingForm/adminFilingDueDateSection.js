import React from 'react';
import { FieldArray } from 'formik';
import _ from 'lodash';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DueDayPicker, MonthPicker } from 'forms/fields'


const AdminFilingDueDateSection = ({ values, handleChange }) => {

  const renderFixedDateFields = () => {
    const occurrence = values.occurrence
    if (occurrence === "multiple") return null;
    const dependency = values.due_dates[0].offset_type
    if (dependency !== "none") return null;
    return (
      <div>
        <Form.Label>Date</Form.Label>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <Form.Group style={{ width: 154, marginRight: 16 }} controlId="due_dates[0].fixed_month">
            <MonthPicker
              handleChange={handleChange}
              value={values.due_dates[0].fixed_month} />
          </Form.Group>
          <Form.Group style={{ width: 154 }} controlId="due_dates[0].fixed_day">
            <DueDayPicker
              handleChange={handleChange}
              value={values.due_dates[0].fixed_day}
              month={values.due_dates[0].fixed_month}/>
          </Form.Group>
        </div>
      </div>
    )
  }

  const renderOccurrenceOptions = () => {
    return (
      <Form.Group controlId="occurrence" style={{ marginRight: 24 }}>
       <Form.Label>Occurrence</Form.Label>
         <Form.Check
            label="annual"
            type="radio"
            value="annual"
            onChange={handleChange}
            checked={values.occurrence === "annual"}/>
         <Form.Check
            label="multiple per year"
            type="radio"
            value="multiple"
            onChange={handleChange}
            checked={values.occurrence === "multiple"}/>
          <Form.Check
             label="biennial"
             type="radio"
             value="biennial"
             onChange={handleChange}
             checked={values.occurrence === "biennial"}/>
      </Form.Group>
    )
  }

  const renderDependencyOptions = () => {
    const occurrence = values.occurrence
    if (occurrence === "multiple") return null;
    return (
      <Form.Group controlId="due_dates[0].offset_type">
        <Form.Label>Dependency</Form.Label>
        <div>
          <Form.Check
             label="none"
             type="radio"
             value="none"
             onChange={handleChange}
             checked={values.due_dates[0].offset_type === "none"}/>
           <Form.Check
              label="registration"
              type="radio"
              value="registration"
              onChange={handleChange}
              checked={values.due_dates[0].offset_type === "registration"}/>
          <Form.Check
             label="year end"
             type="radio"
             value="year-end"
             onChange={handleChange}
             checked={values.due_dates[0].offset_type === "year-end"}/>
        </div>
      </Form.Group>
    )
  }

  const renderMultipleTimesFields = () => {
    const occurrence = values.occurrence
    if (occurrence !== "multiple") return null;
    return (
      <div>
        <Form.Label>Dates</Form.Label>
        <FieldArray
          name="due_dates"
          render={arrayHelpers => (
          <>
            {values.due_dates.map((due_date, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'row'}}>
                <Form.Group style={{ width: 154 }} controlId={`due_dates[${index}].fixed_month`}>
                  <MonthPicker
                    handleChange={handleChange}
                    value={values.due_dates[index].fixed_month} />
                </Form.Group>
                <Form.Group style={{ width: 154 }} controlId={`due_dates[${index}].fixed_day`}>
                  <DueDayPicker
                    handleChange={handleChange}
                    value={values.due_dates[index].fixed_day}
                    month={values.due_dates[index].fixed_month}/>
                </Form.Group>
              </div>
            ))}
            <Button
              onClick={() => arrayHelpers.push({
                fixed_day: null,
                fixed_month: null,
                offset_type: 'none',
                month_offset: null,
                day_offset: null,
                month_end: false
              })}
              size="sm"
              variant="link">+ Add Date</Button>
            </>
          )}
        />
      </div>
    )
  }

  const renderOffsetFields = () => {
    const occurrence = values.occurrence
    if (occurrence === "multiple") return null;
    const dependency = values.due_dates[0].offset_type
    if (dependency === "none") return null;
    return (
      <div>
        <Form.Label>Date Offset</Form.Label>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <Form.Group style={{ width: 154, marginRight: 16 }} controlId="due_dates[0].month_offset">
            <Form.Control
              required
              onChange={handleChange}
              value={values.due_dates[0].month_offset || ''}
              size="sm"
              as="select">
              <option value={0}>+0 months</option>
              <option value={1}>+1 month</option>
              <option value={2}>+2 months</option>
              <option value={3}>+3 months</option>
              <option value={4}>+4 months</option>
              <option value={5}>+5 months</option>
              <option value={6}>+6 months</option>
              <option value={7}>+7 months</option>
              <option value={8}>+8 months</option>
              <option value={9}>+9 months</option>
              <option value={10}>+10 months</option>
              <option value={11}>+11 months</option>
            </Form.Control>
          </Form.Group>
          <Form.Group style={{ width: 154, marginRight: 16 }} controlId="due_dates[0].day_offset">
            <Form.Control
              required
              onChange={handleChange}
              value={values.due_dates[0].day_offset || ''}
              size="sm"
              as="select">
              {_.range(31).map(i => (
                  <option key={i} value={i}>{`+${i} days`}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {dependency === "registration" &&
            (<Form.Group style={{ width: 154 }} controlId="due_dates[0].month_end">
              <Form.Check
                inline
                label="month end"
                type="checkbox"
                onChange={handleChange}
                checked={values.due_dates[0].month_end}/>
            </Form.Group>)
          }
        </div>
      </div>
    )
  }


  return (<>
    <h5>Deadlines</h5>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {renderOccurrenceOptions()}
      {renderDependencyOptions()}
    </div>
    {renderFixedDateFields()}
    {renderMultipleTimesFields()}
    {renderOffsetFields()}
  </>)

}

export default AdminFilingDueDateSection;

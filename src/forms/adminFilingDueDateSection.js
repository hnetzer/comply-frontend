import React from 'react';

import { FieldArray } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DueDayPicker, MonthPicker } from 'forms/fields'

import style from './adminFilingForm.module.css'


const AdminFilingDueDateSection = ({ values, handleChange }) => {

  const renderFixedDateFields = () => {
    const occurrence = values.occurrence
    if (occurrence === "multiple") return null;
    const dependency = values.due_dates[0].offset_type
    if (dependency !== "none") return null;
    return (
      <Form.Row className={style.dateRow}>
        <Form.Group style={{ width: 154 }} controlId="due_dates[0].fixed_month">
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
      </Form.Row>
    )
  }

  const renderOccurrenceOptions = () => {
    return (
      <Form.Group controlId="occurrence">
         <Form.Check inline
            label="annual"
            type="radio"
            value="annual"
            onChange={handleChange}
            checked={values.occurrence === "annual"}/>
         <Form.Check inline
            label="multiple per year"
            type="radio"
            value="multiple"
            onChange={handleChange}
            checked={values.occurrence === "multiple"}/>
          <Form.Check inline
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
          <Form.Check inline
             label="none"
             type="radio"
             value="none"
             onChange={handleChange}
             checked={values.due_dates[0].offset_type === "none"}/>
           <Form.Check inline
              label="registration"
              type="radio"
              value="registration"
              onChange={handleChange}
              checked={values.due_dates[0].offset_type === "registration"}/>
          <Form.Check inline
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
      <FieldArray
        name="due_dates"
        render={arrayHelpers => (
        <>
          {values.due_dates.map((due_date, index) => (
            <Form.Row key={index} className={style.dateRow}>
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
            </Form.Row>
          ))}
          <Button
            onClick={() => arrayHelpers.push({
              fixed_day: null,
              fixed_month: null,
              offset_type: 'none',
              month_offset: null,
              day_offset: null,
            })}
            size="sm"
            variant="link">+ Add Date</Button>
          </>
        )}
      />
    )
  }

  const renderDependencyFields = () => {
    const occurrence = values.occurrence
    if (occurrence === "multiple") return null;
    const dependency = values.due_dates[0].offset_type
    if (dependency === "none") return null;
    return (
      <Form.Row className={style.dateRow}>
        <Form.Group style={{ width: 154 }} controlId="due_dates[0].month_offset">
          <Form.Control
            required
            onChange={handleChange}
            value={values.due_dates[0].month_offset || ''}
            size="sm"
            as="select">
            <option value={null}>select month offset</option>
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
        <Form.Group style={{ width: 154 }} controlId="due_dates[0].day_offset">
          <Form.Control
            required
            onChange={handleChange}
            value={values.due_dates[0].day_offset || ''}
            size="sm"
            as="select">
            <option value={null}>select day</option>
            <option value="1">1st of the month</option>
            <option value="15">15th of the month</option>
            <option value="end-of-month">last day the month</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    )
  }


  return (<>
    {renderOccurrenceOptions()}
    {renderMultipleTimesFields()}
    {renderDependencyOptions()}
    {renderFixedDateFields()}
    {renderDependencyFields()}
  </>)

}

export default AdminFilingDueDateSection;

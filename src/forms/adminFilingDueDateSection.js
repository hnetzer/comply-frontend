import React, { useState } from 'react';

import { Formik, FieldArray } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DueDayPicker, MonthPicker } from 'forms/fields'

import style from './adminFilingForm.module.css'


const AdminFilingDueDateSection = ({ values, handleChange }) => {

  const renderFixedDateFields = () => {
    const occurence = values.due_date_occurence
    if (occurence === "multiple") return null;
    const dependency = values.due_date_dependency
    if (dependency !== "none") return null;
    return (
      <Form.Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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

  const renderOccurenceOptions = () => {
    return (
      <Form.Group controlId="due_date_occurence">
         <Form.Check inline
            label="annual"
            type="radio"
            value="annual"
            onChange={handleChange}
            checked={values.due_date_occurence === "annual"}/>
         <Form.Check inline
            label="multiple per year"
            type="radio"
            value="multiple"
            onChange={handleChange}
            checked={values.due_date_occurence === "multiple"}/>
          <Form.Check inline
             label="biennial"
             type="radio"
             value="biennial"
             onChange={handleChange}
             checked={values.due_date_occurence === "biennial"}/>
      </Form.Group>
    )
  }

  const renderDependencyOptions = () => {
    const occurence = values.due_date_occurence
    if (occurence === "multiple") return null;
    return (
      <Form.Group controlId="due_date_dependency">
        <Form.Label>Dependency</Form.Label>
        <div>
          <Form.Check inline
             label="none"
             type="radio"
             value="none"
             onChange={handleChange}
             checked={values.due_date_dependency === "none"}/>
           <Form.Check inline
              label="registration"
              type="radio"
              value="registration"
              onChange={handleChange}
              checked={values.due_date_dependency === "registration"}/>
          <Form.Check inline
             label="year end"
             type="radio"
             value="year-end"
             onChange={handleChange}
             checked={values.due_date_dependency === "year-end"}/>
        </div>
      </Form.Group>
    )
  }

  const renderMultipleTimesFields = () => {
    const occurence = values.due_date_occurence
    if (occurence !== "multiple") return null;
    return (
      <FieldArray
        name="due_dates"
        render={arrayHelpers => (
        <>
          {values.due_dates.map((due_date, index) => (
            <Form.Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
            onClick={() => arrayHelpers.push({ fixed_day: '', fixed_month: ''})}
            size="sm"
            variant="link">+ Add Date</Button>
          </>
        )}
      />
    )
  }

  const renderDependencyFields = () => {
    const occurence = values.due_date_occurence
    if (occurence === "multiple") return null;
    const dependency = values.due_date_dependency
    if (dependency === "none") return null;
    return (
      <Form.Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Form.Group style={{ width: 154 }} controlId="due_dates[0].month_offset">
          <Form.Control
            required
            onChange={handleChange}
            value={values.due_dates[0].month_offset}
            size="sm"
            as="select">
            <option value={null}>select month offset</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
          </Form.Control>
        </Form.Group>
        <Form.Group style={{ width: 154 }} controlId="due_dates[0].day_offset">
          <Form.Control
            required
            onChange={handleChange}
            value={values.due_dates[0].day_offset}
            size="sm"
            as="select">
            <option value={null}>select day</option>
            <option value="15">15th</option>
            <option value="end-of-month">end of the month</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    )
  }


  return (<>
    {renderOccurenceOptions()}
    {renderMultipleTimesFields()}
    {renderDependencyOptions()}
    {renderFixedDateFields()}
    {renderDependencyFields()}
  </>)

}

export default AdminFilingDueDateSection;

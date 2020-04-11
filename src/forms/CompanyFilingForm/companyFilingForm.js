import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { InfoPopover } from 'components/molecules'

import { filingFieldSort } from 'utils'

import style from './companyFilingForm.module.scss'


const CompanyFilingForm = ({ filing, companyFiling, handleSubmit }) => {
  const [draft, setDraft] = useState(true);
  const [validated] = useState(false);

  const doHandleSubmit = async (values, { setSubmitting }) => {
    const status = draft ? 'draft' : 'submitted'
    await handleSubmit(values, status)
  }

  const doHandleValidation = values => {
    const errors = {};
    return errors;
  }


  let fieldValueMap = {}
  const initializeValueMap = () => {
    const { fields } = companyFiling;
    fieldValueMap = fields.reduce((map, field) => {
      map[field.filing_field.id] = { value: field.value, id: field.id }
      return map
    }, {})
  }

  const getInitialValues = () => {
    initializeValueMap()
    const { fields } = filing;
    const initialFieldValues = fields.map(f => {
      const fieldData = {
        id: null, // NOTE: this is the company filing field id
        filing_field_id: f.id,
        name: f.name,
        order: f.order,
        value: ''
      }

      const companyFilingField = fieldValueMap[f.id]
      if (companyFilingField) {
        fieldData.value = companyFilingField.value;
        fieldData.id = companyFilingField.id
      }
      return fieldData
    })

    initialFieldValues.sort(filingFieldSort)

    return {
      fields: initialFieldValues
    }
  }


  return (
    <Formik
      initialValues={getInitialValues()}
      validate={doHandleValidation}
      onSubmit={doHandleSubmit}
    >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    }) => (
        <Form validated={validated} onSubmit={handleSubmit}>
          <FieldArray
            name="fields"
            render={arrayHelpers => (
              <>
                {values.fields.map((field, index) => (
                  <Form.Group key={index} controlId={`fields[${index}].value`}>
                    <Form.Label>{field.name}</Form.Label>
                    <div className={style.inputRow}>
                      <Form.Control
                        autoComplete="off"
                        onChange={handleChange}
                        type="text"
                        value={values.fields[index].value} />
                      {field.helper_text && (<InfoPopover content={field.helper_text} />)}
                    </div>
                  </Form.Group>
                ))}
              </>
            )} />
            <Form.Row className={style.submitFormRow}>
              <Button
                className={style.submitButton}
                onClick={() => setDraft(true)}
                variant="secondary"
                type="submit"
              >
                Save Draft
              </Button>
              <Button
                className={style.submitButton}
                onClick={() => setDraft(false)}
                variant="primary"
                type="submit"
              >
                Submit to Comply
              </Button>
            </Form.Row>
        </Form>
      )}
    </Formik>
  );
}

export default CompanyFilingForm;

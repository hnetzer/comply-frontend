import React, { useState } from 'react';

import { Formik, FieldArray } from 'formik';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { InfoPopover } from 'components/molecules'

const CompanyFilingForm = (props) => {
  const [draft, setDraft] = useState(true);
  const [validated] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const status = draft ? 'draft' : 'submitted'
    await props.handleSubmit(values, status)
  }

  const handleValidation = values => {
    const errors = {};
    return errors;
  }

  const initializeCompanyFiling = () => {
    const { fields } = props.filing;
    return {
      fields: fields.map(f => ({
        filing_field_id: f.id,
        value: "",
      }))
    };
  }

  const getFieldsFromCompanyFiling = () => {
    const { fields } = props.companyFiling;
    return {
      fields: fields.map(f => ({
        id: f.id,
        filing_field_id: f.filing_field_id,
        value: f.value,
      }))
    }
  }

  return (
    <Formik
      initialValues={props.companyFiling != null ? getFieldsFromCompanyFiling() : initializeCompanyFiling()}
      validate={handleValidation}
      onSubmit={handleSubmit}
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
                {props.filing.fields.map((field, index) => (
                  <Form.Group key={index} controlId={`fields[${index}].value`}>
                    <Form.Label>{field.name}</Form.Label>
                    <InfoPopover content={field.helper_text} />
                    <Form.Control
                      autoComplete="off"
                      onChange={handleChange}
                      type="text"
                      value={values.fields[index] != null ? values.fields[index].value : ''} />
                  </Form.Group>
                ))}
              </>
            )} />
            <Form.Row style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
              <Button style={{ width: 160 }} onClick={() => setDraft(true)} variant="secondary" type="submit">
                Save Draft
              </Button>
              <Button style={{ width: 160 }} onClick={() => setDraft(false)} variant="primary" type="submit">
                Submit to Comply
              </Button>
            </Form.Row>
        </Form>
      )}
    </Formik>
  );
}

export default CompanyFilingForm;

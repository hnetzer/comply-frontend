import React from 'react';
import { navigate } from "@reach/router"

import { CompanyDetailsForm } from 'forms'
import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'
import { updateCompany } from 'network/api'

const Company = ({ user, company, dispatch }) => {
  const initialFormValues = {
    type: '',
    tax_class: '',
    year_end_month: '',
    year_end_day: '',
    formation_state: '',
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      type: values.type,
      tax_class: values.tax_class,
      year_end_month: values.year_end_month,
      year_end_day: values.year_end_day,
      jurisdiction: {
        name: values.formation_state,
      }
    }

    try {
      await updateCompany(data, company.id)
      navigate('/signup/office-details')
    } catch (err) {
      alert(err.message)
    }
  }


  return(
    <>
      <Card style={{ width: 304, height: 448, marginRight: 24 }}>
        <VerticalProgressBar currentIndex={1}/>
      </Card>
      <Card style={{ width: 800, flexDirection: 'column' }}>
        <h3>Company</h3>
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <h6 style={{ fontSize: 16, fontWeight: 600, marginBottom: 0 }}>Add baseline information</h6>
          <p style={{ fontSize: 15 }}>Provide information on your company so that we can generate your filing schedule.</p>
        </div>
        <CompanyDetailsForm
          initialValues={initialFormValues}
          handleSubmit={handleSubmit} />
      </Card>
    </>
  )
}

export default Company;

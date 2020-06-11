import React, { useState } from 'react';

import { CompanyDetailsForm } from 'forms'
import { Card, Alert } from 'components/atoms'

const EditCompanyScreen= ({ company }) => {
  const [saved, setSaved] = useState(false)
  const onSaveSuccess = () => {
    setSaved(true)
  }

  const onSaveError = () => {

  }

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>General</h3>
      <div style={{ width: '100%', borderBottom: '1px solid #cdcdcd', marginBottom: 40 }}></div>
      <div style={{ width: 300, marginBottom: 24 }}>
        <Alert
          show={saved}
          onDismiss={() => setSaved(false)}>
          Saved successfully
        </Alert>
      </div>
      {!company ? (<div>Loading...</div>) :
        <CompanyDetailsForm
          companyId={company.id}
          cta="Save"
          onSuccess={onSaveSuccess}
          onError={onSaveError}
          initialValues={company} />
      }
    </Card>
  )
}

export default EditCompanyScreen;

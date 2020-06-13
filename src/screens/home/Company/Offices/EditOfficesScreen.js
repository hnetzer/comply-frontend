import React, { useState } from 'react';
import { Card, Alert } from 'components/atoms'
import { OfficeDetailsForm } from 'forms'

const EditOfficesScreen= () => {
  const [saved, setSaved] = useState(false)
  const onSuccess = () => {
    setSaved(true)
  }

  const onError = () => {

  }

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Offices</h3>
      <div style={{ width: '100%', borderBottom: '1px solid #cdcdcd', marginBottom: 40 }}></div>
      <div style={{ width: 300, marginBottom: 24 }}>
        <Alert
          show={saved}
          onDismiss={() => setSaved(false)}>
          Saved successfully
        </Alert>
      </div>
      { <OfficeDetailsForm
          cta="Save"
          onSuccess={onSuccess}
          onError={onError} />
      }
    </Card>
  )
}

export default EditOfficesScreen;

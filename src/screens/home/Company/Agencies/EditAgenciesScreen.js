import React, { useState } from 'react';
import { Card, Alert } from 'components/atoms'

import { AgenciesForm } from 'forms'

const EditAgenciesScreen= ({ companyId, agencies, companyAgencies }) => {
  const [saved, setSaved] = useState(false)

  const onSuccess = (company) => {
    setSaved(true)
  }

  const onError = () => {

  }

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Agencies</h3>
      <div style={{ width: '100%', borderBottom: '1px solid #cdcdcd', marginBottom: 40 }}></div>
      <div style={{ width: 300, marginBottom: 24 }}>
        <Alert
          show={saved}
          onDismiss={() => setSaved(false)}>
          Saved successfully
        </Alert>
      </div>
      <AgenciesForm
        faqs={false}
        onSuccess={onSuccess}
        onError={onError}/>
    </Card>
  )
}

export default EditAgenciesScreen;

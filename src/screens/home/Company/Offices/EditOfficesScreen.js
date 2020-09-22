import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Alert } from 'components/atoms'
import { OfficeDetailsForm } from 'forms'

import { setAgencies, setCompanyAgencies } from 'actions'
import { getAgencies, getCompanyAgencies } from 'network/api'

const EditOfficesScreen= ({ companyId, dispatch }) => {
  const [saved, setSaved] = useState(false)

  const onSuccess = async () => {
    setSaved(true)

    // Make sure the agencies are updated after updating offices
    const agencies = await getAgencies(companyId);
    dispatch(setAgencies(agencies))

    const companyAgencies = await getCompanyAgencies(companyId)
    dispatch(setCompanyAgencies(companyAgencies))
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

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(EditOfficesScreen);

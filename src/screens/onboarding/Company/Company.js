import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { CompanyDetailsForm } from 'forms'
import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'
import { updateCompany } from 'network/api'

import style from '../OnboardingScreen.module.scss'
import screenStyle from './Company.module.scss'

const Company = ({ user, company, dispatch }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      type: values.type,
      tax_class: values.tax_class,
      year_end_month: values.year_end_month,
      year_end_day: values.year_end_day,
      formation_state: values.formation_state,
    }

    try {
      await updateCompany(data, company.id)
      navigate('/onboarding/offices')
    } catch (err) {
      alert(err.message)
    }
  }

  const getInitalValues = () => {
    return {
      year_end_day: company.year_end_day || '',
      year_end_month: company.year_end_month || '',
      type: company.type || '',
      tax_class: company.tax_class || '',
      formation_state: company.formation_state || '',
    }
  }

  // TODO: Update loading with real loding spinner
  return(
    <>
      <Card className={style.progressBarSection}>
        <VerticalProgressBar currentIndex={1}/>
      </Card>
      <Card className={screenStyle.mainCard}>
        <h3>Company</h3>
        <div className={style.descriptionSection}>
          <h6 className={style.descriptionHeader}>Add baseline information</h6>
          <p className={style.descriptionText}>
            Provide information on your company so that we can generate your filing schedule.
          </p>
        </div>
        {!company ? (<div>Loading...</div>) :
          <CompanyDetailsForm
            initialValues={getInitalValues()}
            handleSubmit={handleSubmit} />
        }
      </Card>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Company);

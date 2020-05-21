import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'
import { AgenciesForm } from 'forms'
import { updateAgencies, getCompanyFilings } from 'network/api';
import { setFilings, setCompanyAgencies, onboarded } from 'actions';

import style from '../OnboardingScreen.module.scss'

const Agencies = ({ user, agencies, dispatch }) => {

  const getInitalFormValues = () => {
    return agencies.reduce((acc, a) => {
      acc[a.id] = true;
      return acc
    }, {})
  }

  const handleSubmit = async (agencyIds) => {
    try {
      const agencies = await updateAgencies({ agencies: agencyIds }, user.company_id)
      const filings = await getCompanyFilings(user.company_id)
      dispatch(setFilings(filings))
      dispatch(setCompanyAgencies(agencies))
      dispatch(onboarded())
      navigate('/onboarding/done')
    } catch (err) {
      alert(err)
    }
  }

  return(
    <>
      <Card className={style.progressBarSection}>
        <VerticalProgressBar currentIndex={3}/>
      </Card>
      <Card style={{ width: 800, display: 'flex', flexDirection: 'column' }}>
        <h3>Agencies</h3>
        <div className={style.descriptionSection}>
          <h6 className={style.descriptionHeader}>Add agency information</h6>
          <p className={style.descriptionText}>
            Based on your company offices, we believe you should be registered with the agencies listed below.
            Please confirm which agencies that your company is registered with. If your company is not registered with an agency,
            we will not track those filings for you.
          </p>
        </div>
        {!agencies ? (<div>Loading...</div>) :
          <AgenciesForm
            agencies={agencies}
            initialValues={getInitalFormValues()}
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

export default connect(mapStateToProps)(Agencies);

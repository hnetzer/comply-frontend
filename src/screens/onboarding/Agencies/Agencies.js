import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'
import { AgenciesForm } from 'forms'

import { updateCompanyAgencies, getCompanyFilings, getAgencies, getCompanyAgencies } from 'network/api';
import { setFilings, setCompanyAgencies, onboarded } from 'actions';

import style from '../OnboardingScreen.module.scss'

class Agencies extends React.Component {
  constructor(props) {
    super(props)
    this.state = { agencies: null }
  }

  async componentDidMount() {
    const { user } = this.props
    try {
      const agencies = await getAgencies(user.company_id);
      const companyAgencies = await getCompanyAgencies(user.company_id)
      this.setState({ agencies: agencies, companyAgencies: companyAgencies })
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = async (companyAgencies) => {
    const { user, dispatch } = this.props
    try {
      const agencies = await updateCompanyAgencies(companyAgencies, user.company_id)
      const filings = await getCompanyFilings(user.company_id)
      dispatch(setFilings(filings))
      dispatch(setCompanyAgencies(agencies))
      dispatch(onboarded())
      navigate('/onboarding/done')
    } catch (err) {
      alert(err)
    }
  }

  render() {
    const { agencies, companyAgencies } = this.state
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
              companyAgencies={companyAgencies}
              handleSubmit={this.handleSubmit} />
          }
        </Card>
        <div className={style.helpSection}>
          <b>Need help?</b> Contact us <i>help@thinkcomply.com</i>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Agencies);

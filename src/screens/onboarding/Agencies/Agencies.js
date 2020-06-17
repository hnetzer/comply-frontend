import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { VerticalProgressBar } from 'components/molecules'
import { Card } from 'components/atoms'
import { AgenciesForm } from 'forms'

import { getAgencies, getCompanyAgencies } from 'network/api';
import { setCompanyAgencies, onboarded } from 'actions';

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
      this.setState({ agencies: agencies })

      const companyAgencies = await getCompanyAgencies(user.company_id)
      this.props.dispatch(setCompanyAgencies(companyAgencies))

    } catch (err) {
      console.log(err)
    }
  }

  onSuccess = async () => {
    const { dispatch } = this.props;
    dispatch(onboarded())
    navigate('/onboarding/done')
  }

  onError = (err) => {
    alert(err)
  }

  render() {
    const { agencies } = this.state
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
              Based on your locations, we believe you should be registered with
              the agencies listed below. The agency deadlines won’t appear on your
              filing schedule if you mark No.
            </p>
          </div>
          {!agencies ? (<div>Loading...</div>) :
            <AgenciesForm
              agencies={agencies}
              onSuccess={this.onSuccess}
              onError={this.onError}
              hideReg={true}
              cta="Continue" />
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

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import { Card } from 'components/atoms'
import { UpcomingDatesCard, PremiumCard, AgencyRegAlert } from 'components/organisms'
import { FilingTimeline } from 'components/molecules'
import { getFilingsForCompany, getCompanyJurisdictions, updateCompanyPremium } from 'network/api';

import screenStyle from './Screens.module.scss'
import style from './DashboardScreen.module.scss'

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timelineFilings: null,
      upcomingFilings: null,
      showRegAlert: false,
      showPremiumModal: false,
    }
  }

  async componentDidMount() {
    this.loadPageData()
  }

  /*componentDidUpdate(prevProps) {
    if (prevProps.agencies.length !== this.props.agencies.length) {
      await this.loadPageData()
    }
  }*/

  loadPageData = async () => {
    try {
      const companyId = this.props.user.company_id;
      const yearFilings = await this.getFilingsForCurrentYear(companyId, true);
      const upcomingFilings = await this.getUpcomingFilings(companyId);
      const unscheduledFilings = yearFilings.filter(f => f.due == null)
      const jurisdictions = await getCompanyJurisdictions(companyId);

      this.setState({
        timelineFilings: yearFilings.filter(f => f.due != null).sort(this.compareFilingsByDue),
        upcomingFilings: upcomingFilings,
        showRegAlert: unscheduledFilings.length > 0,
        notSupportedJuris: jurisdictions.filter(j => !j.supported)
      })

    } catch (err) {
      console.log(err)
    }
  }

  getFilingsForCurrentYear = async (companyId, unscheduled) => {
    const year = moment().format('YYYY')
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;
    return await getFilingsForCompany(companyId, start, end, unscheduled)
  }

  getUpcomingFilings = async (companyId) => {
    const start = moment().format('YYYY-MM-DD')
    const end = moment().add(2, 'M').format('YYYY-MM-DD')
    const filings = await getFilingsForCompany(companyId, start, end)
    return filings.sort(this.compareFilingsByDue)
  }

  compareFilingsByDue = (a, b) => {
    const dueA = moment(a.due).unix()
    const dueB = moment(b.due).unix()
    if (dueA > dueB) {
      return 1
    } else if (dueA < dueB) {
      return -1
    }
    return 0
  }

  submitWantsPremium = () => {
    updateCompanyPremium(this.props.user.company_id)
  }

  render() {
    const {
      timelineFilings,
      upcomingFilings,
      showRegAlert,
      notSupportedJuris
    } = this.state

    const { user } = this.props
    if (!user) return null;


    return(
      <section className={screenStyle.container}>
        <div className={screenStyle.content}>
          <AgencyRegAlert
            show={showRegAlert}
            onDismiss={() => this.setState({ showRegAlert: false})} />
          <div className={style.topSection}>
            <UpcomingDatesCard
              upcomingFilings={timelineFilings}
              notSupportedJuris={notSupportedJuris} />
            <PremiumCard
              annualFilingCount={timelineFilings != null ? timelineFilings.length : 0}
              wantsPremium={this.submitWantsPremium}
             />
          </div>
          <Card className={style.overviewCard}>
            <h4>Filing Overview</h4>
            <p>{`A timeline of all of your filing due dates in ${moment().format('YYYY')}.`}</p>
            <FilingTimeline filings={timelineFilings} />
          </Card>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    agencies: state.company.agencies
  }
}

export default connect(mapStateToProps)(DashboardScreen)

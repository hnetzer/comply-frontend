import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import Button from 'react-bootstrap/Button';
import { Card } from 'components/atoms'
import { UpcomingDatesCard, PremiumCard, NotSupportedModal, IncompleteFilingsModal } from 'components/organisms'
import { CustomFilingTimeline } from 'components/molecules'
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
        needRegAgencies: unscheduledFilings.map(f => f.agency),
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
    const end = moment().add(3, 'M').format('YYYY-MM-DD')
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
      needRegAgencies,
      notSupportedJuris
    } = this.state

    const { user } = this.props
    if (!user) return null;


    return(
      <section className={screenStyle.container}>
        <div className={screenStyle.content}>
          <Card className={style.overviewCard}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div>
                <h4>Filing Overview</h4>
                <p>{`A timeline of all of your filing due dates in ${moment().format('YYYY')}.`}</p>
              </div>
              <div>
                <NotSupportedModal jurisdictions={notSupportedJuris} />
                <IncompleteFilingsModal agencies={needRegAgencies} />
              </div>
            </div>
            {/* <FilingTimeline filings={timelineFilings} /> */}
            <CustomFilingTimeline filings={timelineFilings} />
          </Card>
          <div className={style.topSection}>
            <UpcomingDatesCard
              upcomingFilings={upcomingFilings}
              notSupportedJuris={notSupportedJuris} />
            <PremiumCard
              annualFilingCount={timelineFilings != null ? timelineFilings.length : 0}
              wantsPremium={this.submitWantsPremium}
             />
           <Card style={{ height: 256, width: 264, marginTop: 16}}>
             <h4>Feedback</h4>
           </Card>
          </div>
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

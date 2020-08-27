import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { compareFilingsByDue } from 'utils'

import { Card, Divider } from 'components/atoms'
import {
  UpcomingDatesCard,
  PremiumCard,
  FeedbackCard,
  NotSupportedModal,
  IncompleteFilingRow,
} from 'components/organisms'

import { FilingTimeline, AgencyRegistrationDrawer } from 'components/molecules'
import {
  getCompanyFilings,
  getCompanyJurisdictions,
  updateCompanyPremium
} from 'network/api';

import screenStyle from './Screens.module.scss'
import style from './DashboardScreen.module.scss'

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timelineFilings: null,
      upcomingFilings: null,
      incompleteFilings: null,
      showPremiumModal: false,
      showDrawer: false,
      selectedAgency: null,
    }
  }

  async componentDidMount() {
    this.loadPageData()
  }


  loadPageData = async () => {
    try {
      const companyId = this.props.user.company_id;
      const yearFilings = await this.getFilingsForCurrentYear(companyId, true);
      const upcomingFilings = await this.getUpcomingFilings(companyId);
      const incompleteFilings = yearFilings.filter(f => f.due_date == null)
      const jurisdictions = await getCompanyJurisdictions(companyId);

      this.setState({
        timelineFilings: yearFilings.filter(f => f.due_date != null).sort(compareFilingsByDue),
        upcomingFilings: upcomingFilings,
        notSupportedJuris: jurisdictions.filter(j => !j.supported),
        incompleteFilings: incompleteFilings
      })

    } catch (err) {
      console.log(err)
    }
  }

  getFilingsForCurrentYear = async (companyId, unscheduled) => {
    const year = moment().format('YYYY')
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;
    return await getCompanyFilings(companyId, start, end, unscheduled)
  }

  getUpcomingFilings = async (companyId) => {
    const start = moment().format('YYYY-MM-DD')
    const end = moment().add(3, 'M').format('YYYY-MM-DD')
    const filings = await getCompanyFilings(companyId, start, end)
    return filings.sort(compareFilingsByDue)
  }


  submitWantsPremium = () => {
    updateCompanyPremium(this.props.user.company_id)
  }

  render() {
    const {
      timelineFilings,
      upcomingFilings,
      notSupportedJuris,
      incompleteFilings,
      showDrawer,
      selectedAgency
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
              </div>
            </div>
            <FilingTimeline filings={timelineFilings} />
            {incompleteFilings && incompleteFilings.length > 0 &&
              (
                <div style={{ marginTop: 16 }}>
                  <h5>Filings Not Included</h5>
                  {incompleteFilings.map((f,i) => (
                    <div key={i}>
                    <IncompleteFilingRow
                      key={i}
                      companyFiling={f}
                      ctaClick={() => this.setState({ showDrawer: true, selectedAgency: f.filing.agency })}
                      />
                    {((incompleteFilings.length - 1) !== i) && <Divider />}
                    </div>
                  ))}
                </div>
              )
          }
          </Card>
          <div className={style.topSection}>
            <UpcomingDatesCard
              upcomingFilings={upcomingFilings}
              notSupportedJuris={notSupportedJuris} />
            <PremiumCard
              annualFilingCount={timelineFilings != null ? timelineFilings.length : 0}
              wantsPremium={this.submitWantsPremium}
             />
           <FeedbackCard />
          </div>
        </div>
        <AgencyRegistrationDrawer
          agency={selectedAgency}
          show={showDrawer}
          refreshDashboard={() => this.loadPageData()}
          onHide={() => this.setState({ showDrawer: false, selectedAgency: null })} />
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

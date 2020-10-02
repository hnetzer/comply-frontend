import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { compareFilingsByDue } from 'utils'

import { Card, Divider, Loading } from 'components/atoms'
import {
  UpcomingDatesCard,
  PremiumCard,
  FeedbackCard,
  NotSupportedModal,
  IncompleteFilingRow
} from 'components/organisms'

import { FilingTimeline, AgencyRegistrationDrawer } from 'components/molecules'
import {
  getCompanyFilings,
  getCompanyJurisdictions,
  updateCompanyPremium,
  getCompany
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

  async componentDidUpdate(prevProps) {
    if (this.props.companyId !== prevProps.companyId) {
      this.setState({
        timelineFilings: null,
        upcomingFilings: null,
        incompleteFilings: null,
        showPremiumModal: false,
        showDrawer: false,
        selectedAgency: null,
      })

      this.loadPageData()
    }
  }


  loadPageData = async () => {
    try {
      const companyId = this.props.companyId
      const filings = await this.getFilings(companyId, true);
      const upcomingFilings = await this.getUpcomingFilings(companyId);
      const jurisdictions = await getCompanyJurisdictions(companyId);
      const company = await getCompany(companyId)

      this.setState({
        timelineFilings: filings.filter(f => f.due_date != null && !f.hidden).sort(compareFilingsByDue),
        upcomingFilings: upcomingFilings.filter(f => !f.hidden),
        notSupportedJuris: this.getNotSupported(jurisdictions, company),
        incompleteFilings: this.getIncompleteFilings(filings)
      })

    } catch (err) {
      console.log(err)
    }
  }

  getNotSupported = (jurisdictions, company) => {
    const companyType = company.type.toLowerCase()
    if (companyType === 'corporation') {
      return jurisdictions.filter(j => !j.corp_supported);
    }
    if (companyType === 'llc') {
      return jurisdictions.filter(j => !j.llc_supported);
    }
  }

  getFilings = async (companyId, unscheduled) => {
    const start = `2020-01-01`;
    const end = `2022-12-31`;
    return await getCompanyFilings(companyId, start, end, unscheduled)
  }

  getUpcomingFilings = async (companyId) => {
    const start = moment().format('YYYY-MM-DD')
    const end = moment().add(3, 'M').format('YYYY-MM-DD')
    const filings = await getCompanyFilings(companyId, start, end)
    return filings.sort(compareFilingsByDue)
  }

  getIncompleteFilings = (yearFilings) => {
    const filingIds = []
    const incomplete = yearFilings.filter(f => {
      if (f.hidden) return false;
      if (f.due_date != null) return false;
      if (filingIds.indexOf(f.filing.id) >= 0) return false;

      filingIds.push(f.filing.id)
      return true;
    });
    return incomplete;
  }


  submitWantsPremium = () => {
    updateCompanyPremium(this.props.companyId)
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

    const { user, companyId } = this.props
    if (!user) return null;

    if (!user || !timelineFilings || !upcomingFilings) {
      return (
        <section className={screenStyle.container}>
          <div className={screenStyle.content}>
            <Loading />
          </div>
        </section>
      )
    }


    return(
      <section className={screenStyle.container}>
        <div className={screenStyle.content}>
          <Card className={style.overviewCard}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div>
                <h4>Filing Overview</h4>
                <p>{`A timeline of all of your filing due dates.`}</p>
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
          companyId={companyId}
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
    agencies: state.company.agencies,
  }
}

export default connect(mapStateToProps)(DashboardScreen)

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import { HeaderBar } from 'components/organisms'
import { FilingTimeline } from 'components/molecules'
import { getFilingsForCompany, getCompanyAgencies } from 'network/api';

import screenStyle from './Screens.module.scss'
import style from './DashboardScreen.module.scss'

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filingCount: null,
      agencyCount: null,
      nextDueDate: null,
      timelineFilings: null
    }
  }

  async componentDidMount() {
    this.loadPageData()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.agencies.length !== this.props.agencies.length) {
      await this.loadPageData()
    }
  }

  loadPageData = async () => {
    try {
      const filings = await getFilingsForCompany(this.props.user.company_id)
      const agencies = await getCompanyAgencies(this.props.user.company_id)
      const nextDueDate = this.findNextDueDate(filings)
      const timelineFilings = this.getTimelineFilings(filings)

      this.setState({
        filingCount: filings.length,
        agencyCount: agencies.length,
        timelineFilings: timelineFilings,
        nextDueDate: nextDueDate
      })
    } catch (err) {
      console.log(err)
    }
  }

  findNextDueDate = (filings) => {
    const now = new Date()
    const f = filings.filter(f => {
      if (f.due == null) return false
      const due = new Date(f.due)
      if (due.getTime() >= now.getTime()) {
        return true
      }
      return false
    })

    f.sort(this.compareFilingsByDue)
    if (f.length > 0) {
      return f[0].due
    }
    return null
  }

  getTimelineFilings = (filings) => {
    const f = filings.filter(f => f.due != null)
    return f.sort(this.compareFilingsByDue)
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

  render() {
    const { filingCount, agencyCount, nextDueDate, timelineFilings } = this.state
    const { user } = this.props

    if (!user || !agencyCount) return null;

    return(
      <>
        <HeaderBar title="Home"/>
        <section className={screenStyle.container}>
          <div className={screenStyle.content}>
            <div style={{ width: '100%', textAlign: 'left'}}>
              <h2 className={style.welcome}>{`Welcome ${user.name}`}!</h2>
              <h3 className={style.filingSentence}>
                {`Comply is helping you keep track of `}
                <span className={style.accentNumber}>{`${filingCount} annual filings`}</span>
                {` across `}
                <span className={style.accentNumber}>{`${agencyCount} agencies`}</span>
                {`.`}
              </h3>
              {nextDueDate && (<h4 className={style.filingSentence}>
                {`Your next filing is due `}
                <span className={style.accentNumber}>{moment(nextDueDate).format('MMMM Do')}</span>
                {`.`}
              </h4>)}
            </div>
            <FilingTimeline filings={timelineFilings} />
          </div>
        </section>
      </>
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

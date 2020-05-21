import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import Button from 'react-bootstrap/Button';
import { Card } from 'components/atoms'
import { FilingTimeline } from 'components/molecules'
import { getFilingsForCompany } from 'network/api';

import screenStyle from './Screens.module.scss'
import style from './DashboardScreen.module.scss'

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      this.setState({ timelineFilings: this.getTimelineFilings(filings) })
    } catch (err) {
      console.log(err)
    }
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
    const { timelineFilings } = this.state
    const { user } = this.props
    if (!user) return null;

    return(
      <section className={screenStyle.container}>
        <div className={screenStyle.content}>
          <div className={style.topSection}>
            <Card className={style.topCard}>
              <h4>Upcoming Due Dates</h4>
            </Card>
            <Card className={style.topCard}>
              <h4>We'll file for you</h4>
              <Button style={{ width: 240 }}>Try Comply Premium</Button>
            </Card>
          </div>
          <Card className={style.overviewCard}>
            <h4>Overview</h4>
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

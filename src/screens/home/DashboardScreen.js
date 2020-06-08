import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


import { Card } from 'components/atoms'
import { FilingTimeline } from 'components/molecules'
import { getFilingsForCompany } from 'network/api';

import { Table, Body, Row, Cell } from 'components/atoms'

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import screenStyle from './Screens.module.scss'
import style from './DashboardScreen.module.scss'

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timelineFilings: null,
      upcomingFilings: null,
      unscheduledFilings: false,
      showModal: false
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
      const companyId = this.props.user.company_id;
      const yearFilings = await this.getFilingsForCurrentYear(companyId, true);
      const upcomingFilings = await this.getUpcomingFilings(companyId);
      const unscheduledFilings = yearFilings.filter(f => f.due == null)

      this.setState({
        timelineFilings: yearFilings.filter(f => f.due != null).sort(this.compareFilingsByDue),
        upcomingFilings: upcomingFilings,
        unscheduledFilings: unscheduledFilings.length > 0
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

  render() {
    const { timelineFilings, upcomingFilings, unscheduledFilings } = this.state
    const { user } = this.props
    if (!user) return null;

    return(
      <section className={screenStyle.container}>
        <div className={screenStyle.content}>
          <div className={style.topSection}>
            <Card className={style.topCard}>
              <div className={style.upcomingTitleContainer}>
                <h4>Upcoming Due Dates</h4>
                {unscheduledFilings &&
                  (<FontAwesomeIcon
                    onClick={() => this.setState({ showModal: true })}
                    className={style.warningIcon}
                    icon={faExclamationTriangle}
                  />)
                }
              </div>
              <div className={style.upcomingTableWrapper}>
                <Table>
                  <Body>
                    {upcomingFilings && upcomingFilings.map((f,i) => (
                      <Row key={i}>
                        <Cell className={style.upcomingCell}>{f.name}</Cell>
                        <Cell className={style.upcomingCell}>{f.agency.jurisdiction.name}</Cell>
                        <Cell className={style.upcomingCell}>{moment(f.due).format("MMM Do, YYYY")}</Cell>
                      </Row>
                    ))}
                  </Body>
                </Table>
              </div>
            </Card>
            <Card className={style.topCard}>
              <h4>We'll file for you</h4>
              <Button style={{ width: 240 }}>Try Comply Premium</Button>
            </Card>
          </div>
          <Card className={style.overviewCard}>
            <h4>{`${moment().format('YYYY')} Filing Overview`}</h4>
            <p>A timeline of your next year of filing deadlines.</p>
            <FilingTimeline filings={timelineFilings} />
          </Card>
        </div>
        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
          <Modal.Header closeButton>
            <h3>Some deadlines cannot be determined</h3>
          </Modal.Header>
          <Modal.Body>
            <p>
              Some of your filing deadlines are based your company's registration date with the agency.
              Please enter the registration dates of the agencies highlighed below to show all filing deadlines.
            </p>
          </Modal.Body>
        </Modal>
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

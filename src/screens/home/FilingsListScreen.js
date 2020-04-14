import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import { FilingCard } from '../../components/molecules'
import { getFilingsForCompany, getCompanyFilings } from 'network/api';

import { HeaderBar } from 'components/organisms'

import { setFilings } from 'actions';

import style from './Screens.module.scss'
import listStyles from './FilingsListScreen.module.scss';

// Maybe this should just be a functional component?
class FilingsListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyFilings: [],
      filings: []
    }
  }

  async componentDidMount() {
    await this.loadPageData()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.agencies.length !== this.props.agencies.length) {
      await this.loadPageData()
    }
  }

  loadPageData = async () => {
    try {
      const filings = await getFilingsForCompany(this.props.user.company_id)
      const companyFilings = await getCompanyFilings(this.props.user.company_id)
      this.setState({
        companyFilings: companyFilings,
        filings: filings
      })
      this.props.dispatch(setFilings(filings))
    } catch (err) {
    }
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

  renderNeedMoreInfo = () => {
    const filings =  this.props.filings.filter(f => f.due == null)
    const f = filings.map((filing, index) => (
      <FilingCard
        filing={filing}
        status={null}
        due={filing.due}
        companyFilingId={null}
        key={index} />
    ))

    return this.renderFilingSection(filings.length, f, 'Need More Information')
  }

  renderInProgress = () => {
    const filings = this.state.companyFilings.filter(f => f.status !== 'complete')
    const f = filings.map((c, index) => (
        <FilingCard
          filing={c.filing}
          status={c.status}
          due={c.due_date}
          companyFilingId={c.id}
          key={index} />
      ))

    return this.renderFilingSection(this.state.companyFilings.length, f, 'In Progress')
  }

  renderNext = () => {
    const now = new Date()
    const companyFilingMap = this.state.companyFilings.reduce((acc, item) => {
      acc[item.filing.id] = item.due_date
      return acc
    }, {})

    const filings = this.props.filings.filter(f => {
      // remove filings that need more info
      if (f.due == null) return false
      // remove filings that have already been started
      if (companyFilingMap[f.id] != null) return false

      const due = new Date(f.due)
      if (due.getTime() >= now.getTime()) {
        return true
      }

      return false
    })

    const f = filings
      .sort(this.compareFilingsByDue)
      .slice(0, 2)
      .map((filing, index) => (
        <FilingCard
          filing={filing}
          status={null}
          due={filing.due}
          companyFilingId={null}
          key={index} />
      ))

    return this.renderFilingSection(filings.length, f, 'Next Filings')

  }

  renderFilingSection = (count, filings, title) => {
    if (!count) return null;
    return (<div className={listStyles.section}>
      <div className={listStyles.title}>
        <h5>{title}</h5>
      </div>
      <div className={listStyles.list}>
        {filings}
      </div>
    </div>)
  }


  render() {
    return(
      <>
        <HeaderBar title="Filings"/>
        <section className={style.container}>
          <div className={style.content}>
            {this.renderInProgress()}
            {this.renderNext()}
            {this.renderNeedMoreInfo()}
          </div>
        </section>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    filings: state.filing.filings,
    agencies: state.company.agencies
  }
}

export default connect(mapStateToProps)(FilingsListScreen);

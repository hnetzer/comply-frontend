import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import { FilingCard } from '../../components/molecules'
import { getFilingsForCompany, getCompanyFilings } from 'network/api';

import { HeaderBar } from 'components/organisms'

import { setFilings } from 'actions';

import style from './FilingsListScreen.module.scss'

// Maybe this should just be a functional component?
class FilingsListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { companyFilings: [] }
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
      this.setState({ companyFilings: companyFilings})
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

  renderFilings = (filings) => {
    return filings.map((filing, index) => (
      <FilingCard filing={filing} due={filing.due} key={index} />
    ))
  }

  renderNeedMoreInfo = () => {
    const filings = this.props.filings.filter(f => f.due == null)
    if (filings.length) {
      return (<>
        <h4>NEED INFO</h4>
        {this.renderFilings(filings)}
      </>)
    }
  }

  renderInProgress = () => {
    return (<>
      <h4>IN PROGRESS</h4>
      {this.state.companyFilings.map((c, index) => (
        <FilingCard
          filing={c.filing}
          status={c.status}
          due={c.due_date}
          companyFilingId={c.id}
          key={index} />
      ))}
    </>)
  }

  renderNext60Days = () => {
    const future = moment().add(120, 'd').unix()
    const now = moment().unix()
    const companyFilingMap = this.state.companyFilings.reduce((acc, item) => {
      acc[item.filing.id] = item.due_date
      return acc
    }, {})

    const filings = this.props.filings.filter(f => {
      if (f.due == null) return false
      if (companyFilingMap[f.id] != null) return false

      // Show SF Tax & Treasurer Buisness License for now
      if (f.id === 4) return true

      const due = moment(f.due).unix()
      return due < future && due >= now;
    })


    if (filings.length) {
      return (<>
        <h4>NEXT</h4>
        {this.renderFilings(filings.sort(this.compareFilingsByDue))}
      </>)
    }
  }


  render() {
    return(
      <>
        <HeaderBar title="Filings"/>
        <section className={style.container}>
          <div className={style.content}>
            {this.renderNeedMoreInfo()}
            {this.renderInProgress()}
            {this.renderNext60Days()}
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

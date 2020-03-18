import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import { FilingCard } from '../../components/molecules'
import { getCompanyFilings } from 'network/api';

import { setFilings } from 'actions';

// Maybe this should just be a functional component?
class FilingsListScreen extends React.Component {
  async componentDidMount() {
    try {
      const filings = await getCompanyFilings(this.props.user.company_id)
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
      <FilingCard filing={filing} key={index} />
    ))
  }

  renderNeedMoreInfo = () => {
    const filings = this.props.filings.filter(f => f.due == null)
    if (filings.length) {
      return (<>
        <h5>Need More Information</h5>
        {this.renderFilings(filings)}
      </>)
    }
  }

  renderInProgress = () => {
    const filings = this.props.filings.filter(f => f.companyFilingId != null)
    if (filings.length) {
      return (<>
        <h5>In Progress</h5>
        {this.renderFilings(filings)}
      </>)
    }
  }

  renderNext60Days = () => {
    const future = moment().add(120, 'd').unix()
    const now = moment().unix()
    const filings = this.props.filings.filter(f => {
      if (f.due == null) return false
      if (f.companyFilingId != null) return false

      // Show SF Tax & Treasurer Buisness License for now
      if (f.id === 4) return true

      const due = moment(f.due).unix()
      return due < future && due >= now;
    })

    if (filings.length) {
      return (<>
        <h5>Next 120 Days</h5>
        {this.renderFilings(filings.sort(this.compareFilingsByDue))}
      </>)
    }
  }


  render() {
    return(
      <div>
        <h2>Filings</h2>
        {this.renderNeedMoreInfo()}
        {this.renderInProgress()}
        {this.renderNext60Days()}
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    filings: state.filing.filings
  }
}

export default connect(mapStateToProps)(FilingsListScreen);

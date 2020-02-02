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
    return this.renderFilings(this.props.filings.filter(f => f.due == null))
  }

  renderInProgress = () => {
    return this.renderFilings(this.props.filings.filter(f => f.companyFiling != null))
  }

  renderNext60Days = () => {
    const future = moment().add(60, 'd').unix()
    const now = moment().unix()
    const filings = this.props.filings.filter(f => {
      if (f.due == null) return false
      if (f.companyFiling != null) return false
      const due = moment(f.due).unix()
      return due < future && due >= now;
    })

    return this.renderFilings(filings.sort(this.compareFilingsByDue))
  }


  /*renderFilings = () => {
    const sortedFilings = this.props.filings.sort(this.compareFilingsByDue)
    return sortedFilings.map((filing, index) => (
      <FilingCard filing={filing} key={index} />
    ))
  }*/

  render() {
    return(
      <div>
        <h2>Filings</h2>
        <h4>Need More Info</h4>
        {this.renderNeedMoreInfo()}
        <h4>In Progress</h4>
        {this.renderInProgress()}
        <h4>Next 60 Days</h4>
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

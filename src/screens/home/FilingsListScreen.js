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
      console.log('GOT THE FILINGS')
      console.log('setting them...')
      this.props.dispatch(setFilings(filings))
    } catch (err) {
    }
  }

  compareFilingsByDue = (a, b) => {
    if (a.due == null && b.due == null) {
      return 0
    } else if (a.due != null && b.due == null) {
      return 1
    } else if (a.due == null && b.due != null) {
      return -1
    }

    const dueA = moment(a.due).unix()
    const dueB = moment(b.due).unix()
    if (dueA > dueB) {
      return 1
    } else if (dueA < dueB) {
      return -1
    }
    return 0
  }

  renderFilings = () => {
    const sortedFilings = this.props.filings.sort(this.compareFilingsByDue)
    return sortedFilings.map((filing, index) => (
      <FilingCard filing={filing} key={index} />
    ))
  }

  render() {
    return(
      <div>
        <h2>Filing Schedule</h2>
        {this.renderFilings()}
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

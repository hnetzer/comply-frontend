import React from 'react';
import { connect } from 'react-redux';

import { getCompanyFilings } from 'network/api';

// Maybe this should just be a functional component?
class FilingsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      const filings = await getCompanyFilings(this.props.user.company_id)
    } catch (err) {
    }
  }

  render() {
    return(
      <div>
        <h2>Filing Schedule</h2>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(FilingsListScreen);

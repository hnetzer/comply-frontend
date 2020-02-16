import React from 'react';
import { connect } from 'react-redux';

import { getAllCompanyFilings } from 'network/api';

class AdminFilingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async componentDidMount() {
    try {
      const response = await getAllCompanyFilings()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return(
      <div>

      </div>
    )
  }
}

export default connect(state => state)(AdminFilingsScreen);

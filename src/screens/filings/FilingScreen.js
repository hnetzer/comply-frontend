import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toTitleCase } from 'utils'

import { getFiling } from 'network/api';

class FilingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filing: null}
  }

  async componentDidMount() {
    const filing = await getFiling(this.props.filingId);
    this.setState({ filing: filing })

  }

  renderHeader = () => {
    const filing = this.state.filing
    if (!filing) return null;
    return (<div>
      <h2>{filing.name}</h2>
      <h5 className="mb-2 text-muted">
        {`${toTitleCase(filing.agency.name)} - ${filing.jurisdiction.name}`}
      </h5>
    </div>)
  }

  render() {
    return (<>
      {this.renderHeader()}
    </>);
  }
}

export default connect()(FilingScreen);

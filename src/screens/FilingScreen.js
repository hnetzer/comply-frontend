import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toTitleCase } from 'utils'

import { getFiling } from 'network/api';

import { SanFrancisco } from 'forms/filings'

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

  renderForm = () => {
    const filing = this.state.filing
    if (!filing) return null;

    switch (filing.jurisdiction.name.toLowerCase()) {
      case 'san francisco': {
        switch (filing.agency.name.toLowerCase()) {
          case 'tax and treasurer': {
            return <SanFrancisco.TaxAndTreasurer.BusinessLicenseForm />
          }
        }
      }
      default:
        return null;
    }
  }

  render() {
    return (<>
      {this.renderHeader()}
      {this.renderForm()}
    </>);
  }
}

export default connect()(FilingScreen);

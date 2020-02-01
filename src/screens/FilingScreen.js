import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toTitleCase, getURLParam } from 'utils'
import moment from 'moment'

import { getFiling } from 'network/api';

import { SanFrancisco } from 'forms/filings'

import Card from 'react-bootstrap/Card';

class FilingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filing: null, due: null }
  }

  async componentDidMount() {
    console.log(getURLParam('due'))
    const filing = await getFiling(this.props.filingId);
    this.setState({ filing: filing, due: getURLParam('due') })

  }

  renderHeader = () => {
    const filing = this.state.filing
    const due = this.state.due
    if (!filing) return null;
    return (<div>
      <h2>{filing.name}</h2>
      <h5 className="mb-2 text-muted">
        {`${toTitleCase(filing.agency.name)} - ${filing.jurisdiction.name}`}
      </h5>
      {due != null ?
        (<h6 className="mb-2 text-muted">{`Due: ${moment(due).format('MMM Do, YYYY')}`}</h6>)
        : null
      }
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
      <Card style={{ marginTop: 24 }}>
        <Card.Body>
          {this.renderForm()}
        </Card.Body>
      </Card>
    </>);
  }
}

export default connect()(FilingScreen);

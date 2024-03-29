import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AdminFilingForm } from 'forms'
import {
  adminGetAgencies,
  adminGetJurisdictions,
  adminCreateFiling,
  adminGetFiling,
  adminUpdateFiling
} from 'network/api'


// import style from './AdminEditFilingSection.module.css'

class AdminEditFilingSection extends Component {
  constructor(props) {
    super(props);
    this.state = { jurisdictions: [], agencies: [], filing: null, status: null };
  }

  async componentDidMount() {
    try {
      let filing = null
      const agencies = await adminGetAgencies();
      const jurisdictions = await adminGetJurisdictions();

      if (this.props.filingId != null) {
        filing = await adminGetFiling(this.props.filingId)
      }

      this.setState({ agencies: agencies, jurisdictions: jurisdictions, filing: filing })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.filingId !== this.props.filingId) {
      const filing = await adminGetFiling(this.props.filingId)
      this.setState({ filing: filing })
    }
  }

  submitFiling = async (values) => {
    if (values.id) {
      this.setState({ status: 'updating...' })
      const filing = await adminUpdateFiling(values.id, values)
      this.setState({ status: null, filing: filing})
    } else {
      this.setState({ status: 'saving...' })
      const filing = await adminCreateFiling(values)
      navigate(`/admin/platform/filings/${filing.id}`)
    }
  }

  render() {
    return (
      <div>
        <h3>
          {this.state.filing != null ? 'Edit Filing' : 'Create Filing'}
        </h3>
        <AdminFilingForm
          status={this.state.status}
          handleSubmit={this.submitFiling}
          filing={this.state.filing}
          jurisdictions={this.state.jurisdictions}
          agencies={this.state.agencies} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // Note: the reducer has a 'filing' prop
  // this would overwrite the passed prop
  return {}
}

export default connect(mapStateToProps)(AdminEditFilingSection);

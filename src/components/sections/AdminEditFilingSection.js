import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AdminFilingForm } from 'forms'
import {
  adminGetAgencies,
  adminGetJurisdictions,
  adminCreateFiling
} from 'network/api'


import style from './AdminEditFilingSection.module.css'

class AdminEditFilingSection extends Component {
  constructor(props) {
    super(props);
    this.state = { jurisdictions: [], agencies: [] };
  }

  async componentDidMount() {
    try {
      const agencies = await adminGetAgencies();
      const jurisdictions = await adminGetJurisdictions();
      this.setState({ agencies: agencies, jurisdictions: jurisdictions })
    } catch (err) {
      console.log(err)
    }
  }

  submitFiling = async (values) => {
    console.log(values)
    if (values.id) {
      // we should update the filing here
    } else {
      const filing = await adminCreateFiling(values)
    }
  }

  render() {
    return (
      <div className={style.content}>
        <h3 className={style.title}>
          {this.props.filing != null ? 'Edit Filing' : 'Create Filing'}
        </h3>
        <AdminFilingForm
          handleSubmit={this.submitFiling}
          filing={this.props.filing}
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

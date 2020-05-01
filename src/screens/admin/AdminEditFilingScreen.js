import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { AdminFilingForm } from 'forms'
import {
  adminGetAgencies,
  adminGetJurisdictions,
  adminCreateFiling,
  adminGetFiling,
  adminUpdateFiling,
  adminDeleteFiling
} from 'network/api'

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';

import style from './AdminEditFilingScreen.module.css'

class AdminEditFilingScreen extends Component {
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

  deleteFiling = async () => {
    const x = window.confirm('Are you sure you want to delete this filing?')
    if(x) {
      await adminDeleteFiling(this.props.filingId)
      navigate('/admin/platform/filings')
    }
  }


  render() {
    const { filing } = this.state;

    return (
      <div className={style.container}>
        <div className={style.content}>
          <Breadcrumb>
            <Breadcrumb.Item href="/admin/platform/filings">Filings</Breadcrumb.Item>
            <Breadcrumb.Item active>{filing ? filing.name : 'new'}</Breadcrumb.Item>
          </Breadcrumb>
          <h3 className={style.title}>
            {this.state.filing != null ? 'Edit Filing' : 'Create Filing'}
          </h3>
          <AdminFilingForm
            status={this.state.status}
            handleSubmit={this.submitFiling}
            filing={this.state.filing}
            jurisdictions={this.state.jurisdictions}
            agencies={this.state.agencies} />
          <div>
            <Button onClick={this.deleteFiling} variant="danger">Delete Filing</Button>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // Note: the reducer has a 'filing' prop
  // this would overwrite the passed prop
  return {}
}

export default connect(mapStateToProps)(AdminEditFilingScreen);

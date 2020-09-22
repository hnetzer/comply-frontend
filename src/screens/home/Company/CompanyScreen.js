import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link } from '@reach/router'

import style from './CompanyScreen.module.scss'
import EditCompanyScreen from './General/EditCompanyScreen'
import EditAgenciesScreen from './Agencies/EditAgenciesScreen'
import EditOfficesScreen from './Offices/EditOfficesScreen'

import {
  setCompanyDetails,
  setCompanyOffices,
  setCompanyAgencies,
  setAgencies
} from 'actions'

import { getCompany, getAgencies, getCompanyAgencies } from 'network/api'

class CompanyScreen extends Component {

  async componentDidMount() {
    const { dispatch, companyId } = this.props;

    const company = await getCompany(companyId );
    dispatch(setCompanyDetails(company))
    dispatch(setCompanyOffices(company.offices))

    const companyAgencies = await getCompanyAgencies(companyId)
    dispatch(setCompanyAgencies(companyAgencies))

    const agencies = await getAgencies(companyId);
    dispatch(setAgencies(agencies))
  }

  getClassName = (paths) => {
    const pathname = window.location.pathname
    const match = paths.reduce((match, path) => {
      return (match || (path === pathname))
    }, false)

    if (match) {
      return style.linkSelected;
    }
    return style.link;
  }


  render() {
    const { user, companyId } = this.props;
    if (!user) return null;

    return(
      <section className={style.container}>
        <div className={style.content}>
          <div className={style.navCard}>
            <h5>Company</h5>
            <Link
              className={this.getClassName([`/company/${companyId}/company`, `/company/${companyId}/company/general`])}
              to={`/company/${companyId}/company/general`}
              disabled={false}>
              General
            </Link>
            <Link
              className={this.getClassName([`/company/${companyId}/company/offices`])}
              to={`/company/${companyId}/company/offices`}
              disabled={false}>
              Offices
            </Link>
            <Link
              className={this.getClassName([`/company/${companyId}/company/agencies`])}
              to={`/company/${companyId}/company/agencies`}
              disabled={false}>
              Agencies
            </Link>
          </div>
          <Router primary={false} style={{ width: '100%' }}>
            <EditCompanyScreen
              default
              companyId={companyId}
              path="/general" />
            <EditAgenciesScreen
              companyId={companyId}
              path="/agencies" />
            <EditOfficesScreen
              companyId={companyId}
              path="/offices" />
          </Router>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    company: state.auth.company,
  }
}

export default connect(mapStateToProps)(CompanyScreen);

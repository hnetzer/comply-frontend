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
  setCompanyAgencies
} from 'actions'

import { getCompany, getAgencies, getCompanyAgencies } from 'network/api'

class CompanyScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { agencies: null }
  }

  async componentDidMount() {
    const { user, dispatch } = this.props;

    const company = await getCompany(user.company_id);
    dispatch(setCompanyDetails(company))
    dispatch(setCompanyOffices(company.offices))

    const companyAgencies = await getCompanyAgencies(user.company_id)
    dispatch(setCompanyAgencies(companyAgencies))

    const agencies = await getAgencies(user.company_id);

    this.setState({
      agencies: agencies,
    })
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
    const { user } = this.props;
    if (!user) return null;
    const { agencies } = this.state;

    return(
      <section className={style.container}>
        <div className={style.content}>
          <div className={style.navCard}>
            <h5>Company</h5>
            <Link
              className={this.getClassName(["/home/company", "/home/company/general"])}
              to="/home/company/general"
              disabled={false}>
              General
            </Link>
            <Link
              className={this.getClassName(["/home/company/offices"])}
              to="/home/company/offices"
              disabled={false}>
              Offices
            </Link>
            <Link
              className={this.getClassName(["/home/company/agencies"])}
              to="/home/company/agencies"
              disabled={false}>
              Agencies
            </Link>
          </div>
          <Router primary={false} style={{ width: '100%' }}>
            <EditCompanyScreen
              default
              path="/general" />
            <EditAgenciesScreen
              path="/agencies"
              agencies={agencies} />
            <EditOfficesScreen
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

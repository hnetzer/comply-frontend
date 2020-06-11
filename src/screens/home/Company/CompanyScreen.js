import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link } from '@reach/router'

import style from './CompanyScreen.module.scss'
import EditCompanyScreen from './General/EditCompanyScreen'
import EditAgenciesScreen from './Agencies/EditAgenciesScreen'
import EditOfficesScreen from './Offices/EditOfficesScreen'

import { getCompany } from 'network/api'

class CompanyScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { company: null, offices: null }
  }

  async componentDidMount() {
    const company = await getCompany(this.props.user.company_id);
    this.setState({
      company: company,
      offices: company.offices,
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
            <EditCompanyScreen default path="/general" company={this.state.company} />
            <EditAgenciesScreen path="/agencies" />
            <EditOfficesScreen path="/offices" />
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

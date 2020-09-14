import React from 'react';
import { connect } from 'react-redux';
import { AdminCompanyFilingForm } from 'forms';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { adminGetCompany, adminGetCompanyFiling } from 'network/api';


import style from './AdminScreens.module.scss'

class AdminCompanyFilingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companyFiling: null, company: null };
  }

  async componentDidMount() {
    try {
      const company = await adminGetCompany(this.props.companyId)
      const companyFiling = await adminGetCompanyFiling(this.props.companyFilingId)
      this.setState({ companyFiling: companyFiling, company: company})

      console.log('company filing:', companyFiling)

    } catch (err) {
      console.log(err)
    }
  }


  render() {
    const { company, companyFiling } = this.state
    if (!company || !companyFiling) return null;

    return(
      <main className={style.container}>
        <section className={style.content}>
          <Breadcrumb>
            <Breadcrumb.Item href="/admin/companies">Companies</Breadcrumb.Item>
            <Breadcrumb.Item href={`/admin/companies/${company.id}`}>{company.name}</Breadcrumb.Item>
            <Breadcrumb.Item>Filings</Breadcrumb.Item>
            <Breadcrumb.Item href={`/admin/companies/${company.id}/filings/${companyFiling.id}`}>
              {companyFiling.filing.name}
            </Breadcrumb.Item>
          </Breadcrumb>
          <AdminCompanyFilingForm companyFiling={companyFiling} />
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(AdminCompanyFilingScreen);

import React from 'react';
import { Router } from "@reach/router"

import AdminCompanyFilingsScreen from './AdminCompanyFilingsScreen'
import AdminCompaniesScreen from './AdminCompaniesScreen'
import AdminJurisdictionsScreen from './AdminJurisdictionsScreen'
import AdminAgenciesScreen from './AdminAgenciesScreen'
import AdminFilingsScreen from './AdminFilingsScreen'

import { HeaderBar, AdminNavigation } from '../../components/organisms';

const AdminScreen  = () => {

  return(
    <div>
      <HeaderBar />
      <AdminNavigation />
      <Router>
        <AdminCompanyFilingsScreen path="/companyfilings" />
        <AdminCompaniesScreen path="/companies" />
        <AdminJurisdictionsScreen path="/platform/jurisdictions" />
        <AdminAgenciesScreen path="/platform/agencies" />
        <AdminFilingsScreen path="/platform/filings/*" />
      </Router>
    </div>
  )
}

export default AdminScreen;

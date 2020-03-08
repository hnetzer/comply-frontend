import React from 'react';
import { Router } from "@reach/router"

import AdminCompanyFilingsScreen from './AdminCompanyFilingsScreen'
import AdminCompaniesScreen from './AdminCompaniesScreen'
import AdminJurisdictionsScreen from './AdminJurisdictionsScreen'
import AdminAgenciesScreen from './AdminAgenciesScreen'

import { NavigationBar, AdminNavigation } from '../../components/organisms';

const AdminScreen  = () => {

  return(
    <div>
      <NavigationBar />
      <AdminNavigation />
      <Router>
        <AdminCompanyFilingsScreen path="/companyfilings" />
        <AdminCompaniesScreen path="/companies" />
        <AdminJurisdictionsScreen path="/platform/jurisdictions" />
        <AdminAgenciesScreen path="/platform/agencies" />
      </Router>
    </div>
  )
}

export default AdminScreen;

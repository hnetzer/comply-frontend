import React from 'react';
import { Router } from "@reach/router"

import AdminCompanyFilingsScreen from './AdminCompanyFilingsScreen'
import AdminCompaniesScreen from './AdminCompaniesScreen'
import AdminJurisdictionsScreen from './AdminJurisdictionsScreen'

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
      </Router>
    </div>
  )
}

export default AdminScreen;

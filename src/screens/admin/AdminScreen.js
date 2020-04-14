import React from 'react';
import { Router } from "@reach/router"

import AdminCompanyFilingsListScreen from './AdminCompanyFilingsListScreen'
import AdminCompanyFilingScreen from './AdminCompanyFilingScreen'
import AdminCompaniesScreen from './AdminCompaniesScreen'
import AdminCompanyScreen from './AdminCompanyScreen'
import AdminJurisdictionsScreen from './AdminJurisdictionsScreen'
import AdminAgenciesScreen from './AdminAgenciesScreen'
import AdminFilingsScreen from './AdminFilingsScreen'

import { AdminNavigation } from '../../components/organisms';

import styles from './AdminScreens.module.css'

const AdminScreen  = () => {

  return(
    <div className={styles.container}>
      <AdminNavigation />
      <main className={styles.main}>
        <Router style={{ width: '100%' }}>
          <AdminCompanyFilingsListScreen path="/" />
          <AdminCompanyFilingsListScreen path="/companyfilings" />
          <AdminCompanyFilingScreen path="/companyfilings/:companyFilingId" />
          <AdminCompaniesScreen path="/companies" />
          <AdminCompanyScreen path="/companies/:companyId" />
          <AdminJurisdictionsScreen path="/platform/jurisdictions" />
          <AdminAgenciesScreen path="/platform/agencies" />
          <AdminFilingsScreen path="/platform/filings/*" />
        </Router>
      </main>
    </div>
  )
}

export default AdminScreen;

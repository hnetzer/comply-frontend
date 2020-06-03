import React from 'react';
import { Router } from "@reach/router"

import AdminCompaniesScreen from './AdminCompaniesScreen'
import AdminCompanyScreen from './AdminCompanyScreen'
import AdminJurisdictionsScreen from './AdminJurisdictionsScreen'
import AdminAgenciesScreen from './AdminAgenciesScreen'
import AdminFilingsScreen from './AdminFilingsScreen'
import AdminEditFilingScreen from './AdminEditFilingScreen'

import { AdminNavigation } from '../../components/organisms';

import styles from './AdminScreens.module.scss'

const AdminScreen  = () => {

  return(
    <div className={styles.page}>
      <AdminNavigation />
      <main className={styles.main}>
        <Router style={{ width: '100%' }}>
          <AdminCompaniesScreen path="/" />
          <AdminCompaniesScreen path="/companies" />
          <AdminCompanyScreen path="/companies/:companyId" />
          <AdminJurisdictionsScreen path="/platform/jurisdictions" />
          <AdminAgenciesScreen path="/platform/agencies" />
          <AdminFilingsScreen path="/platform/filings" />
          <AdminEditFilingScreen path="/platform/filings/:filingId" />
          <AdminEditFilingScreen path="/platform/filings/new" />
        </Router>
      </main>
    </div>
  )
}

export default AdminScreen;

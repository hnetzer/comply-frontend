import React from 'react';
import { Router } from "@reach/router"

import AdminCompanyFilingsScreen from './AdminCompanyFilingsScreen'
import AdminCompaniesScreen from './AdminCompaniesScreen'
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
          <AdminCompanyFilingsScreen path="/" />
          <AdminCompanyFilingsScreen path="/companyfilings" />
          <AdminCompaniesScreen path="/companies" />
          <AdminJurisdictionsScreen path="/platform/jurisdictions" />
          <AdminAgenciesScreen path="/platform/agencies" />
          <AdminFilingsScreen path="/platform/filings/*" />
        </Router>
      </main>
    </div>
  )
}

export default AdminScreen;

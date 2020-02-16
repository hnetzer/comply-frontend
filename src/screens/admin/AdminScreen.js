import React from 'react';
import { Router } from "@reach/router"

import AdminFilingsScreen from './AdminFilingsScreen'

import { NavigationBar, AdminNavigation } from '../../components/organisms';

const AdminScreen  = () => {

  return(
    <div>
      <NavigationBar />
      <AdminNavigation />
      <main style={{ width: '100%', display: 'flex' }}>
        <Router>
          <AdminFilingsScreen path="/filings" />
        </Router>
      </main>
    </div>
  )
}

export default AdminScreen;

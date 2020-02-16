import React from 'react';
import { Router } from "@reach/router"

import AdminFilingsScreen from './AdminFilingsScreen'

import { NavigationBar, AdminNavigation } from '../../components/organisms';

const AdminScreen  = () => {

  return(
    <div>
      <NavigationBar />
      <AdminNavigation />
      <Router>
        <AdminFilingsScreen path="/filings" />
      </Router>
    </div>
  )
}

export default AdminScreen;

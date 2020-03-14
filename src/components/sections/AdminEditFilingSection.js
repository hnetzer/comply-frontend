import React, { useState } from 'react';
import { connect } from 'react-redux';

import style from './AdminEditFilingSection.module.css'

import { AdminFilingForm } from 'forms'

const AdminEditFilingSection = ({ filing }) => {

  console.log('AdminEditFilingSection ')
  console.log(filing)

  return (
    <div className={style.content}>
      <h2>{filing != null ? 'Edit Filing' : 'Create Filing'}</h2>
      <AdminFilingForm filing={filing} />
    </div>
  )
}

const mapStateToProps = (state) => {
  // Note: the reducer has a 'filing' prop
  // this would overwrite the passed prop
  return {}
}

export default connect(mapStateToProps)(AdminEditFilingSection);

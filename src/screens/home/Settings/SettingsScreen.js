import React from 'react';
import { connect } from 'react-redux';

import style from './SettingsScreen.module.scss'
import { Card, Divider } from 'components/atoms'
import { AccountSettingsForm } from 'forms'

import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SettingsScreen = () => {
  return (
    <section className={style.container}>
      <Card style={{ width: '100%', flexDirection: 'column'}}>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <FontAwesomeIcon className={style.cogsIcon} icon={faCogs} />
          <h2>Settings</h2>
        </div>
        <Divider />
        <div style={{ marginTop: 40, width: '100%' }}>
          <AccountSettingsForm />
        </div>
      </Card>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}


export default connect(mapStateToProps)(SettingsScreen);

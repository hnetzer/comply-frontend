import React, { useState } from 'react';
import { connect } from 'react-redux';

import style from './SettingsScreen.module.scss'
import { Card, Divider, Alert } from 'components/atoms'
import { UserSettingsForm } from 'forms'

import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SettingsScreen = () => {
  const [saved, setSaved] = useState(false)

  const onSuccess = async () => {
    setSaved(true)
  }

  const onError = () => {

  }

  return (
    <section className={style.container}>
      <Card style={{ width: '100%', flexDirection: 'column'}}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon className={style.cogsIcon} icon={faCogs} />
            <h2>Settings</h2>
          </div>
          <div style={{ width: 300 }}>
            <Alert
              show={saved}
              onDismiss={() => setSaved(false)}>
              Saved successfully
            </Alert>
          </div>
        </div>
        <Divider />
        <div style={{ marginTop: 40, width: '100%' }}>
          <UserSettingsForm
            onSuccess={onSuccess}
            onError={onError}
          />
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

import React from 'react';

import { HeaderBar } from 'components/organisms'
import style from './Screens.module.scss'

const DashboardScreen = (props) => {

  return(
    <>
      <HeaderBar title="Home"/>
      <section className={style.container}>
        <div className={style.content}>
        </div>
      </section>
    </>
  )
}

export default DashboardScreen;

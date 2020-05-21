import React from 'react';

import style from './SideNavigation.module.scss';

import { faFileAlt, faHome, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideNavigation = () => {
  return (
    <section className={style.sidebar}>
      <div className={style.nav}>
        <a className={style.navLink} href="/home">
          <div className={style.navIconContainer}>
            <FontAwesomeIcon icon={faCalendarAlt}/>
          </div>
          <span>Dashboard</span>
        </a>
        <a className={style.navLink} href="/home/filings">
          <div className={style.navIconContainer}>
            <FontAwesomeIcon icon={faFileAlt}/>
          </div>
          <span>Filings</span>
        </a>
        <a className={style.navLink} href="/home/company">
          <div className={style.navIconContainer}>
            <FontAwesomeIcon icon={faHome}/>
          </div>
          <span>Company</span>
        </a>
      </div>
    </section>
  )
}

export default SideNavigation;

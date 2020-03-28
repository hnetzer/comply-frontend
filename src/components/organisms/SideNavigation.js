import React from 'react';

import Nav from 'react-bootstrap/Nav'
import style from './SideNavigation.module.scss';

import { faBuilding, faFileAlt, faLandmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideNavigation = ({ companyName }) => {
  return (
    <section className={style.sidebar}>
      <header className={style.logoHeader}>
        <a className={style.logoLink} href="/home">Comply</a>
      </header>
      <div className={style.divider} />
      <div className={style.companyNameContainer}>
        <div className={style.companyName}>
          <FontAwesomeIcon className={style.navIcon} icon={faBuilding}/>
          <span>{companyName}</span>
        </div>
      </div>
      <div className={style.divider} />
      <Nav defaultActiveKey="/home" className={style.nav}>
        <Nav.Link className={style.navLink} href="/home/filings">
          <FontAwesomeIcon className={style.navIcon} icon={faFileAlt}/>
          <span>Filings</span>
        </Nav.Link>
        <Nav.Link className={style.navLink} href="/home/agencies">
          <FontAwesomeIcon className={style.navIcon} icon={faLandmark}/>
          <span>Agencies</span>
        </Nav.Link>
      </Nav>
    </section>
  )
}

export default SideNavigation;

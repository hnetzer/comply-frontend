import React from 'react';

import Nav from 'react-bootstrap/Nav'
import style from './SideNavigation.module.scss';

import { faBuilding, faFileAlt, faLandmark, faHome } from "@fortawesome/free-solid-svg-icons";
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
          <div className={style.navIconContainer}>
            <FontAwesomeIcon icon={faBuilding}/>
          </div>
          <span>{companyName}</span>
        </div>
      </div>
      <div className={style.divider} />
      <Nav defaultActiveKey="/home" className={style.nav}>
        <Nav.Link className={style.navLink} href="/home">
          <div className={style.navIconContainer}>
            <FontAwesomeIcon className={style.navIcon} icon={faHome}/>
          </div>
          <span>Home</span>
        </Nav.Link>
        <Nav.Link className={style.navLink} href="/home/filings">
          <div className={style.navIconContainer}>
            <FontAwesomeIcon className={style.navIcon} icon={faFileAlt}/>
          </div>
          <span>Filings</span>
        </Nav.Link>
        <Nav.Link className={style.navLink} href="/home/agencies">
          <div className={style.navIconContainer}>
            <FontAwesomeIcon className={style.navIcon} icon={faLandmark}/>
          </div>
          <span>Agencies</span>
        </Nav.Link>
      </Nav>
    </section>
  )
}

export default SideNavigation;

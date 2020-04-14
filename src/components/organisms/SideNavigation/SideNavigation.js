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
      <Nav defaultActiveKey="/home" className={style.nav}>
        <div className={style.divider} />
        <Nav.Link className={style.navLink} href="/home/company">
          <div className={style.companyIconContainer}>
            <FontAwesomeIcon icon={faBuilding}/>
          </div>
          <span className={style.companyName}>{companyName}</span>
        </Nav.Link>
        <div className={style.divider} />
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

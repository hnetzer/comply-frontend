import React from 'react';
import styles from './SubNav.module.scss';

const SubNav = () => {
  return (
    <div className={styles.subNav}>
      <a className={styles.navLink} href="/home">
        Dashboard
      </a>
      <a className={styles.navLink} href="/home/company">
        Company
      </a>
      <a className={styles.navLink} href="/home/company">
        Guide to Filing
      </a>
      <a className={styles.navLink} href="/home/company">
        FAQs
      </a>
    </div>
  )
}

export default SubNav;

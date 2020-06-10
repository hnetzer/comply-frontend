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
      <a className={styles.navLink} href="/home/guide">
        Guide to Filing
      </a>
      <a className={styles.navLink} href="/home/faqs">
        FAQs
      </a>
    </div>
  )
}

export default SubNav;

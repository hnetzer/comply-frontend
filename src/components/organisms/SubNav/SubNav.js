import React from 'react';
import { Link } from '@reach/router'
import styles from './SubNav.module.scss';

const SubNav = ({ location }) => {
  console.log('subnav', location)
  return (
    <div className={styles.subNav}>
      <Link className={styles.navLink} to="/home">
        Dashboard
      </Link>
      <Link className={styles.navLink} to="/home/company">
        Company
      </Link>
      <Link className={styles.navLink} to="/home/guide">
        Guide to Filing
      </Link>
      <Link className={styles.navLink} to="/home/faqs">
        FAQs
      </Link>
    </div>
  )
}

export default SubNav;

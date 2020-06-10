import React from 'react';
import { Link } from '@reach/router'
import styles from './SubNav.module.scss';

const SubNav = ({ location }) => {
  const pathname = window.location.pathname

  const getClassName = (path) => {
    if (path === pathname) {
      return styles.navLinkSelected
    }
    return styles.navLink
  }

  return (
    <div className={styles.subNav}>
      <Link className={getClassName("/home")} to="/home">
        Dashboard
      </Link>
      <Link className={getClassName("/home/company")} to="/home/company">
        Company
      </Link>
      <Link className={getClassName("/home/guide")} to="/home/guide">
        Guide to Filing
      </Link>
      <Link className={getClassName("/home/faqs")} to="/home/faqs">
        FAQs
      </Link>
    </div>
  )
}

export default SubNav;

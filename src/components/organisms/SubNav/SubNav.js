import React from 'react';
import { Link } from '@reach/router'
import styles from './SubNav.module.scss';

const SubNav = ({ location }) => {
  const pathname = window.location.pathname

  const getClassName = (paths) => {
    const match = paths.reduce((match, path) => {
      return (match || (path === pathname))
    }, false)

    if (match) {
      return styles.navLinkSelected
    }
    return styles.navLink
  }

  return (
    <div className={styles.subNav}>
      <Link
        className={getClassName(["/home"])}
        to="/home">
        Dashboard
      </Link>
      <Link
        className={getClassName([
          "/home/company",
          "/home/company/general",
          "/home/company/offices",
          "/home/company/agencies"
        ])}
        to="/home/company">
        Company
      </Link>
      <Link
        className={getClassName(["/home/guide"])}
        to="/home/guide">
        Guide to Filing
      </Link>
      <Link
        className={getClassName(["/home/faqs"])}
        to="/home/faqs">
        FAQs
      </Link>
    </div>
  )
}

export default SubNav;

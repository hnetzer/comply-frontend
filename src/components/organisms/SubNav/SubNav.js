import React from 'react';
import { Link } from '@reach/router'
import styles from './SubNav.module.scss';

const SubNav = ({ location, companyId }) => {
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
        className={getClassName([`/company/${companyId}`])}
        to={`/company/${companyId}`}>
        Dashboard
      </Link>
      <Link
        className={getClassName([`/company/${companyId}/filings`])}
        to={`/company/${companyId}/filings`}>
        Filings
      </Link>
      <Link
        className={getClassName([
          `/company/${companyId}/company`,
          `/company/${companyId}/company/general`,
          `/company/${companyId}/company/offices`,
          `/company/${companyId}/company/agencies`
        ])}
        to={`/company/${companyId}/company`}>
        Company
      </Link>
      <Link
        className={getClassName([`/company/${companyId}/guide`])}
        to={`/company/${companyId}/guide`}>
        Guide to Filing
      </Link>
      <Link
        className={getClassName([`/company/${companyId}/faqs`])}
        to={`/company/${companyId}/faqs`}>
        FAQs
      </Link>
    </div>
  )
}

export default SubNav;

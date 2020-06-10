import React from 'react';
import { connect } from 'react-redux';
import { Link } from '@reach/router'

import style from './CompanyScreen.module.scss'
import { Card } from 'components/atoms'

const CompanyScreen = (props) => {

  return(
    <section className={style.container}>
      <div className={style.content}>
        <div className={style.navCard}>
          <h5>Company details</h5>
          <Link
            className={style.link}
            to="/home/company/general"
            disabled={false}>
            General
          </Link>
          <Link
            className={style.link}
            to="/home/company/offices"
            disabled={false}>
            Offices
          </Link>
          <Link
            className={style.link}
            to="/home/company/agencies"
            disabled={false}>
            Agencies
          </Link>
        </div>
        <Card className={style.mainContent}>

        </Card>
      </div>
    </section>
  )
}

export default connect()(CompanyScreen);

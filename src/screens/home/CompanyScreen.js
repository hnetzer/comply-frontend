import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import Table from 'react-bootstrap/Table'

import { HeaderBar } from 'components/organisms'
import style from './Screens.module.scss'

const CompanyScreen = (props) => {
  const getYearEnd = (m, d) => {
    const month = moment().month(m).format('MMMM');
    return `${month} ${d}`;
  }

  const renderDetailsTable = () => {
    if (!props.company) return null;
    const {
      name,
      phone,
      type,
      tax_class,
      year_end_month,
      year_end_day
    } = props.company;

    return (
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{type}</td>
          </tr>
          <tr>
            <td>Tax Class</td>
            <td>{tax_class}</td>
          </tr>
          <tr>
            <td>Financial Year End</td>
            <td>{getYearEnd(year_end_month, year_end_day)}</td>
          </tr>
        </tbody>
      </Table>
    )
  }

  return(
    <>
      <HeaderBar title="Filings"/>
      <section className={style.container}>
        <div className={style.content}>
          {renderDetailsTable()}
        </div>
      </section>
    </>
  )
}

export default connect()(CompanyScreen);

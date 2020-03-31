import React from 'react';
import { connect } from 'react-redux';

import { getCompanyAgencies } from 'network/api';

import Table from 'react-bootstrap/Table'
import { toTitleCase } from 'utils';

import { HeaderBar } from 'components/organisms'
import style from './Screens.module.scss'

class AgenciesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { agencies: []}
  }


  async componentDidMount() {
    try {
      const agencies = await getCompanyAgencies(this.props.user.company_id)
      this.setState({ agencies: agencies })
    } catch (err) {
    }
  }

  renderAgenciesTable = () => {
    console.log(this.props.agencies)
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Agency</th>
            <th>Jurisdiction</th>
            <th>Reg Date</th>
          </tr>
        </thead>
        <tbody>
          {this.state.agencies.map((a,i) => (
            <tr key={i}>
                <td>{toTitleCase(a.name)}</td>
                <td>{a.jurisdiction}</td>
                <td>{a.registration}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }


  render() {
    return(
      <>
        <HeaderBar title="Agencies"/>
        <section className={style.container}>
          <div className={style.content}>
          {this.renderAgenciesTable()}
          </div>
        </section>
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.auth.user,
    agencies: state.company.agencies,
  }
}

export default connect(mapStateToProps)(AgenciesScreen);

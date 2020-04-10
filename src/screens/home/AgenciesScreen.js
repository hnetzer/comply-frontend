import React from 'react';
import { connect } from 'react-redux';

import { getCompanyAgencies, updateCompanyAgency } from 'network/api';
import { setAgencies } from 'actions';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toTitleCase } from 'utils';

import { DatePicker } from 'components/molecules';
import { HeaderBar } from 'components/organisms'

import screenStyle from './Screens.module.scss'


class AgenciesScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeEdit: null,
      agencies: []
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.showDatepicker = this.showDatepicker.bind(this);
  }


  async componentDidMount() {
    try {
      const agencies = await getCompanyAgencies(this.props.user.company_id)
      this.setState({ agencies: agencies })
    } catch (err) {
      console.warn(err)
    }
  }

  async componentDidUpdate() {
    try {
      const agencies = await getCompanyAgencies(this.props.user.company_id)
      this.setState({ agencies: agencies })
    } catch (err) {
      console.warn(err)
    }
  }

  showDatepicker(agencyId) {
    this.setState({activeEdit: agencyId})
  }

  handleDateChange(agencyId, selectedDate){
    updateCompanyAgency({registration: selectedDate}, this.props.user.company_id, agencyId)
    this.setState({activeEdit: null})
  }

  renderAgenciesTable = () => {
    console.log(this.props.agencies)
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Agency</th>
            <th>Jurisdiction</th>
            <th>What's your registration date?</th>
          </tr>
        </thead>
        <tbody>
          {this.state.agencies.map((a,i) => {
            let regDate;
            if (a.registration) {
              regDate = new Date(a.registration)
              regDate.setDate(regDate.getDate() + 1);
            }
            return (
            <tr key={i}>
                <td>{toTitleCase(a.name)}</td>
                <td>{a.jurisdiction}</td>
                <td>
                  { a.registration && this.state.activeEdit !== a.agency_id ?
                    a.registration :
                    null
                  }
                  { this.state.activeEdit === a.agency_id ?
                      <DatePicker onChange={this.handleDateChange} agencyId={a.agency_id} date={regDate} />
                      :
                      <Button variant="link" onClick={() => this.showDatepicker(a.agency_id)}>Add/Edit date</Button>
                  }
                </td>
            </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }


  render() {
    return(
      <>
        <HeaderBar title="Agencies"/>
        <section className={screenStyle.container}>
          <div className={screenStyle.content}>
          {this.renderAgenciesTable()}
          </div>
        </section>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    agencies: state.company.agencies,
  }
}

export default connect(mapStateToProps)(AgenciesScreen);

import React from 'react';
import { connect } from 'react-redux';

import { getCompanyAgencies, updateCompanyAgency } from 'network/api';
import { setAgencies } from 'actions';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toTitleCase } from 'utils';

import { DatePicker } from '../../components/molecules';

class AgenciesScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeEdit: null
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.showDatepicker = this.showDatepicker.bind(this);
  }

  async componentDidMount() {
    try {
      const agencies = await getCompanyAgencies(this.props.user.company_id)
      this.props.dispatch(setAgencies(agencies))
    } catch (err) {
      console.warn(err)
    }
  }

  async componentDidUpdate() {
    try {
      const agencies = await getCompanyAgencies(this.props.user.company_id)
      this.props.dispatch(setAgencies(agencies))
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
          {this.props.agencies.map((a,i) => {
            let regDate;
            if (a.registration) {
              regDate = new Date(a.registration)
              regDate.setDate(regDate.getDate() + 1);
            }
            return (
            <tr className="agency-row" key={i}>
                <td>{toTitleCase(a.name)}</td>
                <td>{a.jurisdiction}</td>
                <td className="td-reg-date">
                  { a.registration && this.state.activeEdit !== a.agency_id ?
                    a.registration : 
                    null
                  }
                  { this.state.activeEdit === a.agency_id ? 
                      <DatePicker onChange={this.handleDateChange} agencyId={a.agency_id} date={regDate} /> 
                      :
                      <Button className="edit-date-btn" variant="link" onClick={() => this.showDatepicker(a.agency_id)}>Add/Edit date</Button>
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
      <div>
        <div className="agency-table-header">
          <h2>Agencies</h2>
        </div>
        <div>
          {this.renderAgenciesTable()}
        </div>
      </div>
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

import React from 'react';
import { connect } from 'react-redux';

import { getCompanyAgencies, updateCompanyAgency } from 'network/api';
import { setAgencies } from 'actions';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toTitleCase } from 'utils';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RegistrationDatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startDate: props.date ? props.date : new Date()
    }
    this.handleChange = this.handleChange.bind(this);
  }

 
  handleChange(date){
    this.setState({
      startDate: date
    });
    return this.props.onChange(this.props.agencyId, date)
  };
 
  render() {
    return (
      <DatePicker
        showMonthDropdown
        showYearDropdown
        placeholderText="Click to select a date"
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

class AgenciesScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeEdits: [],
      editLog: {},

    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.showDatepicker = this.showDatepicker.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  unsavedChanges(){
    return this.state.activeEdits.length && Object.keys(this.state.editLog).length;
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
    this.setState({activeEdits: [...this.state.activeEdits, agencyId]})
  }

  handleDateChange(agencyId, selectedDate){
    this.setState({
      editLog: {...this.state.editLog, [agencyId]: selectedDate},
    })
  }

  saveChanges = async () => {
    await Promise.all(Object.entries(this.state.editLog).map(([agencyId, newRegDate]) => {
      updateCompanyAgency({registration: newRegDate}, this.props.user.company_id, agencyId)
    }))

    return this.setState({
      activeEdits: [],
      editLog: {},
    })
  }

  renderAgenciesTable = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Agency</th>
            <th>Jurisdiction</th>
            <th>Registration Date</th>
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
                  { a.registration && !this.state.activeEdits.includes(a.agency_id) ?
                    a.registration : 
                    null
                  }
                  { this.state.activeEdits.includes(a.agency_id) ? 
                      <RegistrationDatePicker onChange={this.handleDateChange} agencyId={a.agency_id} date={regDate} /> 
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
          {this.unsavedChanges() ? <div>Your changes have not been saved.</div> : null}
        </div>
        <div>
          {this.renderAgenciesTable()}
        </div>
        {this.unsavedChanges() ? <Button className="save-changes-btn" onClick={this.saveChanges}>Save Changes</Button> : null}
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

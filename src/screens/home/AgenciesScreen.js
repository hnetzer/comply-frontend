import React from 'react';
import { connect } from 'react-redux';

import { getCompanyAgencies } from 'network/api';
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
  };
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

class AgenciesScreen extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      activeEdits: []
    }

    this.showDatepicker = this.showDatepicker.bind(this);
  }

  async componentDidMount() {
    try {
      const agencies = await getCompanyAgencies(this.props.user.company_id)
      console.log(agencies)
      this.props.dispatch(setAgencies(agencies))
    } catch (err) {
    }
  }

  showDatepicker(agencyId) {
    this.setState({activeEdits: [...this.state.activeEdits, agencyId]})
    console.log('hello', agencyId)
  }

  renderAgenciesTable = () => {
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
          {this.props.agencies.map((a,i) => (
            <tr key={i}>
                <td>{toTitleCase(a.name)}</td>
                <td>{a.jurisdiction}</td>
                <td>
                  { a.registration ?
                    a.registration : 
                    null
                  }
                  { this.state.activeEdits.includes(a.agency_id) ? 
                      <RegistrationDatePicker date={a.registration} /> 
                      :
                      <Button variant="link" onClick={() => this.showDatepicker(a.agency_id)}>Add/Edit date</Button>
                  }
                  
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }


  render() {
    return(
      <div>
        <h2>Agencies</h2>
        {this.renderAgenciesTable()}
      </div>
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

import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RegDatePicker extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        startDate: props.date ? props.date : new Date()
      }
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange = (date) => {
      this.setState({
        startDate: date
      });
      this.props.onChange(this.props.agencyId, date)
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

  export default RegDatePicker;
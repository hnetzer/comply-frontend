import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import { getCompanyFilings } from 'network/api';

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// Maybe this should just be a functional component?
class FilingsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filings: [] };
  }

  toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  async componentDidMount() {
    try {
      const filings = await getCompanyFilings(this.props.user.company_id)
      this.setState({ filings: filings })
    } catch (err) {
    }
  }

  compareFilingsByDue = (a, b) => {
    if (a.due == null && b.due == null) {
      return 0
    } else if (a.due != null && b.due == null) {
      return 1
    } else if (a.due == null && b.due != null) {
      return -1
    }

    const dueA = moment(a.due).unix()
    const dueB = moment(b.due).unix()

    if (dueA > dueB) {
      return 1
    } else if (dueA < dueB) {
      return -1
    }
    return 0
  }

  renderDueDate = (due) => {
    if (!due) {
      return (<FontAwesomeIcon size="lg" color="#dc3545" icon={faExclamationCircle}/>)
    }
    return (
      <Card.Subtitle className="mb-2 text-muted">
        {`${moment(due).format("MMM Do, YYYY")}`}
      </Card.Subtitle>
    )
  }

  renderCTA = (due) => {
    return due != null ?
      (<Button variant="outline-primary">Initialize Filing</Button>) :
      (<Button style={{ color: '#dc3545'}} variant="link">Add Registration Info ></Button>);
  }

  renderFilings = () => {
    const sortedFilings = this.state.filings.sort(this.compareFilingsByDue)

    return sortedFilings.map((filing, index) => (
      <Card key={index} style={{ marginBottom: 16, width: 600 }}>
        <Card.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <Card.Title>{filing.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{this.toTitleCase(filing.agency.name)}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{filing.agency.jurisdiction.name}</Card.Subtitle>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            {this.renderDueDate(filing.due)}
            {this.renderCTA(filing.due)}
          </div>
        </Card.Body>
      </Card>
    ))

  }

  render() {
    return(
      <div>
        <h2>Filing Schedule</h2>
        {
          this.renderFilings()
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(FilingsListScreen);

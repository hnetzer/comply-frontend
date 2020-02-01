import React from 'react';
import { connect } from 'react-redux';
import { toTitleCase, getURLParam } from 'utils'
import moment from 'moment'

import { getFiling, createCompanyFiling } from 'network/api';

import { SanFrancisco } from 'forms/filings'

import Card from 'react-bootstrap/Card';

class FilingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filing: null, due: null }
  }

  async componentDidMount() {
    console.log(getURLParam('due'))
    const filing = await getFiling(this.props.filingId);
    this.setState({ filing: filing, due: getURLParam('due') })
  }

  handleSubmit = async (values) => {
    try {
      const data = { field_data: values, status: 'draft' };
      const companyId = this.props.user.company_id;
      const filingId = this.props.filingId;
      console.log(data)
      console.log(companyId)
      console.log(filingId)
      await createCompanyFiling(companyId, filingId, data);
    } catch (err) {
      console.log(err)
    }
  }

  renderHeader = () => {
    const filing = this.state.filing
    const due = this.state.due
    if (!filing) return null;
    return (<div>
      <h2>{filing.name}</h2>
      <h5 className="mb-2 text-muted">
        {`${toTitleCase(filing.agency.name)} - ${filing.jurisdiction.name}`}
      </h5>
      {due != null ?
        (<h6 className="mb-2 text-muted">{`Due: ${moment(due).format('MMM Do, YYYY')}`}</h6>)
        : null
      }
    </div>)
  }

  renderForm = () => {
    const filing = this.state.filing
    if (!filing) return null;

    switch (filing.jurisdiction.name.toLowerCase()) {
      case 'san francisco': {
        switch (filing.agency.name.toLowerCase()) {
          case 'tax and treasurer': {
            return (<SanFrancisco.TaxAndTreasurer.BusinessLicenseForm
              initialValues={{}}
              handleSubmit={this.handleSubmit}
              error={null}/>)
          }
        }
      }
      default:
        return null;
    }
  }

  render() {
    return (<>
      {this.renderHeader()}
      <Card style={{ marginTop: 24 }}>
        <Card.Body>
          {this.renderForm()}
        </Card.Body>
      </Card>
    </>);
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(FilingScreen);

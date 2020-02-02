import React from 'react';
import { navigate } from "@reach/router"
import { connect } from 'react-redux';

import { toTitleCase, getURLParam } from 'utils'
import moment from 'moment'

import { getFiling, createCompanyFiling, getCompanyFiling } from 'network/api';

import { SanFrancisco } from 'forms/filings'

import Card from 'react-bootstrap/Card';

class FilingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filing: null, due: null, initialValues: null }
  }

  async componentDidMount() {
    // Filing hasn't been started yet
    if (getURLParam('filingId')) {
      const filingId = getURLParam('filingId')
      const due = getURLParam('due')
      const filing = await getFiling(filingId);
      this.setState({ filing: filing, due: getURLParam('due'), initialValues: null })
    }

    // Filing has been started
    if (this.props.companyFilingId) {
      const { user, companyFilingId } = this.props
      const companyFiling = await getCompanyFiling(user.company_id, companyFilingId)
      const { filing, due_date, field_data } = companyFiling
      this.setState({ filing: filing, due: due_date, initialValues: field_data })
    }
  }

  handleSubmit = async (values) => {
    try {
      const data = {
        field_data: values,
        status: 'draft',
        due_date: this.state.due,
        filing_id: this.state.filing.id
      };
      const { user, filingId } = this.props
      const companyFiling = await createCompanyFiling(user.company_id, filingId, data);
      navigate(`/home/filings/${companyFiling.id}`)
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
              initialValues={this.state.initialValues}
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

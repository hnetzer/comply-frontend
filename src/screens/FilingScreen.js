import React from 'react';
import { navigate } from "@reach/router"
import { connect } from 'react-redux';

import { toTitleCase, getURLParam } from 'utils'
import moment from 'moment'

import {
  getFiling,
  createCompanyFiling,
  getCompanyFiling,
  updateCompanyFiling
} from 'network/api';

import { SanFrancisco } from 'forms/filings'

import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

class FilingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filing: null, due: null, companyFiling: null }
  }

  async componentDidMount() {
    // Filing hasn't been started yet
    if (getURLParam('filingId')) {
      console.log('new filing')
      const filingId = getURLParam('filingId')
      const due = getURLParam('due')
      const filing = await getFiling(filingId);
      this.setState({ filing: filing, due: getURLParam('due'), initialValues: null })
    }

    // Filing has been started
    if (this.props.companyFilingId) {
      console.log('existing filing')
      const { user, companyFilingId } = this.props
      const companyFiling = await getCompanyFiling(user.company_id, companyFilingId)
      const { filing, due_date, field_data } = companyFiling
      this.setState({ filing: filing, due: due_date, companyFiling: companyFiling })
    }
  }

  handleSubmit = async (values, status) => {
    try {
      const { filing, companyFiling } = this.state
      // Saving or submitting the first setDraft
      if (!companyFiling) {
        this.createFiling(values, status)
      }
      // Updating an existing filing
      if (companyFiling) {
        this.updateFiling(values, status)
      }
    } catch (err) {
      console.log(err)
    }
  }

  createFiling = async (values, status) => {
    const { user } = this.props
    const { due, filing } = this.state
    const data = {
      field_data: values,
      status: status,
      due_date: due,
      filing_id: filing.id
    };
    const filingId = getURLParam('filingId')
    const companyFiling = await createCompanyFiling(user.company_id, filingId, data);
    navigate(`/home/filings/${companyFiling.id}`)
    alert('created filing successfully')
  }

  updateFiling = async (values, status) => {
    const { user } = this.props
    const { filing, companyFiling } = this.state
    const data = {
      field_data: values,
      status: status,
      due_date: companyFiling.due,
      filing_id: filing.id
    };

    const update = await updateCompanyFiling(user.company_id, companyFiling.id, data);
    alert('updated filing successfully')
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
              initialValues={this.state.companyFiling.field_data}
              handleSubmit={this.handleSubmit}
              error={null}/>)
          }
        }
      }
      default:
        return null;
    }
  }

  renderBreadcrumb = () => {
    const  { filing } = this.state
    if (!filing) return null;
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/home/filings">Filings</Breadcrumb.Item>
        <Breadcrumb.Item active>{filing.name}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  render() {
    return (<>
      {this.renderBreadcrumb()}
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

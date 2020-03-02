import React from 'react';
import { navigate } from "@reach/router"
import { connect } from 'react-redux';

import { toTitleCase, getURLParam } from 'utils'

import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card';

import {
  getFiling,
  createCompanyFiling,
  getCompanyFiling,
  updateCompanyFiling,
  getCompanyFilingMessages
} from 'network/api';

import { FilingHeader, FilingDataList, FilingAlertMessage } from 'components/molecules'
import { SanFrancisco } from 'forms/filings'

import Breadcrumb from 'react-bootstrap/Breadcrumb'

class FilingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filing: null,
      due: null,
      companyFiling: null,
      status: null,
      alert: null,
    }
  }

  async componentDidMount() {
    // Filing hasn't been started yet
    if (getURLParam('filingId')) {
      const filingId = getURLParam('filingId')
      const due = getURLParam('due')
      const filing = await getFiling(filingId);
      this.setState({ filing: filing, due: due })
    }

    // Filing has been started
    if (this.props.companyFilingId) {
      const { user, companyFilingId } = this.props
      const companyFiling = await getCompanyFiling(user.company_id, companyFilingId)
      const messages = await getCompanyFilingMessages(user.company_id, companyFilingId)
      const { filing, due_date, status } = companyFiling
      this.setState({
        filing: filing,
        due: due_date,
        companyFiling: companyFiling,
        status: status,
        messages: messages
      })
    }
  }

  handleSubmit = async (values, status) => {
    try {
      const { companyFiling } = this.state
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

  createFiling = async (values, formStatus) => {
    const { user } = this.props
    const { due, filing } = this.state
    const data = {
      field_data: values,
      status: formStatus,
      due_date: due,
      filing_id: filing.id
    };
    const filingId = getURLParam('filingId')
    const companyFiling = await createCompanyFiling(user.company_id, filingId, data);
    const { status } = companyFiling

    this.setState({
      companyFiling: companyFiling,
      status: status,
    })

    navigate(`/home/filings/${companyFiling.id}`)
  }

  updateFiling = async (values, status) => {
    const { user } = this.props
    const { filing, due, companyFiling } = this.state
    const data = {
      field_data: values,
      status: status,
      due_date: due,
      filing_id: filing.id
    };

    const updated = await updateCompanyFiling(user.company_id, companyFiling.id, data);
    this.setState({ status: updated.status });
  }

  formNotSupported = () => (<div>
    <h6>This filing is not supported yet.</h6>
    <p>We are working to support more filings.</p>
  </div>)

  renderForm = () => {
    const { filing, companyFiling } = this.state
    const { jurisdiction, agency, name } = filing;

    let form = this.formNotSupported();
    if (jurisdiction.name.toLowerCase() === 'san francisco' &&
        agency.name.toLowerCase() === 'tax and treasurer' &&
        name.toLowerCase() === 'business license') {
      form = (<SanFrancisco.TaxAndTreasurer.BusinessLicenseForm
        initialValues={companyFiling != null ? companyFiling.field_data : null}
        handleSubmit={this.handleSubmit}
        error={null}/>);
    }
    return form;
  }

  renderFilingData = () => {
    const { companyFiling, status } = this.state
    switch(status) {
      case 'draft': return this.renderForm()
      case 'submitted': return (<FilingDataList data={companyFiling.field_data} />)
      case 'needs-follow-up': return this.renderForm()
      case 'needs-signature-payment': return (<FilingDataList data={companyFiling.field_data} />)
      case 'filed': return (<FilingDataList data={companyFiling.field_data} />)
      default: return this.renderForm()
    }
  }


  render() {
    const { status, filing, messages } = this.state

    // Loading state
    if (!filing) return (<Spinner animation="grow" variant="primary" />);

    return (<>
      <Breadcrumb>
        <Breadcrumb.Item href="/home/filings">Filings</Breadcrumb.Item>
        <Breadcrumb.Item active>{toTitleCase(filing.name)}</Breadcrumb.Item>
      </Breadcrumb>
      <FilingHeader filing={filing} status={status} />
      <FilingAlertMessage status={status} messages={messages} />
      <Card style={{ marginTop: 24 }}>
        <Card.Body>
          {this.renderFilingData()}
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

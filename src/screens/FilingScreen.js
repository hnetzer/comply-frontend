import React from 'react';
import { navigate } from "@reach/router"
import { connect } from 'react-redux';

import { toTitleCase, getURLParam } from 'utils'

import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card';

import {
  getFiling,
  createCompanyFiling,
  getCompanyFiling,
  updateCompanyFiling
} from 'network/api';

import { FilingHeader, FilingDataList } from 'components/molecules'
import { SanFrancisco } from 'forms/filings'

import Breadcrumb from 'react-bootstrap/Breadcrumb'

const DRAFT_SUCCESS_ALERT = 'Your draft has been saved successfully.';
const SUBMIT_SUCCESS_ALERT = 'Thanks we are processing your filing and will be in touch soon';

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
      const { filing, due_date, status } = companyFiling
      this.setState({
        filing: filing,
        due: due_date,
        companyFiling: companyFiling,
        status: status,
        alert: status === 'submitted' ? SUBMIT_SUCCESS_ALERT : null
      })
    }
  }

  handleSubmit = async (values, status) => {
    try {
      const { companyFilingId } = this.state
      // Saving or submitting the first setDraft
      if (!companyFilingId) {
        this.createFiling(values, status)
      }
      // Updating an existing filing
      if (companyFilingId) {
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
    const { field_data, status, id } = companyFiling

    this.setState({
      companyFilingId: id,
      fieldData: field_data,
      status: status,
      alert: status === 'draft' ? DRAFT_SUCCESS_ALERT : SUBMIT_SUCCESS_ALERT
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
    this.setState({
      status: updated.status,
      alert: status === 'draft' ? DRAFT_SUCCESS_ALERT : SUBMIT_SUCCESS_ALERT
    });
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


  render() {
    const { status, filing, companyFiling, alert } = this.state

    // Loading state
    if (!filing) return (<Spinner animation="grow" variant="primary" />);

    return (<>
      <Breadcrumb>
        <Breadcrumb.Item href="/home/filings">Filings</Breadcrumb.Item>
        <Breadcrumb.Item active>{toTitleCase(filing.name)}</Breadcrumb.Item>
      </Breadcrumb>
      <FilingHeader filing={filing} status={status} />
      <Alert show={alert != null} style={{ marginTop: 16 }} variant="info">
        {alert}
      </Alert>
      <Card style={{ marginTop: 24 }}>
        <Card.Body>
          {status === 'submitted' ? <FilingDataList data={companyFiling.field_data} /> :
            this.renderForm()
          }
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

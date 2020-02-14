import React from 'react';
import { navigate } from "@reach/router"
import { connect } from 'react-redux';

import { toTitleCase, getURLParam } from 'utils'
import moment from 'moment'

import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'

import {
  getFiling,
  createCompanyFiling,
  getCompanyFiling,
  updateCompanyFiling
} from 'network/api';

import { SanFrancisco } from 'forms/filings'

import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Badge from 'react-bootstrap/Badge';

const DRAFT_SUCCESS_ALERT = 'Your draft has been saved successfully.';
const SUBMIT_SUCCESS_ALERT = 'Thanks we are processing your filing and will be in touch soon';

class FilingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filing: null,
      due: null,
      fieldData: null,
      status: null,
      companyFilingId: null,
      showAlert: false,
      alertText: ''
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
      const { filing, due_date, field_data, status, id } = companyFiling
      this.setState({
        companyFilingId: id,
        filing: filing,
        due: due_date,
        fieldData: field_data,
        status: status,
        showAlert: status === 'submitted',
        alertText: status === 'submitted' ? SUBMIT_SUCCESS_ALERT : ''
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
    const { due_date, field_data, status, id } = companyFiling
    const alertText = status === 'draft' ? DRAFT_SUCCESS_ALERT : SUBMIT_SUCCESS_ALERT;

    this.setState({
      companyFilingId: id,
      fieldData: field_data,
      status: status,
      showAlert: true,
      alertText: alertText,
    })

    navigate(`/home/filings/${companyFiling.id}`)
  }

  updateFiling = async (values, status) => {
    const { user } = this.props
    const { filing, due, companyFilingId } = this.state
    const data = {
      field_data: values,
      status: status,
      due_date: due,
      filing_id: filing.id
    };

    const companyFiling = await updateCompanyFiling(user.company_id, companyFilingId, data);
    const alertText = status === 'draft' ? DRAFT_SUCCESS_ALERT : SUBMIT_SUCCESS_ALERT;
    this.setState({
      status: companyFiling.status,
      showAlert: true,
      alertText: alertText
    });
  }

  renderHeader = () => {
    const { filing } = this.state
    if (!filing) return null;
    return (<div>
      <h2>{toTitleCase(filing.name)}</h2>
      <h5 className="mb-2 text-muted">
        {`${toTitleCase(filing.agency.name)} - ${filing.jurisdiction.name}`}
      </h5>
      {this.renderDueDate()}
      {this.renderBadge()}
    </div>)
  }

  renderDueDate = () => {
    const { due } = this.state;
    return (<span className="mb-2 text-muted">
      {`Due: ${moment(due).format('MMM Do, YYYY')}`}
    </span>);
  }

  renderBadge = () => {
    const { status } = this.state;
    if (!status) return null;
    return (<Badge style={{ marginLeft: 16 }} variant="info">
      {status}
    </Badge>);
  }

  formNotSupported = () => (<div>
    <h6>This filing is not supported yet.</h6>
    <p>We are working to support more filings.</p>
  </div>)

  renderForm = () => {
    const filing = this.state.filing
    if (!filing) return null;
    let form = this.formNotSupported();
    const jurisdiction = filing.jurisdiction.name.toLowerCase();
    const agency = filing.agency.name.toLowerCase();
    const name = filing.name.toLowerCase();
    if (jurisdiction === 'san francisco' && agency === 'tax and treasurer' && name === 'business license') {
      form = (<SanFrancisco.TaxAndTreasurer.BusinessLicenseForm
        initialValues={this.state.fieldData}
        handleSubmit={this.handleSubmit}
        error={null}/>);
    }

    return (
      <Card style={{ marginTop: 24 }}>
        <Card.Body>
          {form}
        </Card.Body>
      </Card>
    );
  }

  renderFieldData = () => {
    const { fieldData } = this.state;
    if(!fieldData) return null;
    const fields = Object.keys(fieldData)
    return (
      <Card style={{ marginTop: 24 }}>
        <Card.Body>
          <Card.Title>Form Details</Card.Title>
          <Table striped bordered hover>
            <tbody>
            {fields.map((field, index) => (
              <tr>
                <td>{field}</td>
                <td>{fieldData[field]}</td>
              </tr>))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }

  renderBreadcrumb = () => {
    const  { filing } = this.state
    if (!filing) return null;
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/home/filings">Filings</Breadcrumb.Item>
        <Breadcrumb.Item active>{toTitleCase(filing.name)}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  renderAlert = () => {
    if (!this.state.showAlert) return
    return  (<Alert style={{ marginTop: 16 }} variant="info">{this.state.alertText}</Alert>)
  }

  render() {
    const { status } = this.state
    return (<>
      {this.renderBreadcrumb()}
      {this.renderHeader()}
      {this.renderAlert()}
      {status === 'draft' || !status ? this.renderForm() : null}
      {status === 'submitted' ? this.renderFieldData() : null}
    </>);
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(FilingScreen);

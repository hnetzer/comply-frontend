import React from 'react';
import { navigate } from "@reach/router"
import { connect } from 'react-redux';

import { getURLParam } from 'utils'

import Spinner from 'react-bootstrap/Spinner'

import { HeaderBar } from 'components/organisms'
import screenStyle from './home/Screens.module.scss'
import style from './FilingScreen.module.scss'

import {
  getFiling,
  createCompanyFiling,
  getCompanyFiling,
  updateCompanyFiling,
  getCompanyFilingMessages
} from 'network/api';

import { FilingHeader, FilingDataList, FilingAlertMessage } from 'components/molecules'
import { CompanyFilingForm } from 'forms'

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
      const filing = await getFiling(companyFiling.filing_id)
      const messages = await getCompanyFilingMessages(user.company_id, companyFilingId)
      const { due_date, status } = companyFiling
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
      fields: values.fields,
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
    const { filing, companyFiling } = this.state
    const data = {
      fields: values.fields,
      status: status,
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

    let form = this.formNotSupported();
    if (filing.fields.length > 0) {
      return (
        <CompanyFilingForm
          filing={filing}
          companyFiling={companyFiling}
          handleSubmit={this.handleSubmit} />
      )
    }

    return form;
  }


  renderFilingData = () => {
    const { companyFiling, status } = this.state
    switch(status) {
      case 'draft': return this.renderForm()
      case 'submitted': return (<FilingDataList data={companyFiling.fields} />)
      case 'needs-follow-up': return this.renderForm()
      case 'needs-signature-payment': return (<FilingDataList data={companyFiling.fields} />)
      case 'filed': return (<FilingDataList data={companyFiling.fields} />)
      case 'complete': return (<FilingDataList data={companyFiling.fields} />)
      default: return this.renderForm()
    }
  }


  render() {
    const { status, filing, messages, due } = this.state

    // Loading state
    if (!filing) return (<Spinner animation="grow" variant="primary" />);

    return (
    <>
      <HeaderBar title={filing.name}/>
      <section className={screenStyle.container}>
        <div className={screenStyle.content}>
          <div className={style.headerSection}>
            <FilingHeader filing={filing} status={status} due={due} title={false} />
          </div>
          <div className={style.divider} />
          <div className={style.alertSection}>
            <FilingAlertMessage status={status} messages={messages} />
          </div>
          <div className={style.formContainer}>
            <div className={style.formContent}>
              {this.renderFilingData()}
            </div>
          </div>

        </div>
      </section>
    </>);
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(FilingScreen);

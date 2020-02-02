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
    this.state = { filing: null, due: null }
  }

  async componentDidMount() {
    const filingId = getURLParam('filingId')
    console.log('getting the filing')
    const filing = await getFiling(filingId);
    if (this.props.companyFilingId) {
      const companyFiling = await getCompanyFiling(this.props.user.company_id, this.props.companyFilingId)
      console.log('GOT THE COMPANY FILING')
      console.log(companyFiling)
    }

    this.setState({ filing: filing, due: getURLParam('due') })
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
      navigate(`/home/filings/${companyFiling.id}?filingId=${filingId}`)
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

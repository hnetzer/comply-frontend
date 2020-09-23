import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"
import moment from 'moment'

import { getCompanyFiling } from 'network/api'

import style from './FilingDetailsScreen.module.scss'
import { Card, Button } from 'components/atoms'

import { faFileAlt, faMapMarkerAlt, faLandmark, faArrowRight, faArrowLeft, faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FilingDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filing: null, dueDate: null }
  }

  async componentDidMount() {
    const { companyFilingId, companyId } = this.props
    console.log(`About to get company filing for company ${companyId} and companyFiling ${companyFilingId}`)
    const companyFiling = await getCompanyFiling(companyId, companyFilingId);
    this.setState({ filing: companyFiling.filing, dueDate: companyFiling.due_date })
  }

  goToAllFilings = () => {
    navigate(-1)
  }

  renderEmpty = () => {
    return (<div className={style.emptyContainer}>
      <FontAwesomeIcon style={{ height: 48, width: 48 }} icon={faTools} />
      <span style={{ fontSize: 20, fontWeight: 800 }}>Coming soon...</span>
    </div>)
  }

  renderDescription = () => {
    return (
      <p className={style.descriptionText}>
        {this.state.filing.description}
      </p>
    )
  }


  render() {
    const { filing, dueDate } = this.state
    if (!filing) return 'loading...'
    return (
      <section className={style.container}>
        <Button onClick={this.goToAllFilings} variant="secondary">
          <FontAwesomeIcon style={{ height: 16, width: 16, marginRight: 8 }} icon={faArrowLeft} />
          <span>Back to all filings</span>
        </Button>
        {!filing ? 'loading...' : (
          <>
          <Card className={style.titleCard}>
            <div>
              <FontAwesomeIcon style={{ height: 32, width: 24 }} icon={faFileAlt} />
              <span className={style.title}>{filing.name}</span>
              <span style={{ fontWeight: 800, fontSize: 24, color: '#309F76', marginLeft: 16 }}>
                {`Due ${moment(dueDate).format('MMM Do, YYYY')}`}
              </span>
            </div>
            <div>
              <div className={style.jurisdictionContainer}>
                <FontAwesomeIcon style={{ height: 16, width: 16 }} icon={faMapMarkerAlt} />
                <div className={style.jurisdiction}>{filing.agency.jurisdiction.name}</div>
              </div>
              <div className={style.agencyContainer}>
                <FontAwesomeIcon style={{ height: 16, width: 16 }} icon={faLandmark} />
                <div className={style.agency}>{filing.agency.name}</div>
              </div>
            </div>
          </Card>
          <Card className={style.descriptionCard}>
            <h4 className={style.descriptionTitle}>Description</h4>
            {(filing.description && (filing.description.length > 0)) ?
              this.renderDescription() : this.renderEmpty()}
            <div className={style.descriptionFooter}>
            {filing.website != null ?
              (<Button onClick={() => window.open(filing.website)} variant="secondary" outline>
                <span>Filing Website</span>
                <FontAwesomeIcon style={{ height: 16, width: 16, marginLeft: 8 }} icon={faArrowRight} />
               </Button>)
              : null}
            </div>
          </Card>
          </>

        )}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}


export default connect(mapStateToProps)(FilingDetailsScreen);

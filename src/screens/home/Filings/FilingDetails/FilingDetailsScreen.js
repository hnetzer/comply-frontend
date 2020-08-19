import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"
import moment from 'moment'

import { getFiling } from 'network/api'

import style from './FilingDetailsScreen.module.scss'
import { Card, Button } from 'components/atoms'

import { faFileAlt, faMapMarkerAlt, faLandmark, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FilingDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filing: null, dueDate: null }
  }

  async componentDidMount() {
    const filing = await getFiling(this.props.filingId);
    this.setState({ filing: filing, dueDate: this.props.dueDate })
  }

  goToAllFilings = () => {
    navigate('/home/filings')
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
              <div>
                <FontAwesomeIcon style={{ height: 16, width: 16 }} icon={faMapMarkerAlt} />
                <span className={style.jurisdiction}>{filing.agency.jurisdiction.name}</span>
              </div>
              <div>
                <FontAwesomeIcon style={{ height: 16, width: 16 }} icon={faLandmark} />
                <span className={style.agency}>{filing.agency.name}</span>
              </div>
            </div>
          </Card>
          <Card className={style.descriptionCard}>
            <h4 className={style.descriptionTitle}>Description</h4>
            <p className={style.descriptionText} style={{ }}>
              {filing.description}
            </p>
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

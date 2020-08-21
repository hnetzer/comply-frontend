import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getFilingsForCompany } from 'network/api';
import { compareFilingsByDue } from 'utils'

import style from './FilingsScreen.module.scss'
import { Card, Divider } from 'components/atoms'
import { FilingCard, FilingRow } from 'components/molecules'

import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FilingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upcoming: [],
      past: []
    }
  }

  async componentDidMount() {
    const { user } = this.props
    const upcoming = await this.getUpcomingFilings(user.company_id);
    const past = await this.getPastFilings(user.company_id);
    this.setState({ upcoming: upcoming, past: past })
  }

  getUpcomingFilings = async (companyId) => {
    const start = moment().format('YYYY-MM-DD')
    const end = moment().add(3, 'M').format('YYYY-MM-DD')
    const filings = await getFilingsForCompany(companyId, start, end)
    return filings.sort(compareFilingsByDue)
  }

  getPastFilings = async (companyId) => {
    const start = '2020-01-01'
    const end = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const filings = await getFilingsForCompany(companyId, start, end)
    return filings.sort(compareFilingsByDue)
  }

  render() {
    return (
      <section className={style.container}>
        <Card style={{ width: '100%', flexDirection: 'column'}}>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <FontAwesomeIcon className={style.folderIcon} icon={faFolder} />
            <h2>Filings</h2>
          </div>
          <Divider />
          <div style={{ marginTop: 40, width: '100%' }}>
            <h3>Upcoming</h3>
            <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'row' }}>
              {this.state.upcoming.map((f, index) => (
                <FilingCard
                  filingId={f.id}
                  name={f.name}
                  agency={f.agency.name}
                  jurisdiction={f.agency.jurisdiction.name}
                  dueDate={f.due} />))}
            </div>
          </div>
          <div style={{ marginTop: 40, width: '100%' }}>
            <h3>Previous</h3>
            {this.state.past.map((f, index) => (
              <FilingRow
                filingId={f.id}
                name={f.name}
                agency={f.agency.name}
                jurisdiction={f.agency.jurisdiction.name}
                dueDate={f.due} />))}
          </div>

        </Card>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}


export default connect(mapStateToProps)(FilingsScreen);
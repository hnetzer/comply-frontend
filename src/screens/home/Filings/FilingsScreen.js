import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getCompanyFilings } from 'network/api';
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
    const { companyId } = this.props
    const upcoming = await this.getUpcomingFilings(companyId);
    const past = await this.getPastFilings(companyId);
    this.setState({ upcoming: upcoming, past: past })
  }

  getUpcomingFilings = async (companyId) => {
    const start = moment().format('YYYY-MM-DD')
    const end = moment().add(3, 'M').format('YYYY-MM-DD')
    const filings = await getCompanyFilings(companyId, start, end)
    return filings.sort(compareFilingsByDue).filter(f => !f.hidden)
  }

  getPastFilings = async (companyId) => {
    const start = '2020-01-01'
    const end = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const filings = await getCompanyFilings(companyId, start, end)
    return filings.sort(compareFilingsByDue).filter(f => !f.hidden)
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
                  key={index}
                  companyFilingId={f.id}
                  companyId={f.company_id}
                  name={f.filing.name}
                  agency={f.filing.agency.name}
                  jurisdiction={f.filing.agency.jurisdiction.name}
                  dueDate={f.due_date} />))}
            </div>
          </div>
          <div style={{ marginTop: 40, width: '100%' }}>
            <h3>Previous</h3>
            {this.state.past.map((f, index) => (
              <FilingRow
                key={index}
                companyFilingId={f.id}
                name={f.filing.name}
                agency={f.filing.agency.name}
                jurisdiction={f.filing.agency.jurisdiction.name}
                dueDate={f.due_date} />))}
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

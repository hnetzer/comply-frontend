import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getFilingsForCompany } from 'network/api';

import style from './FilingsScreen.module.scss'
import { Card, Divider } from 'components/atoms'
import { FilingCard } from 'components/molecules'

import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FilingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upcoming: []
    }
  }

  async componentDidMount() {
    const { user } = this.props
    const upcoming = await this.getUpcomingFilings(user.company_id);
    this.setState({ upcoming: upcoming })
  }

  getUpcomingFilings = async (companyId) => {
    const start = moment().format('YYYY-MM-DD')
    const end = moment().add(3, 'M').format('YYYY-MM-DD')
    const filings = await getFilingsForCompany(companyId, start, end)
    return filings.sort(this.compareFilingsByDue)
  }

  render() {
    return (
      <section className={style.container}>
        <Card style={{ width: '100%', height: 800, flexDirection: 'column'}}>
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
                  name={f.name}
                  agency={f.agency.name}
                  jurisdiction={f.agency.jurisdiction.name}
                  dueDate={f.due} />))}
            </div>
          </div>
          <div style={{ marginTop: 40, width: '100%', height: 200 }}>
            <h3>Completed</h3>
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

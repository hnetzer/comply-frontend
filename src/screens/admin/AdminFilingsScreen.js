import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllCompanyFilings } from 'network/api';

import Button from 'react-bootstrap/Button';

import { SideListItem, FilingDataList } from '../../components/molecules'

import style from './AdminFilingsScreen.module.css'

class AdminFilingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companyFilings: [], selectedIndex: null };
  }

  async componentDidMount() {
    try {
      const data = await getAllCompanyFilings()
      this.setState({ companyFilings: data })
    } catch (err) {
      console.log(err)
    }
  }

  onSelectFiling = (index) => {
    this.setState({ selectedIndex: index })
  }

  renderFilingTitle = () => {
    const { selectedIndex, companyFilings } = this.state
    if(selectedIndex === null) return null;

    const c = companyFilings[selectedIndex]
    const { filing } = c

    return (<>
      <h4>{c.company.name}</h4>
      <h5>{filing.name}</h5>
      <h5 className="mb-2 text-muted">
        {`${filing.agency.name} - ${filing.agency.jurisdiction.name}`}
      </h5>
      <span className="mb-2 text-muted">
        {`Due: ${moment(filing.due).format('MMM Do, YYYY')}`}
      </span>
    </>)
  }

  renderFilingDataList = () => {
    const { selectedIndex, companyFilings } = this.state
    if(selectedIndex === null) return null;
    const c = companyFilings[selectedIndex]

    return (<>
      <FilingDataList data={c.field_data} />
      <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="warning">Reject</Button>
        <Button variant="success">Accept</Button>
      </div>
    </>)
  }

  render() {
    const { companyFilings, selectedIndex } = this.state
    return(
      <main style={{ width: '100%', display: 'flex' }}>
        <section className={style.sideList}>
          <div style={{ padding: 8 }}>
            <span>Status:</span>
            <select style={{ marginLeft: 8}}>
              <option>Submitted</option>
              <option>Rejected</option>
              <option>Accepted</option>
            </select>
          </div>
          {companyFilings.map((f,i) =>
            (<SideListItem filing={f} key={i} index={i} onSelect={this.onSelectFiling} />)
          )}
        </section>
        <section className={style.content}>
          {this.renderFilingTitle()}
          {this.renderFilingDataList()}

        </section>
      </main>
    )
  }
}

export default connect(state => state)(AdminFilingsScreen);

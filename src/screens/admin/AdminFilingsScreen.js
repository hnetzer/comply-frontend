import React from 'react';
import { connect } from 'react-redux';
import { Router, navigate } from "@reach/router";

import { adminGetFilings } from 'network/api';

import Button from 'react-bootstrap/Button';

import { SideListItem } from 'components/molecules'
import { AdminEditFilingSection} from 'components/sections'

import style from './AdminScreens.module.css';

class AdminFilingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filings: [], selected: null };
  }

  async componentDidMount() {
    try {
      const filings = await adminGetFilings()
      this.setState({ filings: filings })
    } catch (err) {
      console.log(err)
    }
  }

  onSelectFiling = (index) => {
    const filing = this.state.filings[index]
    this.setState({ selected: filing })
    navigate(`/admin/platform/filings/${filing.id}`)
  }

  render() {
    return(
      <main style={{ width: '100%', display: 'flex' }}>
        <section className={style.sideList}>
          <div style={{ padding: 16 }}>
            <Button href="/admin/platform/filings/new" variant="link">+ New Filing</Button>
          </div>
          <div>
            <div className={style.companyFilingsHeader}>
              Filings
            </div>
            <div className={style.filingsList}>
              {
                this.state.filings.map((f,i) =>
                    (<SideListItem
                      title={f.name}
                      subtitle={f.agency.name}
                      text={f.agency.jurisdiction.name}
                      key={i}
                      index={i}
                      onSelect={this.onSelectFiling} />))
              }
            </div>
          </div>
        </section>
        <section className={style.main}>
          <Router>
            <AdminEditFilingSection path="/:filingId" filing={this.state.selected} />
            <AdminEditFilingSection path="/new" filing={null} />
          </Router>
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(AdminFilingsScreen);

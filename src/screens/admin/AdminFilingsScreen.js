import React from 'react';
import { connect } from 'react-redux';

import { adminGetFilings } from 'network/api';

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
    console.log(index)
    const filing = this.state.filings[index]
    console.log(filing)
    this.setState({ selected: filing })
  }

  render() {
    return(
      <main style={{ width: '100%', display: 'flex' }}>
        <section className={style.sideList}>
          <div style={{ padding: 16 }}>
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
          <AdminEditFilingSection filing={this.state.selected} />
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(AdminFilingsScreen);

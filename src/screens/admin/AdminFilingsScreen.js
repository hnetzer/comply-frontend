import React from 'react';
import { connect } from 'react-redux';

import { getAllCompanyFilings } from 'network/api';

import { SideListItem } from '../../components/molecules'

class AdminFilingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companyFilings: [] };
  }

  async componentDidMount() {
    try {
      const data = await getAllCompanyFilings()
      this.setState({ companyFilings: data })
    } catch (err) {
      console.log(err)
    }
  }

  sideList = {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '20%',
    maxWidth: '20%',
    backgroundColor: '#f7f7f7',
    height: '87vh',
    overflow: 'scroll'
  }

  render() {
    const { companyFilings } = this.state
    return(
      <main style={{ width: '100%', display: 'flex' }}>
        <div style={this.sideList}>
          {companyFilings.map(f => (<SideListItem filing={f} />))}
        </div>
      </main>
    )
  }
}

export default connect(state => state)(AdminFilingsScreen);

import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import style from './FilingDetailsScreen.module.scss'
import { Card, Button } from 'components/atoms'

class FilingDetailsScreen extends React.Component {
  goToAllFilings = () => {
    navigate('/home/filings')
  }

  render() {
    return (
      <section className={style.container}>
        <Button onClick={this.goToAllFilings} variant="secondary">Back to all filings</Button>
        <Card style={{ width: '100%', height: 100, flexDirection: 'row', marginTop: 16 }}>
          <h2>Filing Name</h2>
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


export default connect(mapStateToProps)(FilingDetailsScreen);

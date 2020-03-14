import React from 'react';
import { connect } from 'react-redux';

class AdminCompaniesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async componentDidMount() {
    try {

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return(
      <main style={{ width: '100%', display: 'flex' }}>
        <section style={{ flexBasis: '80%', display: 'flex', justifyContent: 'center' }}>
          <h1 style={{ margin: 'auto' }}>Companies</h1>
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(AdminCompaniesScreen);

import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import styles from './Home.module.css'

const HomeScreen = (props) => {

  return(
    <div>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="/home">
          <h3 className={styles.logo}>comply</h3>
        </Navbar.Brand>
      </Navbar>
      <div className={styles.container}>
        <div className={styles.sideBar}>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/filings" disabled>Filings</Nav.Link>
            <Nav.Link href="/agencies" disabled>Agencies</Nav.Link>
            <Nav.Link href="/company" disabled>Company</Nav.Link>
          </Nav>
        </div>
        <main className={styles.main}>
            <h1>Welcome to Comply!</h1>
        </main>
      </div>
    </div>
  )
}

export default HomeScreen;

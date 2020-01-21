import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logout } from 'actions';

const Toggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ color: '#fff', textDecoration: 'none'}}
  >
    <FontAwesomeIcon size="lg" color="#fff" icon={faUser}/>
  </a>
));


const AccountMenu = (props) => {
  const handleLogout = () => {
    props.dispatch(logout())
    navigate('/login')
  }

  const headerText = props.user != null ?
    `${props.user.name} (${props.user.email})` : '';

  return (
    <Dropdown>
      <Dropdown.Toggle as={Toggle}/>
      <Dropdown.Menu alignRight>
        <Dropdown.Header>{headerText}</Dropdown.Header>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(AccountMenu);

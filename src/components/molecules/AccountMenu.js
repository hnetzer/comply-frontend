import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown'

import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './AccountMenu.module.scss'

const Toggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
    className={style.button}
  >
    <FontAwesomeIcon className={style.icon} icon={faUser}/>
    <span style={{ paddingLeft: 8, paddingRight: 8 }}>
      {children}
    </span>
    <FontAwesomeIcon className={style.icon} icon={faCaretDown}/>
  </button>
));


const AccountMenu = (props) => {

  const email = props.user != null ? props.user.email : '';
  const name = props.user != null ? props.user.name : '';

  return (
    <Dropdown>
      <Dropdown.Toggle as={Toggle}>
        {name}
      </Dropdown.Toggle>
      <Dropdown.Menu alignRight>
        <Dropdown.Header>{email}</Dropdown.Header>
        {/*<Dropdown.Item>Account</Dropdown.Item>*/}
        <Dropdown.Item onClick={props.handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AccountMenu;

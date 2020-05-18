import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown'

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './AccountMenu.module.scss'

const Toggle = React.forwardRef(({ children, onClick, variant }, ref) => {

    const buttonStyle = variant === "light" ? style.buttonLight : style.buttonDark
    const iconStyle = variant === "light" ? style.iconLight : style.iconDark

    return (<button
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      className={buttonStyle}
    >
      <span style={{ paddingLeft: 8, paddingRight: 8 }}>
        {children}
      </span>
      <FontAwesomeIcon className={iconStyle} icon={faCaretDown}/>
    </button>
  );
})


const AccountMenu = (props) => {
  if(!props.user) return null;
  const { email, first_name, last_name } = props.user

  return (
    <Dropdown>
      <Dropdown.Toggle as={Toggle} variant={props.variant} >
        {`${first_name} ${last_name}`}
      </Dropdown.Toggle>
      <Dropdown.Menu alignRight>
        <Dropdown.Header>{email}</Dropdown.Header>
        <Dropdown.Item onClick={props.handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AccountMenu;

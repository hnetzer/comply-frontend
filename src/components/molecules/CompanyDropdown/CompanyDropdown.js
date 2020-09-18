import React from 'react';
import { navigate } from "@reach/router"
import Dropdown from 'react-bootstrap/Dropdown'

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './CompanyDropdown.module.scss'


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
      <span className={style.companyName}>
        {children}
      </span>
      <FontAwesomeIcon className={iconStyle} icon={faCaretDown}/>
    </button>
  );
})


const CompanyDropdown = ({ companies, selectedId }) => {
  const selectedCompany = companies.find(c => c.id == selectedId);

  return (
    <Dropdown>
      <Dropdown.Toggle as={Toggle} variant="light" >
        {selectedCompany.name}
      </Dropdown.Toggle>
      <Dropdown.Menu alignRight>
        <Dropdown.Header>COMPANIES</Dropdown.Header>
        {companies.map(c =>
          (
            <Dropdown.Item onClick={() => navigate(`/company/${c.id}`)}>
              {c.name}
            </Dropdown.Item>)
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CompanyDropdown;

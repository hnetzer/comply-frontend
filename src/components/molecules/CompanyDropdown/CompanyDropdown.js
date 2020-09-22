import React from 'react';
import { navigate } from "@reach/router"
import Dropdown from 'react-bootstrap/Dropdown'

import { createCompany } from 'network/api'

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

  const handleAddCompanyClick = async () => {
    const newCompany = await createCompany({ name: "New Company Name"})
    navigate(`/onboarding/company/${newCompany.id}/company`)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle as={Toggle} variant="light" >
        {selectedCompany != null ? selectedCompany.name : null}
      </Dropdown.Toggle>
      <Dropdown.Menu alignRight>
        <Dropdown.Header>COMPANIES</Dropdown.Header>
        {companies.map((c, i) =>
          (
            <Dropdown.Item key={i} onClick={() => navigate(`/company/${c.id}`)}>
              {c.name}
            </Dropdown.Item>)
          )
        }
        <Dropdown.Item onClick={() => handleAddCompanyClick()}>
          + Add Company
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CompanyDropdown;

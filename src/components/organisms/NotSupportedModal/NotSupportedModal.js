import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Table, Body, Row, Cell, Header, HeaderCell } from 'components/atoms'

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './NotSupportedModal.module.scss';

const NotSupportedModal = ({ jurisdictions }) => {
  const [show, setShow] = useState(false);

  if(!jurisdictions) {
    jurisdictions = []
  }

  const renderWarningIcon = () => {
    if (jurisdictions.length === 0) return null
    return (<FontAwesomeIcon
      onClick={() => setShow(true)}
      className={style.warningIcon}
      icon={faExclamationTriangle}
    />);
  }

  return (
    <>
      <div>{renderWarningIcon()}</div>
      <Modal show={show} onHide={() => setShow(false)} dialogClassName={style.modal}>
        <Modal.Header closeButton>
          <h4 className={style.title}>Sorry, some locations are not supported yet</h4>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <p className={style.text}>
            {`We don't currently support all of your office locations. We don't
            yet support the jurisdictions listed below:`}
          </p>
          <Table className={style.table}>
            <Header>
              <HeaderCell>Jurisdiction</HeaderCell>
              <HeaderCell>Type</HeaderCell>
            </Header>
            <Body>
            {jurisdictions.map((j, i) => (
              <Row key={i}>
                <Cell className={style.cell}>{j.name}</Cell>
                <Cell className={style.cell}>{j.type}</Cell>
              </Row>
            ))}
            </Body>
          </Table>
          <p className={style.text}>
          {`We are working on supporting these jurisdictions and should have them
            included in the next few days. We'll reach out with an email when these
            jurisdictions are added to our platform.`}
          </p>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center'}}>
          <Button style={{ width: 200 }} onClick={() => setShow(false)}>Okay, got it</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NotSupportedModal;

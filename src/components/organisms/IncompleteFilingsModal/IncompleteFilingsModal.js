import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Table, Body, Row, Cell, Header, HeaderCell } from 'components/atoms'

import style from './IncompleteFilingsModal.module.scss'

const IncompleteFilingsModal = ({ agencies }) => {
  const [show, setShow] = useState(false);

  if (!agencies || !agencies.length) return null;

  return (
    <>
      <Button onClick={() => setShow(true)}>Incomplete Filings</Button>
      <Modal show={show} onHide={() => setShow(false)} dialogClassName={style.modal}>
        <Modal.Header closeButton>
          <h4 className={style.title}>Incomplete Filings</h4>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <p className={style.text}>
            {`Some of your filing deadlines could not be determined.
              Please add the `}<b>{`registration dates`}</b>{` of the agencies below to complete your filling schedule.`}
          </p>
          <Table className={style.table}>
            <Header>
              <HeaderCell>Agency</HeaderCell>
              <HeaderCell>Jurisdiction</HeaderCell>
            </Header>
            <Body>
            {agencies.map((a, i) => (
              <Row key={i}>
                <Cell className={style.cell}>{a.name}</Cell>
                <Cell className={style.cell}>{a.jurisdiction.name}</Cell>
              </Row>
            ))}
            </Body>
          </Table>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center'}}>
          <Button style={{ width: 200 }} onClick={() => setShow(false)}>Update Agencies</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default IncompleteFilingsModal;

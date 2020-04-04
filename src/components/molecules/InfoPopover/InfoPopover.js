import React from 'react';

import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './InfoPopover.module.scss';

const popover = (props) => (
  <Popover id="popover-basic" className={style.popover}>
    <Popover.Content>
      {props.content}
    </Popover.Content>
  </Popover>
);

const InfoPopover = (props) => (
  <span className={style.iconContainer}>
    <OverlayTrigger trigger="hover" placement="right" overlay={popover(props)}>
      <FontAwesomeIcon icon={faInfoCircle}/>
    </OverlayTrigger>
  </span>
);

export default InfoPopover

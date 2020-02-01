import React, { useState } from 'react';

import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//<i class="fas fa-info-circle"></i>

const popover = (props) => (
  <Popover id="popover-basic">
    <Popover.Content>
      {props.content}
    </Popover.Content>
  </Popover>
);

const InfoPopover = (props) => (
  <span style={{ marginRight: 8, marginLeft: 8 }}>
    <OverlayTrigger trigger="hover" placement="right" overlay={popover(props)}>
      <FontAwesomeIcon color="#aaa" icon={faInfoCircle}/>
    </OverlayTrigger>
  </span>
);

export default InfoPopover

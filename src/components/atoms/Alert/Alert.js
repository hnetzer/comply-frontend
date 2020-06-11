import React from 'react';

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './Alert.module.scss';

const Alert = ({ children, show, onDismiss }) => {
  return (
    <div className={style.container} style={{ display: show ? 'flex' : 'none'}}>
      <div>
      {children}
      </div>
      <div onClick={onDismiss}>
        <FontAwesomeIcon
          className={style.dismissIcon}
          icon={faTimes}/>
      </div>
    </div>
  )
}

Alert.defaultProps = {
  show: true,
  onDismiss: () => {}
}

export default Alert;

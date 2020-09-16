import React from 'react';

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import stylesheet from './Alert.module.scss';

const Alert = ({ children, show, onDismiss, style }) => {
  const styles = { ...style, display: show ? 'flex' : 'none' }

  return (
    <div className={stylesheet.container} style={styles}>
      <div>
      {children}
      </div>
      <div onClick={onDismiss}>
        <FontAwesomeIcon
          className={stylesheet.dismissIcon}
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

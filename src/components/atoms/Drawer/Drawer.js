import React from 'react';
import style from './Drawer.module.scss'

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Drawer = ({ children, show, onHide }) => {

  return(
    <div className={style.overlay} style={{ display: show ? 'block' : 'none' }}>
      <div className={style.drawer} style={{ width: show ? 380 : 0 }}>
        <div className={style.topSection}>
          <FontAwesomeIcon icon={faTimes} className={style.closeIcon} onClick={() => onHide()}/>
        </div>
        <div className={style.mainSection}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Drawer;

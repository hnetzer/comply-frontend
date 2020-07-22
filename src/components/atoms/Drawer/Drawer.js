import React from 'react';

import classNames from 'classnames'
import style from './Drawer.module.scss'

const Drawer = ({ children, show }) => {

  return(
    <div className={style.overlay} style={{ display: show ? 'block' : 'none' }}>
    {children}
    </div>
  )
}

export default Drawer;

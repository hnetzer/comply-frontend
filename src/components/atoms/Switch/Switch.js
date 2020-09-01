import React from 'react';

import style from './Switch.module.scss'

const Switch = ({ value, onChange, name }) => {
  return (
    <>
      <label className={style.switch}>
        <input name={name} checked={value} onChange={onChange} type="checkbox" />
        <span className={style.slider}></span>
      </label>
      {value ?
        (<span className={style.onLabel}>ON</span>) :
        (<span className={style.offLabel}>OFF</span>)
      }
    </>
  )
}

Switch.defaultProps = {
  // show: true,
}

export default Switch;

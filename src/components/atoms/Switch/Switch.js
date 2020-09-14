import React from 'react';

import style from './Switch.module.scss'

const Switch = ({ value, onChange, name, trueLabel, falseLabel }) => {
  return (
    <>
      <label className={style.switch}>
        <input name={name} checked={value} onChange={onChange} type="checkbox" />
        <span className={style.slider}></span>
      </label>
      {value ?
        (<span className={style.onLabel}>{trueLabel}</span>) :
        (<span className={style.offLabel}>{falseLabel}</span>)
      }
    </>
  )
}

Switch.defaultProps = {
  // show: true,
  trueLabel: 'ON',
  falseLabel: 'OFF'
}

export default Switch;

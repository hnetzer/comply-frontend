import React from 'react';

import classNames from 'classnames'
import styles from './Input.module.scss'

const Input = ({ type, name, value, label, onChange, className, style }) => {
  const classes = classNames(styles.input, className)

  return(
    <div className={styles.group}>
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={classes}
        style={style}
        autoComplete="off" />
    </div>
  )
}

Input.defaultProps = {
  type: "text",
  onChange: () => {},
  label: "",
}

export default Input;

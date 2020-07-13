import React from 'react';

import style from './Button.module.scss';

const Button = ({ children }) => {
  return (
    <button className={style.primaryOutline}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  // show: true,
}

export default Button;

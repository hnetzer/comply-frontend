import React from 'react';

import style from './Button.module.scss';

const Button = ({ children, onClick, type, variant, outline, disabled }) => {
  const getButtonStyle = () => {
    if (disabled) {
      return style.disabled;
    }

    if (!outline) {
      switch(variant) {
        case "primary": return style.primary;
        case "secondary": return style.secondary;
        case "dark": return style.dark;
        default: return style.primary;
      }
    } else {
      switch(variant) {
        case "primary": return style.primaryOutline;
        case "secondary": return style.secondaryOutline;
        case "dark": return style.darkOutline;
        default: return style.primaryOutline;
      }
    }
  }



  return (
    <button type={type} onClick={onClick} className={getButtonStyle()}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: "primary",
  outline: false,
  disabled: false,
  // show: true,
}

export default Button;

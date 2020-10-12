import React from 'react';

import classNames from 'classnames'
import stylesheet from './Button.module.scss';

const Button = ({ children, onClick, type, variant, outline, disabled, className, style }) => {
  const getButtonStyle = () => {
    if (disabled && variant === "signup") {
      return stylesheet.signupDisabled
    }


    if (disabled) {
      return stylesheet.disabled;
    }

    if (!outline) {
      switch(variant) {
        case "primary": return stylesheet.primary;
        case "secondary": return stylesheet.secondary;
        case "dark": return stylesheet.dark;
        case "signup": return stylesheet.signup;
        default: return stylesheet.primary;
      }
    } else {
      switch(variant) {
        case "primary": return stylesheet.primaryOutline;
        case "secondary": return stylesheet.secondaryOutline;
        case "dark": return stylesheet.darkOutline;
        default: return stylesheet.primaryOutline;
      }
    }
  }

  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={classNames(getButtonStyle(), className)}>
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

import React from 'react';

import classNames from 'classnames'
import stylesheet from './Card.module.scss'

const Card = ({ children, className, style }) => {
  const classes = classNames(stylesheet.card, className)

  return(
    <section className={classes} style={style}>
    {children}
    </section>
  )
}

export default Card;

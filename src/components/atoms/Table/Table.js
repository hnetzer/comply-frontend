import React from 'react';

import classNames from 'classnames'
import stylesheet from './Table.module.scss'

const Table = ({ children, className, style }) => {
  const classes = classNames(stylesheet.table, className)

  return(
    <table className={classes} style={style}>
    {children}
    </table>
  )
}

const Header = ({ children, className, style }) => {
  const classes = classNames(stylesheet.tableHeaderRow, className)

  return(
    <thead>
      <tr className={classes} style={style}>
      {children}
      </tr>
    </thead>
  )
}

const HeaderCell = ({ children, className, style }) => {
  const classes = classNames(stylesheet.tableHeader, className)

  return(
    <th className={classes} style={style}>
    {children}
    </th>
  )
}

const Body = ({ children, className, style }) => {
  return(
    <tbody className={className} style={style}>
    {children}
    </tbody>
  )
}

const Row = ({ children, className, style }) => {
  const classes = classNames(stylesheet.tableBodyRow, className)

  return(
    <tr className={classes} style={style}>
    {children}
    </tr>
  )
}

const Cell = ({ children, className, style }) => {
  const classes = classNames(stylesheet.tableCell, className)
  return(
    <td className={classes} style={style}>
    {children}
    </td>
  )
}

export {
  Table,
  Header,
  HeaderCell,
  Body,
  Row,
  Cell
}

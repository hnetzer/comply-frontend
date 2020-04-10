import React from 'react';

import style from './FilingDataList.module.scss'

const FilingDataList = ({ data }) => {
  if(!data) return null;
  const fields = data


  return (<div>
    <div className={style.columnNameRow}>
      <div className={style.columnName}>Field</div>
      <div className={style.columnName}>Value</div>
    </div>
    {fields.map((field, index) => (
      <div className={style.row} key={index}>
        <div className={style.fieldName}>{field.filing_field.name}</div>
        <div className={style.fieldValue}>{field.value}</div>
      </div>))}
  </div>
  );
}

export default FilingDataList;

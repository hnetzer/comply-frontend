import React from 'react';
import moment from 'moment'

import style from './FilingTimeline.module.scss';

const FilingTimeline = ({ filings }) => {
  if(!filings) return null;

  const sortByDate = (a, b) => (moment(a.due).isSameOrBefore(b.due) ? -1 : 1);

  const groups = filings.reduce((map, filing) => {
    const monthDue = moment(filing.due).month();
    if(!map[monthDue]) {
      map[monthDue] = [];
    }

    map[monthDue].push(filing);
    map[monthDue].sort(sortByDate);
    return map
  }, {})

  const months = moment.monthsShort();

  return (
    <div className={style.container}>
      <div className={style.nodeSection}>
        {months.map((month, index) => {
          const files = groups[index] != null ? groups[index] : [];
          return (<div className={style.month} key={index}>
            <div className={style.monthCountSection}>
              <span className={style.monthCount}>{files.length}</span>
              <span className={style.dueLabel}>{` due`}</span>
            </div>
            <div className={style.monthNodeSection}>
            {files.map((f,i) =>
              (
                <div className={style.node} key={i}>
                  <div className={style.filingHover}>
                    <div className={style.filingName}>{f.name}</div>
                    <div className={style.agencyName}>{f.agency.name}</div>
                    <div className={style.jurisdictionName}>{f.agency.jurisdiction.name}</div>
                    <div>
                      <small>Due:</small>
                      <div className={style.filingDueDate}>
                        {moment(f.due).format('MMM Do, YYYY')}
                      </div>
                    </div>
                    {/*<div>
                      <Button size="sm">Filing Details</Button>
                      <Button size="sm" variant="link">Agency Website</Button>
                    </div>*/}
                  </div>
                </div>
              )
            )}
            </div>
            <div className={style.monthLabelSection}>
              {month}
            </div>
          </div>)
        })}
      </div>

    </div>
  )
}

export default FilingTimeline;

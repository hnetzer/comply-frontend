import React from 'react';
import moment from 'moment'

import Button from 'react-bootstrap/Button';
import style from './CustomFilingTimeline.module.scss';

const CustomFilingTimeline = ({ filings }) => {
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

  console.log("filngs groups:", groups)

  const months = moment.monthsShort();

  return (
    <div className={style.container}>
      <div className={style.nodeSection}>
        {months.map((month, index) => {
          const files = groups[index] != null ? groups[index] : [];
          return (<div className={style.month}>
            {files.map(f =>
              (<>
                <div className={style.node}>
                  <div className={style.hover}>
                    <h5>{f.name}</h5>
                    <div>{f.agency.name}</div>
                    <div>{f.agency.jurisdiction.name}</div>
                    <div>
                      <small>Due:</small>
                      <span>{moment(f.due).format('MMMM Do, YYYY')}</span>
                    </div>
                    <div>
                      <Button size="sm">Filing Details</Button>
                      <Button size="sm" variant="link">Agency Website</Button>
                    </div>
                  </div>
                </div>
              </>)
            )}
          </div>)
        })}
      </div>
      <div className={style.monthLabelSection}>
        {months.map(month => (<div className={style.monthLabel}>{month}</div>))}
      </div>
    </div>
  )
}

export default CustomFilingTimeline;

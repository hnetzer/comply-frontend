import React, { useState } from 'react';
import moment from 'moment'

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FilingCard } from 'components/molecules'
import style from './FilingTimeline.module.scss';

// Timeline should either start on January 1st or July 1st of the current year
const getInitialStartDate = () => {
  const now = moment();
  if (now.month() >= 6) {
    return moment().set({ date: 1, month: 6, year: now.year() })
  }
  return moment().set({ date: 1, month: 0, year: now.year() })
}


const FilingTimeline = ({ filings }) => {
  const [startDate, setStartDate] = useState(getInitialStartDate())
  const endDate = moment(startDate).add(1, 'year')


  if(!filings) return null;

  const sortByDate = (a, b) => (moment(a.due_date).isSameOrBefore(b.due_date) ? -1 : 1);
  const filingsInRange = filings.filter((filing, index) => {
    const dueDate = moment(filing.due_date)
    if (dueDate.isSameOrAfter(startDate) && dueDate.isBefore(endDate)) {
      return true
    }
    return false;
  })

  const groups = filingsInRange.reduce((map, filing) => {
    const yearDue = moment(filing.due_date).year();
    const monthDue = moment(filing.due_date).month();

    if (!map[yearDue]) {
      map[yearDue] = {}
    }

    if(!map[yearDue][monthDue]) {
      map[yearDue][monthDue] = [];
    }

    map[yearDue][monthDue].push(filing);
    map[yearDue][monthDue].sort(sortByDate);
    return map
  }, {})

  let months = []
  let monthDate = moment(startDate)
  for (let i=0; i<12; i++) {
    months.push({
      month: monthDate.month(),
      year: monthDate.year()
    })
    monthDate.add(1, 'month')
  }

  const monthLabels = moment.monthsShort();
  const now = moment();

  return (
    <div className={style.container}>
      <div className={style.nodeSection}>
        <div
          onClick={() => setStartDate(moment(startDate).subtract(6, 'months'))}
          className={style.backContainer}>
          <FontAwesomeIcon className={style.backButton} icon={faCaretLeft} />
        </div>
        {months.map((month, index) => {
          const files = (groups[month.year] && groups[month.year][month.month]) ? groups[month.year][month.month] : [];
          return (
          <div
            className={style.month}
            style={{ borderLeft: (month.month === now.month() && month.year === now.year()) ? '3px solid #112532': null }}
            key={index}
          >
            <div className={style.monthCountSection}>
              <span className={style.monthName}>{monthLabels[month.month]}</span>
              <span className={style.monthYear}>{(month.month === 0 || month.month === 6) ? month.year : null}</span>
            </div>
            <div className={style.monthNodeSection}>
            {files.map((f,i) =>
              (
                <div
                  className={style.node}
                  style={{ backgroundColor: moment(f.due_date).isAfter(now) ? '#13C296' : '#cbcbcb' }}
                  key={i}
                >
                  <FilingCard
                    companyId={f.company_id}
                    companyFilingId={f.id}
                    name={f.filing.name}
                    agency={f.filing.agency.name}
                    jurisdiction={f.filing.agency.jurisdiction.name}
                    dueDate={f.due_date}
                    className={style.filingHover} />
                </div>
              )
            )}
            </div>
            <div className={style.monthLabelSection}>
              {`${files.length} due`}
            </div>
          </div>)
        })}
        <div
          onClick={() => setStartDate(moment(startDate).add(6, 'months'))}
          className={style.forwardContainer}>
          <FontAwesomeIcon className={style.forwardButton} icon={faCaretRight} />
        </div>
      </div>
    </div>
  )
}

export default FilingTimeline;

import React from 'react';

import style from './VerticalProgressBar.module.scss'

const VerticalProgressBar = ({ currentIndex }) => {
  const steps = ['Getting started', 'Company', 'Offices', 'Agencies', 'Done' ]
  return (
    <div className={style.container}>
      {steps.map((step, index) => {
        const stepClass = index <= currentIndex ? style.stepEnabled : style.stepDisabled;
        const lineClass = index <= currentIndex ? style.lineEnabled : style.lineDisabled;
        const circleClass = index <= currentIndex ? style.circleEnabled : style.circleDisabled

        return (
          <>
            {index ? (<div className={lineClass}></div>) : null }
            <div key={index} className={stepClass}>
              <div className={circleClass}></div>
              <div className={style.name}>{step}</div>
            </div>
          </>
        )
      } )}
    </div>
  )
}


export default VerticalProgressBar;

import React from 'react';
import { Link } from '@reach/router'

import style from './VerticalProgressBar.module.scss'

const steps = [
  {
    name: 'Getting started',
    link: '/onboarding'
  },
  {
    name: 'Company',
    link: '/onboarding/company'
  },
  {
    name: 'Offices',
    link: '/onboarding/offices'
  },
  {
    name: 'Agencies',
    link: '/onboarding/agencies'
  },
  {
    name: 'Done',
    link: '/onboarding/done'
  }
];

const VerticalProgressBar = ({ currentIndex }) => {
  return (
    <div className={style.container}>
      {steps.map((step, index) => {
        const stepClass = index <= currentIndex ? style.stepEnabled : style.stepDisabled;
        const lineClass = index <= currentIndex ? style.lineEnabled : style.lineDisabled;
        const circleClass = index <= currentIndex ? style.circleEnabled : style.circleDisabled
        const active = index <= currentIndex;

        return (
          <div key={index}>
            {index ? (<div className={lineClass}></div>) : null }
            <div className={stepClass}>
              <div className={circleClass}></div>
              {active ?
                (<Link className={style.link} to={step.link} disabled={false}>{step.name}</Link>) :
                (<div className={style.name}>{step.name}</div>)
              }
            </div>
          </div>
        )
      } )}
    </div>
  )
}


export default VerticalProgressBar;

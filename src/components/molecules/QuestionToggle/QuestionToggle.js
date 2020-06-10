import React, { useState } from 'react';

import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './QuestionToggle.module.scss'

const QuestionToggle = ({ question, children }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div style={{ marginBottom: 16 }}>
      <div
        onClick={() => setShowAnswer(!showAnswer)}
        className={style.questionSection}
      >
        <FontAwesomeIcon
          className={style.icon}
          icon={showAnswer ? faCaretDown: faCaretRight}
        />
        <div className={style.question}>{question}</div>
      </div>
      {showAnswer && (<div className={style.answer}>{children}</div>)}
    </div>
  )
}


export default QuestionToggle

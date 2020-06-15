import React from 'react';

import style from './FAQScreen.module.scss'
import { QuestionToggle } from 'components/molecules'
import { Card } from 'components/atoms'
import faqs from 'data/faqs.json'

const FAQScreen = (props) => {

  return(
    <section className={style.container}>
      <Card className={style.contentCard}>
        <h3 className={style.title}>Frequently Asked Questions</h3>
        { faqs.map((faq, i) => (
          <QuestionToggle key={i} question={faq.question}>
            <p>
              {faq.answer}
            </p>
          </QuestionToggle>
        ))}
      </Card>
    </section>
  )
}

export default FAQScreen;

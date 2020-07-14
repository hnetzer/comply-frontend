import React, { useState } from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { sendFeedback } from 'network/api'

import Modal from 'react-bootstrap/Modal'
import { Card, Button } from 'components/atoms';
import { faComments, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './FeedbackCard.module.scss';

const formSchema = Yup.object().shape({
  feedback: Yup.string().required(),
});

const FeedbackCard = () => {
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (values) => {
    try {
      await sendFeedback(values)
      setSubmitted(true)
      return;
    } catch (err) {
      console.error(err)
    }
  }

  const renderForm = () => {
    return (
      <Formik initialValues={{ feedback: '' }} onSubmit={handleSubmit} validationSchema={formSchema}>
      {({ values, errors, handleSubmit, isSubmitting, isValid }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            className={isValid ? style.textAreaValid : style.textAreaError}
            as="textarea"
            name="feedback" />
          <div className={style.submitContainer}>
            <Button disabled={!isValid} variant="secondary" type="submit">Send feedback</Button>
          </div>
        </Form>
      )}
      </Formik>
    )
  }

  const renderSubmitted = () => {
    return (<div className={style.submittedContainer}>
      <FontAwesomeIcon className={style.checkCircleIcon} icon={faCheckCircle} />
      <h5>Your feedback has been submitted.</h5>
    </div>)
  }

  const onHideModal = () => {
    setShowModal(false)
    setSubmitted(false)
  }

  return (
  <>
    <Card className={style.card}>
      <h4 className={style.title}>Feedback</h4>
      <div className={style.iconSection}>
        <FontAwesomeIcon className={style.icon} icon={faComments} />
     </div>
     <Button outline onClick={() => setShowModal(true)}>Let Us Know</Button>
    </Card>
    <Modal show={showModal} onHide={onHideModal}>
      <Modal.Header closeButton>
        <h4>We appreciate your feedback</h4>
      </Modal.Header>
      <Modal.Body>
        {!submitted ? renderForm() : renderSubmitted()}
      </Modal.Body>
    </Modal>
  </>
  )
}

export default FeedbackCard;

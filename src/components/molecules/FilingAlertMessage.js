import React from 'react';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert'


const SUBMITTED_MESSAGE = 'Thanks we are processing your filing and will be in touch soon.';
const FOLLOW_UP_MESSAGE = 'We reviewed your filing and we found some issues. Please re-submit.'
const NEEDS_PAYMENT_SIGNATURE_MESSAGE = (<>
  <Alert.Heading>{`You're filing is almost done!`}</Alert.Heading>
  <p>{`Please keep an eye on your inbox. We will be sending you emails to:`}</p>
  <p>{`1) Sign your filing digitally via Docusign`}</p>
  <p>{`2) Pay the filing fee via online form`}</p>
</>)
const FILED_MESSAGE = (<>
  <Alert.Heading>{`You've filed!`}</Alert.Heading>
  <p>{`We've sent your filing to the agency.`}</p>
  <a href="/">Download filing document</a>
</>)


const FilingAlertMessage = ({ status, messages, filing }) => {

  const show = () => {
    console.log(status)
    switch(status) {
      case 'draft': return false
      case 'submitted': return true
      case 'needs-follow-up': return true
      case 'needs-signature-payment': return true
      case 'filed': return true
      default: return false
    }
  }

  const text = () => {
    switch(status) {
      case 'submitted': return SUBMITTED_MESSAGE
      case 'needs-follow-up': return renderFollowUpMessage()
      case 'needs-signature-payment': return NEEDS_PAYMENT_SIGNATURE_MESSAGE
      case 'filed': return FILED_MESSAGE
      default: return null
    }
  }

  const variant = () => {
    switch(status) {
      case 'submitted': return "info"
      case 'needs-follow-up': return "warning"
      case 'needs-signature-payment': return "info"
      case 'filed': return "success"
      default: return "info"
    }
  }

  const compareByCreatedDate = (a, b) => {
    const dueA = moment(a.createdAt).unix()
    const dueB = moment(b.createdAt).unix()
    if (dueA > dueB) {
      return 1
    } else if (dueA < dueB) {
      return -1
    }
    return 0
  }

  const renderFollowUpMessage = () => {
    const sortedByMostRecent = messages.sort(compareByCreatedDate)
    const message = sortedByMostRecent.find(message => {
      return (message.user.roles.indexOf("admin") !== -1)
    });

    if(!message) {
      return FOLLOW_UP_MESSAGE
    }

    return (<>
      <Alert.Heading>{`A message from ${message.user.name} @ Comply`}</Alert.Heading>
      <p>{message.content}</p>
    </>)
  }

  return (
    <Alert show={show()} style={{ marginTop: 16, width: 550 }} variant={variant()}>
      {text()}
    </Alert>
  )
}

export default FilingAlertMessage;

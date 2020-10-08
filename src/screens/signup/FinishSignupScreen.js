import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { navigate } from "@reach/router"

import { updateUser, loginRequest } from 'network/api';
import { login } from 'actions';
import { Card, Button } from 'components/atoms'

import styles from './Signup.module.scss'

const formSchema = Yup.object().shape({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  password: Yup.string().required()
});

const FinishSignupScreen = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)

  if (!props.userId) {
    setErrorMessage("No userId set")
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
    };

    try {
      const user = await updateUser(props.userId, data)
      const response = await loginRequest(user.email, values.password)
      props.dispatch(login(response))

      navigate(`/onboarding/company/${user.company_id}`)

    } catch (err) {
      console.log(err)
      setErrorMessage(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wordmarkLogo}>
        Comply
      </div>
      <Card className={styles.card}>
        <div className={styles.title}>Finish Signing Up</div>
        <p className={styles.subtitle}>Access your compliance dashboard in one easy step.</p>
        <Formik validationSchema={formSchema} initialValues={{ email: '' }} onSubmit={handleSubmit}>
          {({ values, errors, handleSubmit, isSubmitting,isValid }) => (
            <Form style={{ width: '100%'}}>
              <Field name="first_name" placeholder="First Name" className={styles.input} />
              <Field name="last_name" placeholder="Last Name" className={styles.input} />
              <Field type="password" name="password" placeholder="Password" className={styles.input} />
              <Button type="submit" disabled={!isValid} className={styles.cta}>Agree and Continue</Button>
            </Form>
          )}
        </Formik>
        <p className={styles.agreeText}>
          {`By continuing, you agree to our `}
          <a href="https://thinkcomply.com/terms">terms</a>
          {` and `}
          <a href="https://thinkcomply.com/policy">policy</a>
        </p>
        <div className={styles.error}>
          {errorMessage}
        </div>
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(FinishSignupScreen);

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Input, Button, Alert } from 'components/atoms'

import style from './createAccountForm.module.scss';

const formSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().min(4, 'To short!').required('Required')
});


const CreateAccountForm = (props) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    await props.handleSubmit(values, { setSubmitting })
  }

  const renderErrorMessage = () => {
    if(!props.errorMessage) return null;

    return (
      <Alert style={{ width: '100%' }} variant="danger">
        {props.errorMessage}
      </Alert>
    );
  }

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={formSchema}
      validateOnMount={true}
      onSubmit={handleSubmit}
    >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      isValid
      /* and other goodies */
    }) => {
      return (
        <>
        {renderErrorMessage()}
        <Form noValidate onSubmit={handleSubmit}>
          <div className={style.formRow}>
            <Input
              type="text"
              name="firstName"
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              isInvalid={touched.firstName && errors.firstName} />
            <Input
              type="text"
              name="lastName"
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              isInvalid={touched.lastName && errors.lastName} />
          </div>
          <div className={style.formRow}>
            <Input
              type="text"
              name="title"
              label="Title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              isInvalid={touched.title && errors.title} />
            <Input
              type="text"
              name="company"
              label="Company"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.company}
              isInvalid={touched.company && errors.company} />
          </div>
          <Input
            type="email"
            name="email"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            isInvalid={touched.email && errors.email} />
          <Input
            type="password"
            name="password"
            label="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            isInvalid={touched.password && errors.password} />
          <Button
            disabled={!isValid}
            variant="secondary"
            className={style.submitButton}
            type="submit">
            Create account
          </Button>
        </Form>
        </>
      )}
    }
    </Formik>
  );
}

export default CreateAccountForm;

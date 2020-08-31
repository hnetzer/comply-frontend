import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Switch, Button } from 'components/atoms'

import style from './accountSettingsForm.module.scss'

const formSchema = Yup.object().shape({
  notifications: Yup.boolean().required(),
});

const AccountSettingsForm = ({ settings, onSuccess, onError, dispatch }) => {
  const handleSubmit = async (values, { setSubmitting }) => {

    console.log(values)
    try {
      // const response = await updateCompany(data, user.company_id)
      // dispatch(setCompanyDetails(response))
      //onSuccess(response)
    } catch (err) {
      onError(err)
    }
  }

  return (
    <Formik
      initialValues={settings}
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
    }) => (
        <Form className={style.formContainer}>
          <div>
            <div className={style.settingLabel}>Filing Notifications</div>
            <p>Recieve an email notification 6 weeks before each filing is due</p>
            <Switch
              name="notifications"
              value={values.notifications}
              onChange={handleChange}
            />
          </div>
          <Button
            style={{ marginTop: 100, width: 100 }}
            disabled={!isValid || (values.notifications === settings.notifications)}
            variant="secondary"
            type="submit">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
}

AccountSettingsForm.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
}

const mapStateToProps = state => {
  return {
    settings: { notifications: false },
    company: state.company.company
  }
}

export default connect(mapStateToProps)(AccountSettingsForm);

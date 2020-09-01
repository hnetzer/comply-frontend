import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import api from 'network/api'
import { updateUserSettings } from 'actions';
import { Switch, Button } from 'components/atoms'

import style from './userSettingsForm.module.scss'

const formSchema = Yup.object().shape({
  notifications: Yup.boolean().required(),
});

const UserSettingsForm = ({ user, settings, onSuccess, onError, dispatch }) => {
  const handleSubmit = async (values, { setSubmitting }) => {

    console.log(values)
    try {
      const response = await api.updateUserSettings(user.id, values)
      dispatch(updateUserSettings(response))
      onSuccess(response)
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

UserSettingsForm.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
}

const mapStateToProps = state => {
  const user = state.auth.user
  const settings = user != null ? user.settings : null;
  return {
    user: user,
    settings: settings != null ? settings : { notifications: false },
    company: state.company.company
  }
}

export default connect(mapStateToProps)(UserSettingsForm);

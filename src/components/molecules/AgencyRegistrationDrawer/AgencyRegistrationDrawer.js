import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Drawer, Button } from 'components/atoms'
import style from './AgencyRegistrationDrawer.module.scss'

import { updateCompanyAgency } from 'network/api'


const AgencyRegistrationDrawer = ({ agency, show, onHide, user, refreshDashboard }) => {
  if (!agency || !show) return null;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = { registration: values.registration_date }
      await updateCompanyAgency(data, user.company_id, agency.id)
      refreshDashboard()
      onHide()
    } catch (err) {
      // TODO: show error message to user
      console.error(err)
    }
  }

  return (
    <Drawer show={show} onHide={onHide}>
      <div className={style.content}>
        <div >
          <h4 className={style.agency}>{agency.name}</h4>
          <h5 className={style.jurisdiction}>{agency.jurisdiction.name}</h5>
        </div>
        <p className={style.description}>Enter the date that your company registered with this agency:</p>
        <Formik initialValues={{ registration_date: agency.registration || '' }} onSubmit={handleSubmit}>
          {({ values, errors, isValid }) =>
            (
              <Form className={style.form}>
                <div>
                  <div className={style.formLabel}>Registration Date</div>
                  <Field as="input" type="date" name="registration_date" />
                </div>
                <Button className={style.submit} disabled={!isValid} variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            )
          }
        </Formik>
      </div>
    </Drawer>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(AgencyRegistrationDrawer);

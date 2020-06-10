import React from 'react';

import style from './GuideScreen.module.scss'
import { Card } from 'components/atoms'

const GuideScreen = (props) => {

  return(
    <section className={style.container}>
      <Card className={style.contentCard}>
        <div className={style.title}>
          <h3>10 Step Guide to Filing</h3>
          <h6>Ten simple steps to make your filings feel easy.</h6>
        </div>

        <div className={style.step}>
          <h5>Step 1 - Check the Mail</h5>
          <p>
            {`Check your mail for any agency notices. The notice will likely
              contain your registration ID and, if required, an Online PIN for
              accessing the agency’s online portal.`}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 2 - Gather Log-in Details</h5>
          <p>
            {`Obtain your company’s registration ID and, if required, your
              Online PIN. You can find this on the notice in Step 1, a prior
              filing or your original registration documents. Sometimes you
              can run a business search to obtain the ID if it is public. `}
          </p>
          <p>
            {`You may also need some basic information about your company:
              including your Federal Employment ID Number (EIN).  `}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 3 - Log into the Agency Filing Portal</h5>
          <p>
            {`Log into the agency website and navigate to the filing portal.
              Most agencies allow/require an online filing. In some cases you
              will have to download a PDF and complete it by hand.`}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 4 - Review the Filing Information Request</h5>
          <p>
            {`Agencies will ask information about your business including basic
              information like your mailing address, phone, and email. The filing
              will also require more detailed information including information
              about your directors, officers, shares/cap table, and financial
              information. Note down the information you don’t have. `}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 5 - Gather Filing Information</h5>
          <p>
            {`Based on the information identified in Step 4, access your
              resources to obtain the information. Sources of information
              include your original organizational documents (resolutions),
              prior year federal income tax filings, payroll data including
              headcount and employee locations, financial statements, cap table,
              and property schedules. In some cases detailed information is
              required that isn’t contained in your financial statements, such
              as schedules showing sales by location.`}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 6 - Log-in and Complete the Filing</h5>
          <p>
            {`You should now be ready to log into the Filing Portal and
              complete the Filing. `}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 7 - Sign</h5>
          <p>
            {`The Filing likely requires the signature of an authorized signer -
              i.e., someone who is authorized to bind the company. In some cases,
              this must be an officer of the company.`}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 8 - Review and Pay the Taxes and Fees</h5>
          <p>
            {`Review the filing calculation of the taxes and fees and enter
              your bank ACH or credit card details (when available). Note that
              some agencies charge a convenience fee on credit card transactions.
              For some Filings, payment can be made via check, in which case the
              Filing will provide a payment voucher or payment instructions. `}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 9 - Save the Confirmation</h5>
          <p>
            {`You should save a confirmation of the Filing and Payment. This
              will be evidence in case the agency later claims the Filing
              was not received or was late. `}
          </p>
        </div>
        <div className={style.step}>
          <h5>Step 10 - Send to your Accountant</h5>
          <p>
            {`Your accountant will need evidence of the payment to categorize
              it correctly in your accounting system. Send a copy of the
              confirmation to your accountant.`}
          </p>
        </div>
      </Card>
    </section>
  )
}

export default GuideScreen;

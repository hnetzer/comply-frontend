import React from 'react';

import style from './FAQScreen.module.scss'
import { Card } from 'components/atoms'

const FAQScreen = (props) => {

  return(
    <section className={style.container}>
      <Card className={style.contentCard}>
        <h3 className={style.title}>Frequently Asked Questions</h3>
        <div className={style.question}>
          <h5>Do I need to register with a state secretary of state?</h5>
          <p>
            {`The rules for determining if you need to register with a state
            Secretary of State are written very broadly. Generally, a company is
            required to obtain authorization to conduct business in the state if
            it is “doing business” within the state borders. The definition of
            what qualifies as doing business varies by state, but usually looks
            at whether the company has a physical location, employees, or
            regularly binds contracts in that state.`}
          </p>
        </div>
        <div className={style.question}>
          <h5>Do I need to register with a city agency or obtain a business license?</h5>
          <p>
            {`Nearly all cities (and some counties) require you to obtain a
              business license to be authorized to conduct business within the
              city. Generally, having a physical presence in the city is
              sufficient to require a business license. `}
          </p>
        </div>
        <div className={style.question}>
          <h5>Do I need to register with the city agency that oversees business licenses for remote employees?</h5>
          <p>
            {`Yes. Having a remote employee work from home counts as sufficient
              business nexus with the city to require a business license. This
              requirement is often overlooked. `}
          </p>
        </div>
        <div className={style.question}>
          <h5>What is a registered agent and do I need one?</h5>
          <p>
            {`You may need to file an annual report through a registered agent
              who has a physical address in the state where your employees
              operate so you can receive legal documents on behalf of your
              business. Registered agents are generally required. `}
          </p>
        </div>
        <div className={style.question}>
          <h5>Do I need to comply with employee and labor rules?</h5>
          <p>
            {`Any required employee and labor obligations should be considered
              in each state you have offices and remote employees. Broadly,
              these obligations include registering with the department
              that oversees labor regulations, obtaining a withholding
              and unemployment insurance IDs, and obtaining workers
              compensation insurance. This is not an exhaustive list and you
              should consult with your employment attorney or payroll provider. `}
          </p>
        </div>
        <div className={style.question}>
          <h5>Do I need to comply with sales tax obligations?</h5>
          <p>
            {`If you sell a taxable product within a state you may be required
              to register for a sales tax permit and comply with the sales
              tax collection, remittance, and reporting requirements. You should
              speak with your advisors to determine if you have sales tax obligations. `}
          </p>
        </div>
        <div className={style.question}>
          <h5>Does Comply support specialized business licenses and permits?</h5>
          <p>
            {`We support general business registrations. We don’t support specialized
              business licenses, registrations and permits at the federal and
              state and local level for businesses engaged in: agriculture, the
              sale of alcohol and tobacco, transportation and a host of other
              specialized businesses. Speak with your advisor to determine
              if a specialized license applies to your business. `}
          </p>
        </div>
        <div className={style.question}>
          <h5>Do you track ‘doing business as’ (DBA) renewals?</h5>
          <p>
            {`If you operate your business under a name different from your
              entity’s legal name, you may be required to obtain a DBA from
              your county or local jurisdiction. A DBA must be renewed.
              We don’t track DBA renewals.`}
          </p>
        </div>
        <div className={style.question}>
          <h5>How are my filings determined?</h5>
          <p>
            {`Comply determines your filing obligations based on your
              registrations and where you are located. If your business is
              located in a city you may be required to register with the
              state, county, and city agencies to obtain authorization to
              conduct business and pay the required taxes and fees. If you
              add a new location, Comply assumes that you are registered
              (or intend to register) with each agency. If the agency does not
              apply to your business, you can remove the agency by de-selecting
              it during the set-up process. Once de-selected, the agency filing
              obligations will not appear in your filing list and will not be
              prepared by Comply.`}
          </p>
        </div>
        <div className={style.question}>
          <h5>What if I open up a new location or hire a remote employee in a new location?</h5>
          <p>
            {`Your business might have additional obligations if it is physically
              located in, or if it “does business” in, a state, county, or city
              jurisdiction. Your business might need to register in the jurisdiction
              and the jurisdiction may require some combination of registration fees,
              periodic reporting, and payment of annual taxes.`}
          </p>
          <p>
            {`Comply recommends that you consult your legal or accounting advisor
              about whether or not your company is required to register in a
              particular jurisdiction. Currently, Comply does not offer registration
              services but we can refer you to a registered agent for assistance.`}
          </p>
          <p>
            {`If you register in a new jurisdiction, you need to update your
              registration information in the Company Section of the website.
              Once updated, Comply will handle all of your ongoing filing obligations.`}
          </p>
        </div>
        <div className={style.question}>
          <h5>How do I report personal property?</h5>
          <p>
            {`Property tax reporting is complex and requires detailed asset schedules.
              The reported assets include business property like computers, equipment,
              office furniture, and supplies. Not surprisingly, most businesses do not
              keep accurate records of all their asset purchases and disposals. In advance
              of the deadline, we recommend that you start an inventory of your assets.
              Review Amazon, Apple purchases, and other vendors to identify purchases.  `}
          </p>
        </div>
        <div className={style.question}>
          <h5>When do I ask my advisors about compliance?</h5>
          <p>
            {`There may be compliance issues that require the advice of an attorney
              or accountant/CPA. We will let you know if we identify any issues
              for your consideration and refer you to an attorney or CPA. Note that
              we are not attorneys or CPA’s.`}
          </p>
        </div>
        <div className={style.question}>
          <h5>What is a State Registration Renewal?</h5>
          <p>
            {`A registration renewal is a filing to keep the entity in good standing
              with the state and authorize the business to operate.
              Registration renewals go by many names but are usually
              handled by the Secretary of State or equivalent agency.
              The registration renewal filing name include: Annual Report,
              Annual Registration, and Bi-ennial Statement. `}
          </p>
        </div>
        <div className={style.question}>
          <h5>What are the City Requirements?</h5>
          <p>
            {`Cities generally have both license requirements and city taxes.`}
          </p>
        </div>
        <div className={style.question}>
          <h5>What happens if I am audited?</h5>
          <p>
            {`If you are subject to an audit, you should seek the advice of an
              attorney or CPA. Our platform will have a record of all filings
              upcoming and past filings through our system. Adjustments or
              amended filings will not be reflected in our system and should
              be retained separately. `}
          </p>
        </div>
        <div className={style.question}>
          <h5>What happens if I miss a Filing deadline?</h5>
          <p>
            {`If you find that prior period filings are due, you will need to
              work with an attorney or CPA to process the overdue filings.
              These should be retained with your records.`}
          </p>
        </div>
        <div className={style.question}>
          <h5>How many Jurisdictions are There?</h5>
          <p>
            {`There are 160,000 agencies in the US and we are working hard to
              cover all jurisdictions. If you are located in a jurisdiction
              we do not cover, we will let you know. In that case, you will
              need to track and file the relevant filings outside of the
              Comply platform. Sorry about that!  `}
          </p>
        </div>
        <div className={style.question}>
          <h5>What is my Fiscal Year End?</h5>
          <p>
            {`The company fiscal year end is usually December 31.
              However, some companies elect to have a different year end,
              commonly: March 31, June 30, September 30. You can find your year
              end in your By-Laws or Operating Agreement. However, companies can
              change year ends without updating these documents. Note: the year
              end you select will impact the filing due dates.`}
          </p>
        </div>
      </Card>
    </section>
  )
}

export default FAQScreen;

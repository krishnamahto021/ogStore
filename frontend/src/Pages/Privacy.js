import React from "react";
import Layout from "../Components/Layouts/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="font-otherText flex flex-col gap-10  p-2 -mt-10">
        <div className="privacyContainer p-2">
          <p className="text-4xl md:text-6xl font-bold py-2">
            Privacy Policy for OgStore
          </p>
          <p className="text-lg text-textOne p-2">
            OgStore is committed to protecting the privacy and security of the
            personal information that we collect from our users. This Privacy
            Policy outlines the types of personal information we collect, how we
            use and share this information, and the steps we take to protect the
            privacy and security of your personal information.
          </p>
        </div>
        <div className="informationContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Information Collection
          </p>
          <p className="text-lg">
            Og Store collects personal information when you create an account,
            place an order, participate in surveys or contests, or communicate
            with us through our website or other channels. This information may
            include your name, email address, telephone number, postal address,
            payment information, and any other information you choose to
            provide.
          </p>
        </div>
        <div className="useOfPersonalContainer p-2">
          <p className="text-2xl text-textFour font-medium ">
            Use of Personal Information
          </p>
          <p className="text-lg">
            OgStore uses your personal information to provide you with our
            products and services, to communicate with you about your orders and
            account, and to send you promotional and marketing materials. We may
            also use your personal information to improve our website and
            services, to analyze and understand our user base, and to detect and
            prevent fraud.
          </p>
        </div>

        <div className="sharingContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Sharing of Personal Information
          </p>
          <p className="text-lg">
            ogStore does not sell or rent your personal information to third
            parties for marketing purposes. However, we may share your personal
            information with third-party service providers who perform services
            on our behalf, such as shipping providers, payment processors, and
            data analysis firms. We will only share the personal information
            necessary for these third parties to perform their services, and we
            require that they protect the privacy and security of your personal
            information and use it only for the purpose for which it was shared.
          </p>
        </div>
        <div className="yourRights p-2">
          <p className="text-2xl text-textFour font-medium">
            Your Rights and Choices
          </p>
          <p className="text-lg">
            You have the right to access and correct your personal information,
            and to request that we delete your personal information. You can
            also opt out of receiving promotional and marketing communications
            from us by following the instructions in those communications.
          </p>
        </div>
        <div className="changesToPrivacy p-2">
          <p className="text-2xl text-textFour font-medium">
            Changes to This Privacy Policy
          </p>
          <p>
            This Privacy Policy may be updated from time to time to reflect
            changes in our practices or applicable laws. We will provide notice
            of any material changes to this Privacy Policy by posting the
            revised Privacy Policy on our website.
          </p>
        </div>
        <div className="useOfCookies p-2">
          <p className="text-2xl text-textFour font-medium">Use of Cookies</p>
          <p className="text-lg">
            ogStore uses cookies and other technologies to improve the
            functionality and user experience of our website and to track
            website usage and analytics. A cookie is a small data file that is
            stored on your device when you visit our website. Cookies enable us
            to remember your preferences, track your website usage, and provide
            you with relevant advertisements and promotions. You have the choice
            to accept or reject the use of cookies through your browser
            settings. If you choose to reject cookies, you may still use our
            website, but some features may be limited or not function as
            intended. By using our website, you consent to our use of cookies
            and similar technologies in accordance with this Privacy Policy
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;

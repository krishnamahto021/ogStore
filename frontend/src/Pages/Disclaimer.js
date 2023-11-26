import React from "react";
import Layout from "../Components/Layouts/Layout";

const Disclaimer = () => {
  return (
    <Layout>
      <div className="font-otherText  p-2 -mt-10 text-4xl md:text-6xl font-bold py-2">
        Disclaimer Policy
      </div>
      <div className="disclaimerPolicyContainer flex flex-col  gap-10 font-otherText p-2 text-lg">
        <div>
          The information provided by OgStore on its website, products, and
          services is for general informational purposes only. OgStore does not
          provide medical, legal, or other professional advice, and the
          information provided should not be relied upon as a substitute for
          professional advice.
        </div>
        <div>
          OgStore makes no representations or warranties of any kind, express or
          implied, about the completeness, accuracy, reliability, suitability or
          availability with respect to the website or the information, products,
          services, or related graphics contained on the website for any
          purpose. Any reliance you place on such information is therefore
          strictly at your own risk.
        </div>
        <div>
          In no event will OgStore be liable for any loss or damage including
          without limitation, indirect or consequential loss or damage, or any
          loss or damage whatsoever arising from loss of data or profits arising
          out of, or in connection with, the use of this website, products, or
          services.
        </div>
        <div>
          Through this website you may be able to link to other websites which
          are not under the control of OgStore. We have no control over the
          nature, content and availability of those sites. The inclusion of any
          links does not necessarily imply a recommendation or endorse the views
          expressed within them.
        </div>
        <div>
          Every effort is made to keep the website up and running smoothly.
          However, OgStore takes no responsibility for, and will not be liable
          for, the website being temporarily unavailable due to technical issues
          beyond our control.
        </div>
        <div>
          OgStore reserves the right to make changes to its website, products,
          services, and policies at any time without prior notice.
        </div>
        <div>
          If you have any questions or concerns about our return policy, please
          contact us at Email: support@ifeelogstore.com, Phone: 079-482-22175 .
          Our customer support team is here to assist you and ensure that you
          have a positive experience with OgStore.
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;

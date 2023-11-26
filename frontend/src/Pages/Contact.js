import React from "react";
import Layout from "../Components/Layouts/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="font-otherText  p-2 -mt-10 text-4xl md:text-6xl font-bold py-2">
       Contact Us
      </div>
      <div className="disclaimerPolicyContainer flex flex-col  gap-10 font-otherText p-2 text-lg">
        <div>
          If you have any questions, concerns, or feedback about our website,
          products, or services, please dont hesitate to reach out to us. You
          can contact us by email, phone, or mail using the information below:
        </div>
        <div>
          Email: adminEmail <br></br> Phone: adminPhone
        </div>
        <div>
          Our customer support team is available betweeen 9AM to 6PM
          (Monday-Saturday) to assist you with any inquiries or issues you may
          have.
        </div>
        <div>
          Thank you for choosing OgStore. We appreciate your business and look
          forward to hearing from you.
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

import React from "react";
import Layout from "../Components/Layouts/Layout";
const Refund = () => {
  return (
    <Layout
      title={"Refund Policy | ogStore"}
      author={"ogStore"}
      keywords={"ogStore, refund policy, return process, sneaker refunds"}
      description={
        "Understand ogStore's refund policy for premium sneakers. Learn about the return process and our commitment to ensuring customer satisfaction."
      }
    >
      <div className="font-otherText flex flex-col gap-10  p-2 -mt-10">
        <div className="refundPolicy p-2">
          <p className="text-4xl md:text-6xl font-bold py-2">Return Policy</p>
          <p className="text-lg text-textOne p-2">
            Your satisfaction is our top priority at ogStore. If you are not
            completely satisfied with your purchase, you may be eligible to
            return the item for a refund or exchange. Please read the following
            information carefully to understand our return policy.
          </p>
        </div>
        <div className="eligibilityContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Refund Policy for ogStore
          </p>
          <p className="text-lg">
            At ogStore, we are committed to providing high-quality products and
            a positive customer experience. If you are not completely satisfied
            with your purchase, we offer a refund or exchange policy to ensure
            that you are happy with your experience.
          </p>
        </div>
        <div className="eligibilityContainer p-2">
          <p className="text-2xl text-textFour font-medium ">
            Eligibility for Refunds
          </p>
          <p className="text-lg">
            If you are not completely satisfied with your purchase, you may be
            eligible for a refund within 48 Hours from the date of delivery.
            Refunds will be issued for products that are defective, damaged, or
            parts are missing. Refunds will also be issued for products that
            were not as described on our website.
          </p>
        </div>

        <div className="requestRefundContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            How to Request a Refund ?
          </p>
          <p className="text-lg">
            To initiate a refund, please contact us at Email: adminEmail ,
            Phone: adminPhone within 48 Hours of receipt of your order. Our
            customer support team will provide you with a return authorization
            number and instructions for returning the item. We request you to
            kindly review our Return & Exchange Policy which outlines the
            following:
            <ul className="list-disc px-5 mt-1 font-semibold">
              <li> Once used, Items cannot be returned or refunded</li>
              <li>Damaged products are eligible for replacement or refund</li>
              <li>
                For a smooth return or refund, please provide images of the
                faulty/damaged product
              </li>
            </ul>
          </p>
        </div>
        <div className="returnGuildelinesContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            What are the return guidelines?
          </p>
          <p className="text-lg">
            <ul className="list-disc  px-6">
              <li>
                Your address and the item that you wish to return must be
                eligible for return.
              </li>
              <li>
                If the return is not eligible for Pickup, a Self-Return option
                will be given via support team.
              </li>
              <li>
                Once the return is received, you will, in accordance with
                ogStore refund policy, be issued a refund to your original
                payment method.
              </li>
            </ul>
            For Pay on Delivery orders, refunds will be processed to your bank
            account .
          </p>
        </div>
        <div className="refundProcessContainer p-2">
          <p className="text-2xl text-textFour font-medium">Refund Process</p>
          <p className="text-lg">
            Refunds will be processed within 14 days of receipt of the returned
            product. Refunds will be credited to the original payment method
            used for the purchase. If the original payment method is no longer
            available, our customer support will contact you!
          </p>
        </div>
        <div className="exclusionContainer p-2">
          <p className="text-2xl text-textFour font-medium">Exclusions</p>
          <p className="text-lg">
            This refund policy does not apply to products that have been used.
          </p>
        </div>
        <div className="changesRefundContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Changes to This Refund Policy
          </p>
          <p className="text-lg">
            This Refund Policy may be updated from time to time to reflect
            changes in our practices or applicable laws. We will provide notice
            of any material changes to this Refund Policy on our website.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Refund;

import React from "react";
import Layout from "../Components/Layouts/Layout";

const Return = () => {
  return (
    <Layout>
      <div className="font-otherText flex flex-col gap-10  p-2 -mt-10">
        <div className="returnPolicy p-2">
          <p className="text-4xl md:text-6xl font-bold py-2">Return Policy</p>
          <p className="text-lg text-textOne p-2">
            Your satisfaction is our top priority at ogStore. If you are not
            completely satisfied with your purchase, you may be eligible to
            return the item for a refund or exchange. Please read the following
            information carefully to understand our return policy.
          </p>
        </div>
        <div className="eligibilityContainer p-2">
          <p className="text-2xl text-textFour font-medium">Eligibility</p>
          <p className="text-lg">
            To be eligible for a return, the item must be in its original
            condition, unopened, and unused. Food and perishable items cannot be
            returned for health and safety reasons.
          </p>
        </div>
        <div className="returnProcessContainer p-2">
          <p className="text-2xl text-textFour font-medium ">Return Process</p>
          <p className="text-lg">
            To initiate a return, please contact us at Email: adminEmail, Phone:
            adminPhone within 48 Hours of receipt of your order. Our customer
            support team will provide you with a return authorization number and
            instructions for returning the item. We request you to kindly review
            our Return & Exchange Policy which outlines the following: - Once
            used, perfumes cannot be returned - Damaged products are eligible
            for replacement - For a smooth return or exchange process, please
            provide images of the faulty/damaged product
          </p>
        </div>

        <div className="refundContainer p-2">
          <p className="text-2xl text-textFour font-medium">Refunds</p>
          <p className="text-lg">
            Once we receive the returned item, we will inspect it to ensure that
            it meets the eligibility criteria for a refund. If the item is
            eligible for a refund, we will issue a refund to your original
            payment method. Please note that shipping fees are non-refundable.
          </p>
        </div>
        <div className="exchangeContainer p-2">
          <p className="text-2xl text-textFour font-medium">Exchanges</p>
          <p className="text-lg">
            If you would like to exchange an item, please contact us at
            adminEmail, Phone: adminPhone. Our customer support team will
            provide you with instructions for exchanging the item.
          </p>
        </div>
        <div className="damagedContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Damaged or Defective Items
          </p>
          <p className="text-lg">
            If you receive a damaged or defective item, please contact us at
            Email: adminEmail, Phone: adminPhone within 48 Hours of delivery.
            Our customer support team will provide you with instructions for
            returning the item and will issue a refund or exchange upon receipt
            and inspection of the damaged or defective item.
          </p>
        </div>
        <div className="returnShipping p-2">
          <p className="text-2xl text-textFour font-medium">Return Shipping</p>
          <p className="text-lg">
            You are responsible for the cost of return shipping. We recommend
            using a trackable shipping service and purchasing shipping insurance
            for your protection.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Return;

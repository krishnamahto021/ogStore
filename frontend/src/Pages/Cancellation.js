import React from "react";
import Layout from "../Components/Layouts/Layout";

const Cancellation = () => {
  return (
    <Layout>
      <div className="font-otherText flex flex-col gap-10  p-2 -mt-10">
        <div className="cancellationContainer p-2">
          <p className="text-4xl md:text-6xl font-bold py-2">
            Cancellation Policy
          </p>
          <p className="text-lg text-textOne p-2">
            At OgStore, we understand that sometimes plans change and you may
            need to cancel an order. Our Cancellation Policy provides
            information on how to cancel an order and the terms and conditions
            of cancellations.
          </p>
        </div>
        <div className="cancelOrderContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            How to Cancel an Order
          </p>
          <p className="text-lg">
            You can cancel items or orders by visiting the Your Orders section
            in Your Account.
            <p className="font-bold">
              To cancel orders that aren't dispatched yet:
            </p>
            <ul className="list-disc px-7">
              <li>Go to Your Orders</li>
              <li>Select the item you want to cancel and click Cancel items</li>
              <li>Provide reasons for cancellation (optional)</li>
              <li>Click on Cancel Checked Items</li>
            </ul>
            <p className="font-extrabold mt-3">
              We currently donot suppport order cancellation for the dispatched
              Items
            </p>
          </p>
        </div>
        <div className="processingContainer p-2">
          <p className="text-2xl text-textFour font-medium ">Processing Time</p>
          <p className="text-lg">
            Cancelled orders will be processed within 7 days of receipt of the
            cancellation request. Refunds will be credited to the original
            payment method used for the purchase. If the original payment method
            is no longer available, a store credit will be issued.
          </p>
        </div>

        <div className="changesToCancellationContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Changes to This Cancellation Policy
          </p>
          <p className="text-lg">
            This Cancellation Policy may be updated from time to time to reflect
            changes in our practices or applicable laws. We will provide notice
            of any material changes to this Cancellation Policy on our website.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Cancellation;

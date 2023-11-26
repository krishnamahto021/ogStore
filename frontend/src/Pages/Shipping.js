import React from "react";
import Layout from "../Components/Layouts/Layout";

const Shipping = () => {
  return (
    <Layout>
      <div className="font-otherText flex flex-col gap-10  p-2 -mt-10">
        <div className="shippingPolicy p-2">
          <p className="text-4xl md:text-6xl font-bold py-2">Shipping Policy</p>
          <p className="text-lg text-textOne ">
            ogStore offers shipping to customers within India. By placing an
            order through the Services, you agree to the terms and conditions of
            this Shipping Policy.
          </p>
        </div>
        <div className="shipMethodsContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Shipping Methods and Fees
          </p>
          <p className="text-lg">
            At ogStore, We provide standard shipping. We offer free shipping for
            prepaid orders above 2999 and standard delivery charges for COD
          </p>
        </div>
        <div className="shippingTimeFrameContainer p-2">
          <p className="text-2xl text-textFour font-medium ">
            Shipping Timeframes
          </p>
          <p className="text-lg">
            ogStore will make every effort to ship your order within 5-7 days of
            receipt of your order. ogStore is not responsible for any delays in
            shipping caused by carrier delays, weather, or other factors outside
            of our control.
          </p>
        </div>

        <div className="shippingAddressContainer p-2">
          <p className="text-2xl text-textFour font-medium">Shipping Address</p>
          <p className="text-lg">
            You are responsible for providing accurate and complete shipping
            information, including your name, address, and phone number. ogStore
            is not responsible for any delays or issues caused by incorrect or
            incomplete shipping information.
          </p>
        </div>
        <div className="internationalShippingContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            International Shipping
          </p>
          <p className="text-lg">
            At this time, ogStore only ships to customers within India.
          </p>
        </div>
        <div className="orderContainer p-2">
          <p className="text-2xl text-textFour font-medium">Order Tracking</p>
          <p className="text-lg">
            Once your order has been shipped, we will send you a WhatsApp
            notification with the tracking number. We will update the status of
            your order via WhatsApp.
          </p>
        </div>
        <div className="orderChangesContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Order Changes and Cancellations
          </p>
          <p className="text-lg">
            We understand that sometimes you may need to change or cancel your
            order. If you need to do so, you can cancel your order by logging
            into your account on our website and going to the Order section.
            From there, you can select the order you wish to cancel and follow
            the instructions provided. Alternatively, you can contact our
            customer support team at adminEmail with your order details, and we
            will assist you with cancelling your order. Please note that if your
            order has already been shipped, it cannot be cancelled. If you have
            any questions or concerns regarding your order, please contact us at
            adminEmail or adminPhone and we will do our best to assist you.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;

import React from "react";
import Layout from "../Components/Layouts/Layout";

const Terms = () => {
  return (
    <Layout
      title={"Terms and Conditions | ogStore"}
      author={"ogStore"}
      keywords={
        "ogStore, terms and conditions, legal agreement, premium sneakers"
      }
      description={
        "Read and understand the terms and conditions of shopping at ogStore for premium sneakers. Stay informed about our legal agreement and enjoy a secure shopping experience."
      }
    >
      <div className="font-otherText flex flex-col gap-10  p-2 -mt-10">
        <div className="cancellationContainer p-2">
          <p className="text-4xl md:text-6xl font-bold py-2">Terms of Use</p>
          <p className="text-lg text-textOne p-2">
            Welcome to Brand OgStore, a website owned and operated by OgStore
            (hereafter referred to as "Company," "we," "us," or "our"). By
            accessing and using our website, you agree to be bound by the
            following terms and conditions (hereafter referred to as "Terms of
            Use"). If you do not agree to these Terms of Use, please do not use
            our website.
          </p>
        </div>
        <div className="purposeContainer p-2">
          <p className="text-2xl text-textFour font-medium">Purpose</p>
          <p className="text-lg">
            Our website is a platform for customers to purchase food appliances
            and cookware products (hereafter referred to as "Products"). Our aim
            is to provide high-quality Products and a seamless online shopping
            experience for our customers.
          </p>
        </div>
        <div className="productsContainer p-2">
          <p className="text-2xl text-textFour font-medium ">Products</p>
          <p className="text-lg">
            All Products listed on our website are subject to availability. We
            reserve the right to discontinue or modify any Product at any time
            without prior notice. The prices for Products listed on our website
            are subject to change without notice.
          </p>
        </div>

        <div className="orderProcessingContainer p-2">
          <p className="text-2xl text-textFour font-medium">Order Processing</p>
          <p className="text-lg">
            By placing an order for Products on our website, you agree to pay
            the price for the Products, including all applicable taxes, shipping
            and handling charges. We reserve the right to cancel any order if we
            determine that the price was incorrect or if the Product is no
            longer available.
          </p>
        </div>
        <div className="paymentsContainer p-2">
          <p className="text-2xl text-textFour font-medium">Payments</p>
          <p className="text-lg">
            We accept payment through various methods, including credit card,
            debit card, and online payment platforms. By submitting payment
            information, you represent and warrant that you are authorized to
            use the payment method and that you authorize us to charge your
            payment method for the total amount of your order.
          </p>
        </div>
        <div className="shippingContainer p-2">
          <p className="text-2xl text-textFour font-medium">Shipping</p>
          <p className="text-lg">
            We aim to ship Products within a reasonable time after receiving
            your order. However, we do not guarantee delivery dates, and we
            shall not be liable for any damages resulting from a delay in
            shipping.
          </p>
        </div>

        <div className="returnAndRefundContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Returns and Refunds
          </p>
          <p className="text-lg">
            If you are not satisfied with a Product you have received, return it
            to us within a specified period of time, as stated in our Returns
            Policy. If a Product is returned in accordance with our Returns
            Policy, we will issue a refund or exchange the Product, as
            applicable
          </p>
        </div>

        <div className="userContentContainer p-2">
          <p className="text-2xl text-textFour font-medium">User Content</p>
          <p className="text-lg">
            Our website may allow you to submit, upload, publish, or otherwise
            make available content, including but not limited to text,
            photographs, and videos (hereafter referred to as "User Content").
            By making any User Content available through our website, you grant
            us a non-exclusive, transferable, sub-licensable, royalty-free,
            worldwide license to use, copy, modify, create derivative works
            based on, distribute, publicly display, and otherwise exploit your
            User Content in connection with the operation of our website or the
            promotion, advertising, or marketing of our website, in any form,
            media, or technology now known or later developed.
          </p>
        </div>

        <div className="propritaryContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            ProprietaryRights
          </p>
          <p className="text-lg">
            Our website and its content, including but not limited to text,
            photographs, graphics, images, illustrations, and software, are
            protected by copyright, trademark, and other proprietary rights.
            These rights are owned by us or our licensors and are protected by
            Indian and international laws. You agree not to use our website or
            its content for any commercial or illegal purposes.
          </p>
        </div>

        <div className="disclaimerOfWarrantyContainer p-2">
          <p className="text-2xl text-textFour font-medium">
            Disclaimer of Warranty
          </p>
          <p className="text-lg">
            Our website and its content are provided on an 'as is' basis without
            any representations or warranties of any kind, either express or
            implied, including but not limited to the implied warranties of
            merchantability, fitness for a particular purpose
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;

import React from "react";
import Layout from "../Components/Layouts/Layout";

const About = () => {
  return (
    <Layout
      title={"About Us | ogStore"}
      author={"ogStore"}
      keywords={"ogStore, about us, sneaker store, premium sneakers"}
      description={
        "Learn about ogStore, your go-to destination for high-quality and stylish sneakers. Discover our story and commitment to providing premium footwear."
      }
    >
      <div className="font-otherText  p-2 -mt-10 text-4xl md:text-6xl font-bold py-2 flex flex-col items-center gap-1 mb-10">
        <div>OgStore</div>
        <div className="text-textFour text-sm ml-5">Switch To Luxury</div>
      </div>
      <div className="disclaimerPolicyContainer flex flex-col  gap-10 font-otherText p-2 text-lg">
        <div>
          Welcome to OgStore, your ultimate destination for high-quality
          sneakers with all India shipping. At OgStore, we are passionate about
          providing sneaker enthusiasts with a curated selection of premium
          footwear that combines style, comfort, and craftsmanship. Our
          commitment to excellence extends beyond the sneakers we offer; it's
          embedded in our mission to deliver a seamless shopping experience to
          customers nationwide.
        </div>
        <div>
          At the heart of OgStore is a dedication to sourcing and curating a
          collection of sneakers that embody the spirit of authenticity and
          individuality. We understand that sneakers are not just accessories;
          they are a statement, a reflection of your unique style and
          personality. Our team of experts scours the globe to bring you the
          most sought-after and exclusive releases, ensuring that every pair you
          find at OgStore is a symbol of quality and distinction.
        </div>
        <div>
          Quality is paramount at OgStore. We believe that every sneaker should
          not only meet but exceed your expectations. That's why we collaborate
          with renowned brands and designers who share our commitment to
          excellence. Each pair of sneakers in our inventory undergoes a
          meticulous selection process to ensure it meets our stringent
          standards for craftsmanship, materials, and design. When you shop at
          OgStore, you're investing in a piece of footwear that not only looks
          exceptional but is also built to last.
        </div>
        <div>
          The OgStore experience goes beyond a transaction; it's a journey of
          passion and style. We understand the thrill of unboxing a new pair of
          sneakers, and we want every customer to feel that excitement when
          shopping with us. Our user-friendly website is designed to provide a
          seamless and enjoyable browsing experience, allowing you to explore
          our extensive collection, discover the latest releases, and find the
          perfect pair that resonates with your unique taste.
        </div>
        <div>
          As a team of sneaker enthusiasts ourselves, we know the importance of
          a trusted and reliable source for high-quality footwear. OgStore is
          not just a store; it's a community of like-minded individuals who
          share a love for sneakers and a commitment to authenticity. Our About
          Us page is a testament to our journey, our values, and the passion
          that drives us to bring you the best in the world of sneakers.
        </div>
        <div>
          Thank you for choosing OGStore as your go-to destination for premium
          sneakers. Whether you're a seasoned collector or a casual enthusiast,
          we invite you to join us on this exciting journey. Explore, shop, and
          experience the world of high-quality sneakers like never before, right
          here at OgStore.
        </div>
      </div>
    </Layout>
  );
};

export default About;

import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerOuterContainer bg-bgTwo text-textTwo text-lg  ">
      <div className="footerContainer  p-1 flex flex-col gap-2 items-center  md:flex-row md:justify-between ">
        <div className="socialMediaContainer flex  items-center justify-evenly gap-3 text-2xl">
          <span className="text-textFour">Join us On </span>
          <FaInstagram className="hover:scale-150 duration-200 cursor-pointer" />
          <FaWhatsapp className="hover:scale-150 duration-200 cursor-pointer" />
          <FaSquareFacebook className="hover:scale-150 duration-200 cursor-pointer" />
        </div>
        <div className="otherLinksContainer flex gap-10  justify-around ">
          <div className="shopLinks flex flex-col uppercase  p-2">
            <div className="text-textFour">Quick Links</div>
            <Link to="/for-him" >Him</Link>
            <Link to="/for-her">Her</Link>
            <Link to="/unisex">Unisex</Link>
            <Link to="/shop-all">All</Link>
          </div>
          <div className="supportConatiner uppercase flex flex-col p-2">
            <span className="text-textFour">Support</span>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact us</Link>
          </div>
          <div className="policyLinks flex flex-col gap-2  p-2 uppercase">
            <span className="text-textFour">Policies</span>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/shipping">Shipping Policy</Link>
            <Link to="/return">Return Policy</Link>
            <Link to="/refund">Refund Policy</Link>
            <Link to="/disclaimer">Disclaimer Policy</Link>
            <Link to="/cancellation">Cancellation Policy</Link>
            <Link to="/terms-of-use">Terms Of use</Link>
          </div>
        </div>
      </div>
      <div className="rightReservedContainer text-textFour ">
        <p className="text-center"> &#169;All rights reserved to ogStore</p>
      </div>
    </div>
  );
};

export default Footer;

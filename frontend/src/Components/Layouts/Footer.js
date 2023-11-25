import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footerOuterContainer bg-[#212529] text-[#F8F9FA] text-xl font-normal">
      <div className="footerContainer  p-1 flex flex-col gap-2 items-center  md:flex-row md:justify-between">
        <div className="socialMediaContainer flex  items-center justify-evenly gap-3 text-2xl">
          <span className="text-[#6C757D]">Join us On </span>
          <FaInstagram className="hover:scale-150 duration-200 cursor-pointer" />
          <FaWhatsapp className="hover:scale-150 duration-200 cursor-pointer" />
          <FaSquareFacebook className="hover:scale-150 duration-200 cursor-pointer" />
        </div>
        <div className="otherLinksContainer flex gap-20 items-center justify-evenly ">
          <div className="shopLinks flex flex-col items-center p-2">
            <div className="text-[#6C757D]">Quick Links</div>
            <div className="hover:scale-150 cursor-pointer duration-200">Him</div>
            <div className="hover:scale-150 cursor-pointer duration-200">Her</div>
            <div className="hover:scale-150 cursor-pointer duration-200">Unisex</div>
            <div className="hover:scale-150 cursor-pointer duration-200">All</div>
          </div>
          <div className="policyLinks flex flex-col gap-2  p-2">
            <span className="text-[#6C757D]">Policies</span>
            <div className="font-thin">Privacy Policy</div>
            <div>Shipping Policy</div>
            <div>Return Policy</div>
            <div>Refund Policy</div>
            <div>Disclaimer Policy</div>
            <div>Cancellation Policy</div>
          </div>
        </div>
      </div>
      <div className="rightReservedContainer text-[#6C757D] ">
        <p className="text-center"> &#169;All rights reserved to ogStore</p>
      </div>
    </div>
  );
};

export default Footer;

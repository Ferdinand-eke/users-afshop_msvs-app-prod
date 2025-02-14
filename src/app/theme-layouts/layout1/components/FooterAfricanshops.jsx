import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "@fuse/sitestaticdata/data";
import { Link } from "react-router-dom";

const FooterAfricanshops = () => {
  return (
    <div className="bg-[#000] text-white">
      {/* [#342ac8] */}
      {/* <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-green-700 py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
            Submit
          </button>
        </div>
      </div> */}
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          {/* <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
            style={{ filter: "brightness(0) invert(1)" }}
          /> */}
          <div className="flex items-center justify-start">
            <Link to={`/`}>
              <img
                className="mt-14 logo-icon cursor-pointer"
                // src="assets/images/logo/logo.svg"
                // src="assets/images/afslogo/afLogo.svg"
                src="assets/images/afslogo/afslogo.png"
                width={40}
                height={40}
                alt="logo"
              />
            </Link>
            <Typography
              className="react-text text-16 font-semibold cursor-pointer"
              component={NavLinkAdapter}
              to={`/`}
            >
              Africanshops
            </Typography>
          </div>
          <br />
          <p>Norturing African businesses and Ideologies.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Typography
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                component={NavLinkAdapter}
                to={link.link}
              >
                {link.name}
              </Typography>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Typography
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                component={NavLinkAdapter}
                to={link.link}
              >
                {link.name}
              </Typography>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Typography
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                component={NavLinkAdapter}
                to={link.link}
              >
                {link.name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2020 Africanshops. All rights reserved.</span>
        <span>Terms, Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FooterAfricanshops;

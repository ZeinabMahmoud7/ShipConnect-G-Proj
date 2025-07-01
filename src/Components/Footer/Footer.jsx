import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Logo from '../../assets/LogoShip.png'; // غيّري المسار حسب مكان اللوجو الحقيقي

const Footer = () => {
  return (
    <footer className="bg-[#10233E]  rounded-b-[30px] text-white pt-12">
    <div className="max-w-[1264px] mx-20 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-center lg:text-left">
  {/* Logo & Description */}
  <div className="space-y-4">
    <div className="flex items-center justify-center lg:justify-start gap-2">
      <img src={Logo} alt="ShipConnect Logo" className="w-20 h-20" />
      <span className="text-2xl font-semibold text-white">ShipConnect</span>
    </div>
    <p className="text-[16px] font-normal text-[#FFFFFF] max-w-sm mx-auto lg:mx-0">
      Connecting startups with reliable shipping companies. Simplifying logistics, saving time, and building trust.
    </p>
  </div>

  {/* Grouped Sections */}
  <div className="flex flex-col sm:flex-row justify-between gap-8">
    {/* Explore */}
    <div>
      <h4 className="font-bold text-[20px] mb-2 text-white">Explore</h4>
      <ul className="space-y-1 text-[16px] text-[#E4E6EC] font-normal">
        <li><a href="#">Course Overview</a></li>
        <li><a href="#">Levels</a></li>
        <li><a href="#">Challenges</a></li>
        <li><a href="#">Sign In</a></li>
      </ul>
    </div>

    {/* About Us */}
    <div>
      <h4 className="font-bold text-[20px] mb-2 text-white">About Us</h4>
      <ul className="space-y-1 text-[16px] text-[#E4E6EC] font-normal">
        <li><a href="#">Our Vision</a></li>
        <li><a href="#">Team</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Careers</a></li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="font-bold text-[20px] mb-2 text-white">Resources</h4>
      <ul className="space-y-1 text-[16px] text-[#E4E6EC] font-normal">
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Placement</a></li>
        <li><a href="#">Test</a></li>
        <li><a href="#">FAQs</a></li>
      </ul>
    </div>
  </div>
</div>


      {/* Bottom Orange Bar */}
      <div className="bg-brandOrange  text-center text-sm text-white py-3 rounded-b-[30px] mt-10">
        © 2025 ShipConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { FaUser, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#0B4C87] flex items-center justify-center px-4">
         <Navbar/>
      <div className="max-w-[1264px] w-full mx-20 mt-36 flex flex-col lg:flex-row gap-8 bg-transparent">
        {/* Left Section */}
        <div className="flex-1  text-white px-6 py-8">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="mb-6 text-[15px] leading-relaxed">
            Have questions, feedback, or partnership inquiries? <br />
            We'd love to hear from you! <br />
            Our team is here to support startups and shipping companies every step of the way. Reach out and let’s build something great together.
          </p>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-white" />
              info@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <FaWhatsapp className="text-white" />
              +201155366985
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 bg-white rounded-xl shadow-md px-8 py-10">
          <h3 className="text-center text-[#0B4C87] font-semibold text-xl mb-8">
            We’d Love to Hear From You!
          </h3>

          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0B4C87]">
                Full Name *
              </label>
              <div className="flex items-center border border-[#0B4C87] rounded-full px-4 py-2">
                <FaUser className="text-[#0B4C87] mr-2" />
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="flex-1 outline-none text-sm text-[#0B4C87] bg-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0B4C87]">
                Email *
              </label>
              <div className="flex items-center border border-[#0B4C87] rounded-full px-4 py-2">
                <FaEnvelope className="text-[#0B4C87] mr-2" />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 outline-none text-sm text-[#0B4C87] bg-transparent"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0B4C87]">
                Message *
              </label>
              <textarea
                rows="5"
                placeholder="Enter Your Message..."
                className="w-full border border-[#0B4C87] rounded-md px-4 py-2 text-sm text-[#0B4C87] outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0B4C87] text-white py-2 rounded-full font-semibold hover:bg-[#093965] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

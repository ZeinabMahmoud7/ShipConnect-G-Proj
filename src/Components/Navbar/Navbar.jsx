import React from 'react'
import Logo from '../../assets/LogoShip.png';
import { Link } from "react-router-dom";
import { useState,useEffect,useRef } from 'react';
import avatarNav from '../../assets/AvatarNav.jpg';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); 
      const dropdownRef = useRef(null);
      useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  return (
   <header className="fixed top-10 left-0 w-full z-50 px-5 lg:px-20">
    <div className="mx-auto max-w-[1264px] h-[70px] bg-[#153052]/35 rounded-[20px] px-4 md:px-[88px] py-4 flex justify-between items-center">

      {/* اللوجو */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="ShipConnect" className="h-10 w-auto object-contain" />
        <span className="text-white font-bold text-lg">ShipConnect</span>
      </div>

      {/* روابط النافبار */}
      <nav className="hidden md:flex gap-6 text-white text-base font-medium">
    <Link
        to="/"
        className="hover:bg-white/20 rounded-md px-2 py-1 transition-colors"
      >
        Home
      </Link>
      <Link
        to="contact-us"
        className="hover:bg-white/20 rounded-md px-2 py-1 transition-colors"
      >
        Contact Us
      </Link>
      <Link
        to="/conditions"
        className="hover:bg-white/20 rounded-md px-2 py-1 transition-colors"
      >
        Conditions
      </Link>
      </nav>
  {/* صورة اليوزر + المنيو */}
<div className="flex items-center gap-2 relative" ref={dropdownRef}>
  <button
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className="flex items-center gap-2 text-white p-1 hover:bg-white/20 rounded-md transition"
  >
    <img src={avatarNav} className="w-8 h-8 rounded-full" alt="Avatar" />
    <svg width="24" height="24" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.625 12.9375C8.625 12.9375 14.6091 21.0625 16.75 21.0625C18.8909 21.0625 24.875 12.9375 24.875 12.9375" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>

  {/* القائمة المنسدلة */}
  <div
    className={`absolute top-12 right-0 w-56 bg-white rounded-lg shadow-lg p-4 z-50 transition-all duration-500 ease-in-out
      ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
  >
    <div
      onClick={() => setIsDropdownOpen(false)}
      className="px-3 text-primaryBlue py-2 mb-2 text-center font-semibold rounded-md cursor-pointer hover:bg-gray-100"
    >
      Log in
    </div>
   <Link
  to="/dashboard"
  className="px-3 py-2 mb-2 rounded-md cursor-pointer text-center font-semibold text-primaryBlue hover:bg-gray-100 block"
>
  Register as Startup
</Link>
    <Link
    to="/dashboardShipping"
      onClick={() => setIsDropdownOpen(false)}
      className="px-3 py-2 rounded-md cursor-pointer text-center font-semibold text-primaryBlue hover:bg-gray-100"
    >
      Register as Shipping
    </Link>
  </div>
</div>

      {/* زر الموبايل */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 rounded-md hover:bg-white/20 transition-colors"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>
    </div>

    {/* قائمة الموبايل */}
    {menuOpen && (
      <nav className="lg:hidden bg-[#153052]/90 rounded-b-[20px] px-6 py-4 space-y-3 text-white font-medium text-base shadow-lg">
        <a href="#" className="block hover:bg-white/20 rounded-md px-2 py-1 transition-colors">Home</a>
        <a href="#" className="block hover:bg-white/20 rounded-md px-2 py-1 transition-colors">Contact Us</a>
        <a href="#" className="block hover:bg-white/20 rounded-md px-2 py-1 transition-colors">Conditions</a>
      </nav>
    )}
  </header>
  )
}

export default Navbar

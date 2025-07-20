import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/Logo.png';
import DefaultAvatar from '../../assets/Avatar.png';
import { Menu, X } from 'lucide-react';

export default function Sidebar({ navLinks, userName, userAvatar }) {
  const [open, setOpen] = useState(false);
const [dropdownOpen, setDropdownOpen] = useState(false);

  // نحدد الصورة من localStorage أو القيمة القادمة من props
  const [avatar, setAvatar] = useState(
    userAvatar || localStorage.getItem("profileImage") || DefaultAvatar
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const newAvatar = localStorage.getItem("profileImage") || DefaultAvatar;
      setAvatar(newAvatar);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* Navbar for small screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-customGray p-4 flex justify-between items-center shadow">
        <img src={Logo} alt="logo" className="h-8" />
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} className="text-primaryBlue" /> : <Menu size={28} className="text-primaryBlue" />}
        </button>
      </div>

      {/* Sidebar or Mobile Menu */}
      <aside
        className={`fixed md:relative top-16 md:top-0 left-0 h-full bg-customGray w-60 z-40 p-4 flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:flex`}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-2 px-2 mt-4">
          <img src={Logo} alt="Ship Connect Logo" className="h-14" />
        </div>

        {/* Navigation */}
        <nav className="space-y-4 mt-8">
          {navLinks.map(({ to, label, icon: Icon }) => (
     <NavLink
  key={to}
  to={to}
  end={
    to === "/dashboardShipping" ||
    to === "/dashboardAdmin" ||
    to === "/dashboard"
  }
  className={({ isActive }) => {
    // لو داشبورد لازم يتشيك إنه في المسار الرئيسي
    let isCurrent = isActive;
    if (to === "/dashboardShipping") {
      isCurrent = window.location.pathname === "/dashboardShipping";
    } else if (to === "/dashboardAdmin") {
      isCurrent = window.location.pathname === "/dashboardAdmin";
    } else if (to === "/dashboard") {
      isCurrent = window.location.pathname === "/dashboard";
    }

    return `w-full flex items-center justify-center gap-3 px-2 py-3 rounded-2xl text-sm font-semibold ${
      isCurrent
        ? 'bg-brandOrange text-white'
        : 'text-primaryBlue hover:bg-gray-100'
    }`;
  }}
>
  {({ isActive }) => (
    <>
      <Icon color={isActive ? "#fff" : "#204C80"} />
      <span className="font-semibold text-lg mt-1">{label}</span>
    </>
  )}
</NavLink>

          ))}
        </nav>

        {/* Profile */}
<div className="mt-10 flex items-center gap-3 px-2 relative profile-dropdown">
  {/* الصورة */}
  <div className="relative w-10 h-10">
    <img
      src={avatar}
      alt="User Avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
  </div>

  {/* اسم المستخدم */}
  {userName && (
    <span className="font-semibold w-100 text-primaryBlue text-md">
      {userName}
    </span>
  )}

  {/* زر السهم */}
  <button
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="focus:outline-none"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M18 9C18 9 13.581 15 12 15C10.419 15 6 9 6 9"
        stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>

  {/* القائمة المنسدلة */}
  {dropdownOpen && (
    <div
      className="absolute top-12 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md border border-gray-200 w-40 p-2 z-50 transition-all duration-300"
    >
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login"; // التوجيه إلى صفحة تسجيل الدخول
        }}
        className="w-full text-center px-3 py-2 text-red-600 font-semibold hover:bg-red-50 hover:text-red-700 rounded-md transition"
      >
        Logout
      </button>
    </div>
  )}
</div>


      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

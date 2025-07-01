import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/Logo.png';
import Avatar from '../../assets/Avatar.png';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
   const Dash = ({ color = "#204C80" }) => (


<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8125 7.875C15.5729 7.875 17 6.44791 17 4.6875C17 2.92709 15.5729 1.5 13.8125 1.5C12.0521 1.5 10.625 2.92709 10.625 4.6875C10.625 6.44791 12.0521 7.875 13.8125 7.875Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.1875 7.875C6.94791 7.875 8.375 6.44791 8.375 4.6875C8.375 2.92709 6.94791 1.5 5.1875 1.5C3.42709 1.5 2 2.92709 2 4.6875C2 6.44791 3.42709 7.875 5.1875 7.875Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.8125 16.5C15.5729 16.5 17 15.0729 17 13.3125C17 11.5521 15.5729 10.125 13.8125 10.125C12.0521 10.125 10.625 11.5521 10.625 13.3125C10.625 15.0729 12.0521 16.5 13.8125 16.5Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.1875 16.5C6.94791 16.5 8.375 15.0729 8.375 13.3125C8.375 11.5521 6.94791 10.125 5.1875 10.125C3.42709 10.125 2 11.5521 2 13.3125C2 15.0729 3.42709 16.5 5.1875 16.5Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  );
    const Ship = ({ color = "#204C80" }) => (
<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 16.5C8.8865 16.5 8.3 16.2525 7.12775 15.7575C4.2095 14.5245 2.75 13.9072 2.75 12.87V5.25M9.5 16.5C10.1135 16.5 10.7 16.2525 11.8723 15.7575C14.7905 14.5245 16.25 13.9072 16.25 12.87V5.25M9.5 16.5V8.51625M5 9L6.5 9.75M13.25 3L5.75 6.75M6.7445 7.26825L4.55375 6.2085C3.3515 5.6265 2.75 5.3355 2.75 4.875C2.75 4.4145 3.3515 4.1235 4.55375 3.5415L6.74375 2.48175C8.0975 1.827 8.7725 1.5 9.5 1.5C10.2275 1.5 10.9032 1.827 12.2555 2.48175L14.4462 3.5415C15.6485 4.1235 16.25 4.4145 16.25 4.875C16.25 5.3355 15.6485 5.6265 14.4462 6.2085L12.2563 7.26825C10.9025 7.923 10.2275 8.25 9.5 8.25C8.7725 8.25 8.09675 7.923 6.7445 7.26825Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
     const Offers = ({ color = "#204C80" }) => (
<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0435 6.402L13.2935 5.94225C12.5413 5.481 12.1655 5.25 11.75 5.25C11.3345 5.25 10.9588 5.481 10.2065 5.94225L9.4565 6.402C8.74475 6.8385 8.38925 7.05675 8.195 7.4085C8 7.761 8 8.18475 8 9.033V13.4318C8 14.8785 8 15.6015 8.4395 16.0507C8.879 16.5 9.5855 16.5 11 16.5H12.5C13.9145 16.5 14.621 16.5 15.0605 16.05C15.5 15.6015 15.5 14.8785 15.5 13.4325V9.033C15.5 8.18475 15.5 7.76025 15.305 7.4085C15.11 7.05675 14.7553 6.8385 14.0435 6.402Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.0001 5.33104C10.5209 4.87129 10.2351 4.62979 9.87286 4.53904C9.45286 4.43329 9.01186 4.55179 8.12911 4.78879L7.25011 5.02429C6.41536 5.24929 5.99761 5.36029 5.70811 5.63704C5.41786 5.91454 5.30536 6.30754 5.08111 7.09429L3.91561 11.1728C3.53311 12.5138 3.34111 13.1843 3.66661 13.713C3.94561 14.1668 5.06311 14.7255 6.12586 15" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3712 7.50002C12.002 7.08002 12.5623 6.40727 12.9103 5.57027C13.6288 3.84152 13.1705 2.06777 11.888 1.60952C10.6047 1.15052 8.98175 2.17952 8.26325 3.90827C8.1467 4.18695 8.0585 4.47666 8 4.77302" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
       const Contact = ({ color = "#204C80" }) => (
<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 7.5C3.5 4.67175 3.5 3.25725 4.379 2.379C5.258 1.50075 6.67175 1.5 9.5 1.5H10.625C13.4532 1.5 14.8677 1.5 15.746 2.379C16.6242 3.258 16.625 4.67175 16.625 7.5V10.5C16.625 13.3282 16.625 14.7427 15.746 15.621C14.867 16.4992 13.4532 16.5 10.625 16.5H9.5C6.67175 16.5 5.25725 16.5 4.379 15.621C3.50075 14.742 3.5 13.3282 3.5 10.5V7.5Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.85 8.9805C7.52975 8.4225 7.37525 7.96725 7.28225 7.50525C7.14425 6.82275 7.46 6.15525 7.982 5.72925C8.20325 5.54925 8.456 5.61075 8.5865 5.8455L8.88125 6.37425C9.1145 6.79275 9.2315 7.00275 9.20825 7.22475C9.18575 7.44675 9.02825 7.6275 8.71325 7.98975L7.85 8.9805ZM7.85 8.9805C8.52508 10.1373 9.48772 11.0999 10.6445 11.775M10.6445 11.775C11.2025 12.0952 11.6577 12.2498 12.1197 12.3428C12.8022 12.4808 13.4697 12.165 13.8957 11.643C14.0757 11.4218 14.0142 11.169 13.7795 11.0385L13.2515 10.7437C12.8315 10.5105 12.6222 10.3935 12.4002 10.4167C12.1782 10.4392 11.9975 10.5967 11.6352 10.9117L10.6445 11.775ZM4.25 4.5H2.375M4.25 9H2.375M4.25 13.5H2.375" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
         const Setting = ({ color = "#204C80" }) => (
<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4883 5.35575L16.1178 4.71375C15.838 4.22775 15.6978 3.98475 15.4593 3.888C15.2215 3.7905 14.9523 3.86775 14.413 4.02L13.498 4.278C13.1538 4.3575 12.793 4.3125 12.4795 4.1505L12.2268 4.005C11.9575 3.83244 11.7504 3.57832 11.6358 3.27975L11.3853 2.53125C11.2203 2.03625 11.1378 1.78875 10.942 1.64775C10.7463 1.50525 10.4853 1.50525 9.96476 1.50525H9.12851C8.60801 1.50525 8.34776 1.50525 8.15126 1.64775C7.95551 1.78875 7.87376 2.03625 7.70876 2.53125L7.45826 3.27975C7.34342 3.57843 7.13607 3.83256 6.86651 4.005L6.61376 4.15125C6.30026 4.3125 5.93876 4.3575 5.59526 4.27875L4.68026 4.02C4.14101 3.86775 3.87176 3.79125 3.63401 3.888C3.39551 3.98475 3.25526 4.22775 2.97551 4.713L2.60576 5.35575C2.34326 5.81175 2.21201 6.039 2.23751 6.28125C2.26301 6.52425 2.43851 6.71925 2.78951 7.11L3.56276 7.97475C3.75176 8.214 3.88601 8.631 3.88601 9.006C3.88601 9.381 3.75176 9.798 3.56351 10.0372L2.78951 10.9012C2.43851 11.292 2.26301 11.4877 2.23751 11.73C2.21201 11.9722 2.34251 12.2002 2.60501 12.6555L2.97551 13.2982C3.25526 13.7835 3.39551 14.0265 3.63401 14.1232C3.87251 14.22 4.14101 14.1442 4.68026 13.9912L5.59526 13.7332C5.93943 13.6545 6.30036 13.6996 6.61451 13.8607L6.86651 14.0062C7.13651 14.1787 7.34351 14.4337 7.45751 14.7322L7.70801 15.48C7.87301 15.975 7.95551 16.2225 8.15126 16.365C8.34776 16.506 8.60801 16.506 9.12851 16.506H9.96476C10.4853 16.506 10.7463 16.506 10.942 16.3642C11.1378 16.2225 11.2203 15.975 11.3845 15.48L11.6358 14.7322C11.7498 14.433 11.9568 14.1787 12.2268 14.0062L12.4788 13.8607C12.7938 13.6995 13.1538 13.6537 13.4988 13.7332L14.4138 13.9912C14.9523 14.1442 15.2215 14.2207 15.4593 14.124C15.6978 14.0265 15.838 13.7835 16.1178 13.2982L16.4875 12.6555C16.75 12.2002 16.8813 11.973 16.8558 11.73C16.8303 11.487 16.6548 11.292 16.3038 10.9012L15.5305 10.0372C15.3415 9.79725 15.2073 9.381 15.2073 9.006C15.2073 8.631 15.3415 8.214 15.5298 7.97475L16.3038 7.11C16.6548 6.72 16.8303 6.52425 16.8558 6.28125C16.8813 6.03825 16.7508 5.81175 16.4883 5.35575Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.1396 9C12.1396 9.69619 11.8631 10.3639 11.3708 10.8562C10.8785 11.3484 10.2108 11.625 9.51465 11.625C8.81846 11.625 8.15078 11.3484 7.65849 10.8562C7.16621 10.3639 6.88965 9.69619 6.88965 9C6.88965 8.30381 7.16621 7.63613 7.65849 7.14384C8.15078 6.65156 8.81846 6.375 9.51465 6.375C10.2108 6.375 10.8785 6.65156 11.3708 7.14384C11.8631 7.63613 12.1396 8.30381 12.1396 9Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  );
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" ,  icon: Dash  },
    { to: "shipments", label: "Shipments",icon:Ship },
    { to: "offers", label: "Offers",icon:Offers },
    { to: "contact", label: "Contact",icon:Contact },
    { to: "settings", label: "Setting",icon:Setting },
  ];

  return (
    <>
      {/* Navbar for small screens */}
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
  {/* Logo (Always Visible) */}
  <div className="hidden md:flex  items-center gap-2 px-2 mt-4">
    <img src={Logo} alt="Ship Connect Logo" className="h-14" />
   
  </div>

  {/* Navigation */}
  <nav className="space-y-4 mt-8">
    {navLinks.map(({ to, label,icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `w-full flex items-center justify-center gap-3 px-2 py-3 rounded-2xl text-sm font-semibold ${
            isActive
              ? 'bg-brandOrange text-white'
              : 'text-primaryBlue hover:bg-gray-100'
          }`
        }
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
  <div className="mt-10 flex items-center gap-3 px-2">
    <div className="relative w-10 h-10">
      <img
        src={Avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
    <span className="font-semibold text-primaryBlue text-md">Bayu Sasmita</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M18 9C18 9 13.581 15 12 15C10.419 15 6 9 6 9"
        stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
</aside>


      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

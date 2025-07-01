import React from 'react';

import HeroBg1 from '../assets/hero-bg.jpg';
import User1 from '../assets/hero-bg.jpg';
import User2 from '../assets/hero-bg.jpg';
import User3 from '../assets/hero-bg.jpg';
import HeroBg2 from '../assets/Hero2.jpg'; // أضف الصور الإضافية
import HeroBg3 from '../assets/Hero3.jpg';

import { useState,useEffect,useRef } from 'react';
import Frame1 from '../assets/Frame1.png';
import Frame2 from '../assets/Frame 2.png';
import Frame3 from '../assets/Frame3.png';
import Frame4 from '../assets/Frame4.png';
import Frame5 from '../assets/Frame5.png';
import Frame6 from '../assets/Frame6.png';
import Frame7 from '../assets/Frame7.png';
import Frame8 from '../assets/Frame8.png';
import bgAboute from '../assets/AboutBG.jpg';
import bgAboute1 from '../assets/AboutBg2.jpg';
import PlatFormHome from '../Components/PlatFormHome/PlatFormHome';
import Footer from '../Components/Footer/Footer';
import Testimonials from '../Components/Testimonials/Testimonials';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';
export default function HomePage() {
 // للقائمة الجوال
 // للقائمة المنسدلة
  const dropdownRef = useRef(null);



  const backgroundImages = [HeroBg1, HeroBg2, HeroBg3];
const [bgIndex, setBgIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setBgIndex((prev) => (prev + 1) % backgroundImages.length);
  }, 4000); // كل 4 ثواني

  return () => clearInterval(interval);
}, []);

const heroSlides = [
  {
    image: HeroBg1,
    title: "Find the Best Shipping Solutions for Your Business",
    description: "Easily compare offers, select trusted providers, and track every shipment from one place. Save time, cut costs, and deliver with confidence.",
  },
  {
    image: HeroBg2,
    title: "Expand Your Reach. Connect with Growing Startups.",
    description: " Showcase your shipping services on ShipConnect and get discovered by startups actively looking for reliable logistics partners. More visibility. More clients. Less effort.",
  },
  {
    image: HeroBg3,
    title: "One Platform to Compare, Connect & Ship Smarter",
    description: " ShipConnect bridges the gap between startups and shipping providers. Transparent pricing, trusted reviews, and real-time shipment tracking—all in one smart system.",
  },
];

const totalSlides = heroSlides.length;

const [slideIndex, setSlideIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  }, 5000); // كل 5 ثواني

  return () => clearInterval(interval);
}, []);





const slideIntervalRef = useRef(null);

// تابع لتشغيل السلايدر تلقائيًا
const startSlideShow = () => {
  slideIntervalRef.current = setInterval(() => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  }, 5000);
};

// تابع لإيقاف السلايدر
const stopSlideShow = () => {
  if (slideIntervalRef.current) {
    clearInterval(slideIntervalRef.current);
  }
};

  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 200,
          behavior: 'smooth',
        });

        // لما نوصل للنهاية نرجع للبداية
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 3000); // كل 3 ثواني

    return () => clearInterval(interval);
  }, []);
       const Iconn = () => (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12Z" fill="#F9751C" stroke="#FFFCFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12.75C8 12.75 9.6 13.662 10.4 15C10.4 15 12.8 9.75 16 8" fill="#F9751C"/>
<path d="M8 12.75C8 12.75 9.6 13.662 10.4 15C10.4 15 12.8 9.75 16 8" stroke="#FFFCFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  );
  const logos = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6,Frame7,Frame8];
  return (
    <div className="w-full  text-gray-800">
   <div className="relative w-full h-[600px]">
  {/* الخلفية المتغيرة */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(21, 48, 82, 0.64) 100%), url(${heroSlides[slideIndex].image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    
  >
    {/* السهم لليسار */}
<button
  onClick={() => {
    stopSlideShow(); // أوقفي المؤقت
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    startSlideShow(); // ارجعي شغليه
  }}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#153052]/60 text-white p-2 rounded-full hover:bg-[#153052]/80 z-20"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>


  </div>

  {/* النافبار فوق الخلفية */}
  <Navbar/>

  {/* محتوى الـ Hero Section فوق الصورة */}
  <div className="absolute inset-0 z-10 flex items-center justify-start px-4 md:px-20 text-white">
    <div className="max-w-xl flex flex-col items-start justify-center text-left">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        {heroSlides[slideIndex].title}
      </h1>
      <p className="mt-4 text-base md:text-lg">
        {heroSlides[slideIndex].description}
      </p>
      <button className="mt-6 bg-brandOrange py-3 px-8 hover:bg-orange-600 text-white rounded-3xl font-medium shadow">
        Get Started
      </button>
    </div>
  </div>
</div>

      {/* Companies Row */}
  <section className="bg-white py-6 mt-[20px]">
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scroll-smooth px-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo}
            alt={`Company ${idx}`}
            className="h-16 w-auto flex-shrink-0"
          />
        ))}
      </div>
    </section>

      {/* Why Choose Us */}
      <section className=" mx-auto md:mx-20 py-12">
        <div className="container mx-auto px-4 text-center">
<h2
  className="text-3xl text-[#10233E] font-bold mb-4"
  style={{ textShadow: '4px 4px 15px #00000040' }}
>
  Why Choose ShipConnect?
</h2>

          <p className="text-[#10233E]  font-normal text-sm mb-10 text-center">
  Discover how our platform helps you ship smarter, faster, and safer.<br />
  We bring the tools you need to save time,<br />
  compare with confidence,<br />
  and grow your business.
</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Compare Shipping Offers Easily', titleColor: 'text-[#FFFFFF]',descColor: 'text-[#FFFFFF]', color: 'bg-[#7EADE7]', desc: 'Quickly compare prices, delivery times, and service ratings from multiple shipping companies — all in one place.',icon:(<svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V40C40 44.4183 36.4183 48 32 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#649CE1"/>
<path d="M29.3333 30.6667V22.6667C29.3333 18.896 29.3333 17.0094 28.1613 15.8387C26.9907 14.6667 25.104 14.6667 21.3333 14.6667H17.3333M17.3333 14.6667C17.3333 13.7334 19.992 11.9894 20.6667 11.3334M17.3333 14.6667C17.3333 15.6 19.992 17.344 20.6667 18M10.6667 18V26C10.6667 29.7707 10.6667 31.6574 11.8387 32.828C13.0093 34 14.896 34 18.6667 34H22.6667M22.6667 34C22.6667 34.9334 20.008 36.6787 19.3333 37.3334M22.6667 34C22.6667 33.0667 20.008 31.3214 19.3333 30.6667" stroke="#E4E6EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29.3333 36.0001C30.8061 36.0001 32 34.8062 32 33.3334C32 31.8607 30.8061 30.6667 29.3333 30.6667C27.8606 30.6667 26.6667 31.8607 26.6667 33.3334C26.6667 34.8062 27.8606 36.0001 29.3333 36.0001Z" stroke="#E4E6EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6667 17.3333C12.1394 17.3333 13.3333 16.1394 13.3333 14.6667C13.3333 13.1939 12.1394 12 10.6667 12C9.19391 12 8 13.1939 8 14.6667C8 16.1394 9.19391 17.3333 10.6667 17.3333Z" stroke="#E4E6EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
) },
              { title: 'Connect with Trusted Companies',  titleColor: 'text-[#00C950]',descColor: 'text-[#101828BF]', color: 'bg-[#F0FDF4]', desc: 'We only list verified, rated shipping providers — so you know you are dealing with professionals.',icon:(<svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V40C40 44.4183 36.4183 48 32 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#B1F7CB"/>
<path d="M9.33333 26.6666H12.5267C12.9187 26.6666 13.3053 26.7546 13.656 26.9253L16.3787 28.2426C16.7293 28.412 17.116 28.5 17.5093 28.5H18.8987C20.2427 28.5 21.3333 29.5546 21.3333 30.856C21.3333 30.9093 21.2973 30.9546 21.2453 30.9693L17.8573 31.9066C17.2494 32.0746 16.6012 32.0158 16.0333 31.7413L13.1227 30.3333" stroke="#177D3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.3333 30L27.4573 28.1186C27.9905 27.955 28.5617 27.964 29.0894 28.1443C29.6171 28.3246 30.0744 28.667 30.396 29.1226C30.888 29.8026 30.688 30.7786 29.9707 31.192L19.9507 36.9746C19.6373 37.1559 19.2904 37.2715 18.931 37.3144C18.5715 37.3572 18.2072 37.3265 17.86 37.224L9.33333 34.6933M21.3333 14.6666H24M24 24H21.3333C18.8187 24 17.5627 24 16.7813 23.2186C16 22.4373 16 21.1813 16 18.6666V16C16 13.4853 16 12.2293 16.7813 11.448C17.5627 10.6666 18.8187 10.6666 21.3333 10.6666H24C26.5147 10.6666 27.7707 10.6666 28.552 11.448C29.3333 12.2293 29.3333 13.4853 29.3333 16V18.6666C29.3333 21.1813 29.3333 22.4373 28.552 23.2186C27.7707 24 26.5147 24 24 24Z" stroke="#177D3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

) },
              { title: 'Track All Your Shipments',titleColor: 'text-[#DF6109]',descColor: 'text-[#1A3D6580]', color: 'bg-[#FFE1CD]', desc: 'Stay updated with real-time tracking across different carriers — all visible from your dashboard.',icon:(<svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V40C40 44.4183 36.4183 48 32 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#FEC6A0"/>
<path d="M12 28H14.6667M28 28V32C28 34.5146 28 35.7706 27.3747 36.552C26.7787 37.2986 25.8347 37.332 24 37.3333M28.0107 16H27.9973M14.6667 37.3333H12C9.48534 37.3333 8.22934 37.3333 7.44801 36.552C6.66667 35.7706 6.66667 34.5146 6.66667 32V29.3333C6.66667 26.8186 6.66667 25.5626 7.44801 24.7813C8.22934 24 9.48534 24 12 24H14.6667C17.1813 24 18.4373 24 19.2187 24.7813C20 25.5626 20 26.8186 20 29.3333V32C20 34.5146 20 35.7706 19.2187 36.552C18.4373 37.3333 17.1813 37.3333 14.6667 37.3333ZM28 10.6666C25.0533 10.6666 22.6667 13.0786 22.6667 16.0533C22.6667 17.7546 23.3333 19.0773 24.6667 20.2586C25.6067 21.092 26.7453 22.476 27.428 23.596C27.756 24.1346 28.22 24.1346 28.572 23.596C29.2893 22.4973 30.3933 21.092 31.3333 20.26C32.6667 19.0773 33.3333 17.7546 33.3333 16.0533C33.3333 13.08 30.9467 10.6666 28 10.6666Z" stroke="#F9751C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
) },
              { title: 'Save Time & Money', titleColor: 'text-[#C5A30D]',descColor: 'text-[#101828BF]', color: 'bg-[#FFF6D2]', desc: 'Automated comparisons and smart recommendations save you hours of manual work — and get you the best deals.',icon:(<svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V40C40 44.4183 36.4183 48 32 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#FEEDAA"/>
<path d="M20 37.3333C27.364 37.3333 33.3333 31.364 33.3333 24C33.3333 16.636 27.364 10.6666 20 10.6666C12.636 10.6666 6.66666 16.636 6.66666 24C6.66666 31.364 12.636 37.3333 20 37.3333Z" stroke="#C5A30D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.0107 22.0106C19.4802 22.0106 18.9715 22.2213 18.5964 22.5964C18.2214 22.9714 18.0107 23.4802 18.0107 24.0106C18.0107 24.541 18.2214 25.0497 18.5964 25.4248C18.9715 25.7999 19.4802 26.0106 20.0107 26.0106C20.5411 26.0106 21.0498 25.7999 21.4249 25.4248C21.7999 25.0497 22.0107 24.541 22.0107 24.0106C22.0107 23.4802 21.7999 22.9714 21.4249 22.5964C21.0498 22.2213 20.5411 22.0106 20.0107 22.0106ZM20.0107 22.0106V17.3333M24.02 28.0266L21.4213 25.4293" stroke="#C5A30D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)
 },
            ].map((item, i) => (
              <div key={i} className={`px-7  py-4 rounded-2xl shadow-sm ${item.color}`}>
<div className="grid grid-cols-12 items-center gap-3">
  <div className="col-span-2 flex justify-center">
    {item.icon}
  </div>
  <h3
    className="col-span-10 text-lg font-semibold"
    style={{ color: item.titleColor.replace('text-[', '').replace(']', '') }}
  >
    {item.title}
  </h3>
</div>



               
               <p className="text-sm mt-3" style={{ color: item.descColor.replace('text-[', '').replace(']', '') }}>
{item.desc}</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-white py-12 mx-auto md:mx-20">
        <h2
  className="text-3xl text-center text-[#10233E]  font-bold mb-8"
  style={{ textShadow: '4px 4px 15px #00000040' }}
>
  About Us 
</h2>
     <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="grid grid-cols-2 gap-8">
    <div className="bg-gradient-to-b from-[#F3F5F7] to-white p-4 rounded-[20px] shadow text-center flex flex-col justify-center">
      <p className="text-2xl font-bold text-[#10233E]">1k+</p>
      <p className="text-[20px] font-bold text-primaryBlue">Start Ups</p>
    </div>

    <div>
      <img src={bgAboute} alt="Startups Working" className="rounded-[20px] object-cover w-full h-full" />
    </div>
     <div>
      <img src={bgAboute1} alt="Shipping" className="rounded-[20px] object-cover w-full h-full" />
    </div>
    <div className="bg-gradient-to-b from-[#FFE1CD] to-white p-4 rounded-[20px] shadow text-center flex flex-col justify-center">
      <p className="text-2xl font-bold text-[#10233E]">9k+</p>
      <p className="text-[20px] font-bold text-primaryBlue">Shipping Company</p>
    </div>

 
  </div>
  {/* Left Section */}
  <div>
    <h2 className="text-2xl text-[#10233E] font-semibold mb-4">
      Connecting Startups with Trusted Shipping Partners
    </h2>
    <p className="text-[#10233E99] text-base mb-6 leading-relaxed">
      ShipConnect is a digital B2B platform built to streamline logistics by connecting startups with reliable shipping companies. Whether you're a growing startup or a shipping provider, we simplify your journey through smart matching, transparency.
    </p>
    <ul className="space-y-4 text-sm text-[#10233E] font-medium">
      <li className="flex items-start gap-2">
        <Iconn /> <span className="text-[#F9751C]">A trusted network built on transparency, reviews, and performance</span>
      </li>
      <li className="flex items-start gap-2">
        <Iconn /> <span className="text-[#F9751C]">Growth opportunities for shipping companies through digital exposure</span>
      </li>
      <li className="flex items-start gap-2">
        <Iconn /> <span className="text-[#F9751C]">Tools to compare offers, track shipments, and manage logistics</span>
      </li>
      <li className="flex items-start gap-2">
        <Iconn /> <span className="text-[#F9751C]">A bridge between startups and verified shipping companies</span>
      </li>
    </ul>
  </div>

  {/* Right Section */}

</div>

      </section>

      {/* Workflow */}
      <div className='bg-[#E4E6EC] mx-auto md:mx-20 px-8 rounded-xl'>
          <PlatFormHome/>
      </div>
  

      {/* Testimonials */}
     <Testimonials/>

      {/* Footer */}
   <Footer/>
    </div>
  );
}

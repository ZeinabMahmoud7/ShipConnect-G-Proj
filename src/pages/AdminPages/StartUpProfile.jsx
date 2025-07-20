// ShippingProfile.jsx (updated)
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  Mail,
  Phone,
  Globe,
  Hash,
  IdCard,
  Truck,
  Building2,
  ArrowLeft,
} from "lucide-react";

export default function StartupgProfile() {
  const navigate = useNavigate();
  const { id } = useParams(); // يمسك الـ id من الـ URL
  const numericId = parseInt(id, 10);
  console.log(typeof id , typeof numericId);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log("idparam",id);
    const token = localStorage.getItem("token");
    console.log("tooken",token);
   
useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);

      if (Number.isNaN(numericId)) {
        setError("Invalid ID.");
        setLoading(false);
        return;
      }

      const res = await axios.get(`/api/StartUp/StartUpProfile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ API Response:", res);
      setProfileData(res?.data?.data ?? null);

      if (!res?.data?.data) {
        // لو مفيش بيانات جاية
        setError("No startup data found for this ID.");
      }

    } catch (err) {
      console.error("❌ Error fetching company profile:", err);

      if (err.response) {
        // لو السيرفر رجع خطأ
        const status = err.response.status;
        const serverMessage = err.response.data?.message || JSON.stringify(err.response.data);
        console.error("🔴 Full Error Response:", err.response.data);
        setError(`Error (${status}): ${serverMessage}`);
      } else if (err.request) {
        console.error("⚠️ No response received:", err.request);
        setError("No response from server. Please check your connection.");
      } else {
        console.error("⚠️ Request setup error:", err.message);
        setError(`Request error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);



  const transportTypeMap = {
    0: "Both",
    1: "Air",
    2: "Land",
    3: "Sea",
    4: "Other",
  };

  const shippingScopeMap = {
    0: "international",
    1: "domestic",
    2: "regional",
    3: "global",
  };

  // نشتق قيم آمنة للعرض + fallback للديزاين القديم (Wearly)
  const safeData = useMemo(() => {
    const d = profileData ?? {};
    return {
      companyName: d.companyName ?? "Wearly",
      profileImageUrl: d.profileImageUrl ?? "https://i.imgur.com/FzXyD2L.png",
      email: d.email ?? "Ahmed@freshnest.co",
      phone: d.phone ?? "+20 101 234 5678",
      address: d.address ?? "Cairo, Egypt",
      description:
        d.description ??
        "Wearly is a Cairo-based startup specializing in the delivery of fresh food and groceries. Known for its quality control and fast service, the company partners with reliable shipping providers to ensure perishable items reach customers in perfect condition. Their main focus is speed, freshness, and reliability.",
      transportTypeLabel: d.transportType != null ? transportTypeMap[d.transportType] ?? `#${d.transportType}` : "Both",
      shippingScopeLabel: d.shippingScope != null ? shippingScopeMap[d.shippingScope] ?? `#${d.shippingScope}` : "international",
      website: d.website ?? "https://startup.com",
      licenseNumber: d.licenseNumber ?? "2345678",
      taxId: d.taxId ?? "2",
    };
  }, [profileData]);

  /* --------------------------------------------------------------
   * SMALL REUSABLE CARD COMPONENT (Business Info)
   * -------------------------------------------------------------- */
function InfoItem({ label, value, Icon }) {
  const isWebsite = label.toLowerCase().includes("website"); // للتحقق لو هو اللينك

  return (
    <div className="w-full rounded-[20px] bg-[#F6F6F6] px-4 py-5 flex items-start gap-3 shadow-sm">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#FFE1CD] shrink-0">
        {Icon ? <Icon size={18} strokeWidth={2} color="#204C80" /> : null}
      </span>
      <span className="flex flex-col leading-tight min-w-0">
        <span className="text-xs font-semibold text-[#10233E99]">{label}</span>
        {isWebsite && value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-[#204C80] truncate break-all hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm font-bold text-[#10233E] truncate break-all">
            {value || "—"}
          </span>
        )}
      </span>
    </div>
  );
}


  /* --------------------------------------------------------------
   * RENDER
   * -------------------------------------------------------------- */
  if (loading) {
    return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <svg className="animate-spin h-8 w-8 text-[#204C80]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <p className="mt-2 text-lg font-semibold">Loading profile...</p>
    </div>
    );
  }

if (error) {
  return (
    <div className="min-h-screen p-6 text-[#111827] font-sans flex flex-col items-center justify-center gap-4">
      <p className="text-red-600 font-semibold">{error}</p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 rounded-md bg-[#204C80] text-white text-sm font-bold hover:opacity-90"
      >
        رجوع
      </button>
    </div>
  );
}


  return (
    <div className="min-h-screen p-6 text-[#111827] font-sans">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboardAdmin/Partners")}
        className="flex items-center font-bold mb-4 text-[#10233E99] text-lg gap-1 group"
      >
        {/* icon */}
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:-translate-x-1"
        >
          <path
            d="M21.25 8.5C21.25 8.5 12.75 14.7602 12.75 17C12.75 19.2397 21.25 25.5 21.25 25.5"
            stroke="#10233E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      {/* Profile Header ------------------------------------------------ */}
      <div className="bg-[#FFE1CD] rounded-xl p-6 mb-6 flex flex-col gap-8 relative overflow-hidden">
        {/* top row */}
        <div className="flex items-start gap-9">
        <img src={`http://localhost:5092${safeData.profileImageUrl}`} alt="Logo" className="w-20 h-20 rounded-full object-cover" />

          <div className="space-y-1">
            <h2 className="text-xl text-[#10233E] font-bold">{safeData.companyName}</h2>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold text-[#10233E99]">Contact Info: </span>
              <a href={`mailto:${safeData.email}`} className="text-[#10233E] font-semibold underline-offset-2 hover:underline">
                {safeData.email}
              </a>
              {" | "}
              <span className="text-[#10233E] font-semibold">{safeData.phone}</span>
            </p>
            <p className="text-sm text-[#10233E] font-semibold">
              <span className="font-semibold text-[#10233E99]">Address:</span> {safeData.address}
            </p>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-[#F6F6F6] p-4 rounded-[20px] shadow-sm text-sm text-[#10233E]">
          <h3 className="font-semibold mb-1 text-[#10233E]">Overview</h3>
          <p className="leading-relaxed text-[#10233E] opacity-90">{safeData.description}</p>
        </div>
      </div>

      {/* Business Info ------------------------------------------------- */}
      <h3 className="text-lg font-bold text-primaryBlue flex items-center mb-3 gap-2">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.9993 11.3333C23.2586 11.3333 28.3327 9.43046 28.3327 7.08325C28.3327 4.73604 23.2586 2.83325 16.9993 2.83325C10.7401 2.83325 5.66602 4.73604 5.66602 7.08325C5.66602 9.43046 10.7401 11.3333 16.9993 11.3333Z"
            stroke="#204C80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.91602 15.3594C10.7688 15.6144 11.7208 15.8269 12.7493 15.9827M28.3327 16.9999C28.3327 19.3473 23.2582 21.2499 16.9993 21.2499C10.7405 21.2499 5.66602 19.3473 5.66602 16.9999M9.91602 25.276C10.7688 25.531 11.7208 25.7435 12.7493 25.8994"
            stroke="#204C80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.3327 7.08325V26.9166C28.3327 29.264 23.2582 31.1666 16.9993 31.1666C10.7405 31.1666 5.66602 29.264 5.66602 26.9166V7.08325"
            stroke="#204C80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Business information
      </h3>

      {/* GRID */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mb-8"
        /* NOTE: عند 5 عناصر هيترتبوا 3 فوق + 2 تحت تلقائياً */
      >
        <InfoItem label="Business Category" value={safeData.transportTypeLabel} Icon={Truck} />
        <InfoItem label="Website Link" value={safeData.website} Icon={Globe} />
        <InfoItem label="Tax ID" value={safeData.taxId} Icon={IdCard} />
     
      </div>
    </div>
  );
}

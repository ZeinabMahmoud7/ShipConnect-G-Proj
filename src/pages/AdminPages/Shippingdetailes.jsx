// ShippingProfile.jsx (updated)
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { StatsCard } from "../../components/StatsCard/StatsCard";
// lucide-react icons (only a few actually used; keep others if you need later)
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

export default function ShippingDetailes() {
      const { id } = useParams(); 
        const numericId = parseInt(id, 10);
const [feedbacks, setFeedbacks] = useState([]);
useEffect(() => {
 const fetchFeedbacks = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/api/Rating/CompanyRates/${2}?pageNumber=1&pageSize=3`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Feedback API Response:", res.data);

    const feedbackArray = res?.data?.data?.data || [];
    setFeedbacks(feedbackArray);
  } catch (error) {
    console.error("❌ Error fetching feedbacks:", error.response || error.message);
  }
};


  fetchFeedbacks();
}, [id]);

const Star = () => (
 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7276 2.44418L14.4874 5.99288C14.7274 6.48687 15.3673 6.9607 15.9073 7.05143L19.0969 7.58575C21.1367 7.92853 21.6167 9.4206 20.1468 10.8925L17.6671 13.3927C17.2471 13.8161 17.0172 14.6327 17.1471 15.2175L17.8571 18.3125C18.417 20.7623 17.1271 21.71 14.9774 20.4296L11.9877 18.6452C11.4478 18.3226 10.5579 18.3226 10.0079 18.6452L7.01824 20.4296C4.87847 21.71 3.57862 20.7522 4.13856 18.3125L4.84848 15.2175C4.97846 14.6327 4.74849 13.8161 4.32853 13.3927L1.84881 10.8925C0.388969 9.4206 0.858919 7.92853 2.89869 7.58575L6.08834 7.05143C6.61828 6.9607 7.25821 6.48687 7.49818 5.99288L9.25797 2.44418C10.2179 0.518607 11.7777 0.518607 12.7276 2.44418Z" fill="#FDC700" stroke="#FDC700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
  const navigate = useNavigate();
// يمسك الـ id من الـ URL
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shipmentData, setShipmentData] = useState([]);
    const [shippingScope, setShippingScope] = useState([]);
    useEffect(() => {
  const fetchShippingScopeCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/Offer/companyOffers/${2}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
          console.log("😶‍🌫️",res);
      const { accepted, rejected } = res.data.data;

      const formattedSegments = [
        { label: 'Accepted', value: Number(accepted) || 0, color: '#21CF61' },
        { label: 'Rejected', value: Number(rejected) || 0, color: '#FD0D0D' },
      ];

      setShippingScope(formattedSegments);
    } catch (error) {
      console.error("❌ Error fetching shipping scope count:", error);
    }
  };

  fetchShippingScopeCount();
}, []);
  useEffect(() => {
  const fetchShipmentStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/Shipment/Admin/ShippingCount/${2}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
     console.log("try",res.data);
      const data = res.data.data;

      const selectedKeys = ["delivered", "inTransit", "pending"];

      const colorMap = {
        delivered: "#21CF61",
        inTransit: "#F9751C",
        pending: "#F7CF37"
      };

      const formattedSegments = selectedKeys.map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
        value: Number(data[key]) || 0,
        color: colorMap[key]
      }));

      setShipmentData(formattedSegments);
    } catch (error) {
  if (error.response) {
    // السيرفر رد برد لكن فيه مشكلة (مثل 400, 401, 500)
    console.error("❌ API Error Response:");
    console.error("Status:", error.response.status);
    console.error("Headers shhhaaaapments:", error.response.headers);
    console.error("Data:", error.response.data);
  } else if (error.request) {
    // الطلب اتبعت لكن السيرفر ما ردش
    console.error("❌ API No Response:");
    console.error(error.request);
  } else {
    // حصلت مشكلة قبل ما يتبعت الطلب
    console.error("❌ API Setup Error:", error.message);
  }
  console.error("Full Error Object:", error);
}

  };

  fetchShipmentStatus();
}, []);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/ShippingCompany/CompanyProfile/${id}` || "", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(res?.data?.data ?? null);
      } catch (err) {
        console.error("❌ Error fetching company profile", err);
        setError("تعذر جلب بيانات الشركة");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

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
          <img
            src={safeData.profileImageUrl}
            alt="Logo"
            className="w-20 h-20 rounded-full object-cover bg-white/50"
          />
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
        <InfoItem label="Transport Type" value={safeData.transportTypeLabel} Icon={Truck} />
        <InfoItem label="Website Link" value={safeData.website} Icon={Globe} />
        <InfoItem label="Tax ID" value={safeData.taxId} Icon={IdCard} />
        <InfoItem label="License Number" value={safeData.licenseNumber} Icon={Hash} />
        <InfoItem label="Shipping Scope" value={safeData.shippingScopeLabel} Icon={Building2} />

      </div>
<div className="flex gap-x-4 items-stretch w-full">
  <div className="flex-1">
    <StatsCard type="users" segments={shipmentData} />
  </div>
  <div className="flex-1">
    <StatsCard type="Offers" segments={shippingScope} />
  </div>
</div>
<h3 className="my-8 text-lg flex items-center font-bold text-primaryBlue mb-3"><svg className="me-2" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.0744 29.5941C26.0018 29.2017 30.7221 24.4134 31.1103 18.4025C31.1853 17.2266 31.1853 16.0083 31.1103 14.8325C30.7221 8.82295 26.0018 4.03745 20.0744 3.6422C18.0272 3.50729 15.9733 3.50729 13.9261 3.6422C7.99877 4.03603 3.27843 8.82295 2.89027 14.8339C2.81522 16.0227 2.81522 17.2151 2.89027 18.4039C3.03193 20.5926 3.99952 22.6199 5.13993 24.3312C5.80152 25.5283 5.36518 27.0229 4.67527 28.3304C4.17943 29.2725 3.9301 29.7429 4.12985 30.0829C4.32818 30.4229 4.77443 30.4342 5.66552 30.4554C7.42927 30.4979 8.61785 29.9993 9.56135 29.3037C10.0954 28.9084 10.3632 28.7115 10.5474 28.6889C10.7315 28.6662 11.0956 28.8164 11.8209 29.1139C12.4726 29.383 13.2305 29.5488 13.9247 29.5955C15.9434 29.7287 18.0528 29.7287 20.0758 29.5955M16.9932 17H17.0074M22.6542 17H22.6669M11.3336 17H11.3464" stroke="#204C80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 Feedbacks from startups</h3>
      <section className="">
      {/* الكروت */}
     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {feedbacks.length > 0 ? (
    feedbacks.map((item, index) => (
      <div
        key={index}
        className="bg-[#F3F4F6] px-[16px] py-[20px] rounded-xl shadow-sm flex flex-col justify-between"
      >
        <div>
          {/* النجوم */}
          <div className="flex gap-[2px] mb-4">
            {[...Array(item.score)].map((_, i) => <Star key={i} />)}
          </div>
          {/* النص */}
          <p className="text-[#101828BF] text-[16px] leading-relaxed">
            "{item.comment}"
          </p>
        </div>

        {/* الشخص */}
        <div className="flex items-center mt-6">
          <img
            src={item.imageUrl || "/images/default-user.png"}
            alt={item.startUpName}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-bold text-[#000000] text-[16px]">{item.startUpName}</p>
            <p className="text-sm text-[#99A1AF]">{item.shipmentCode}</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No feedback available</p>
  )}
</div>

    </section>
    </div>
  );
}

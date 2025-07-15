import React from 'react';

import { WelcomeHeader } from '../../components/WelcomeHeader/WelcomeHeader';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { NotificationsList } from '../../components/NotificationsList/NotificationsList';
import ShippingCompanies from '../../components/ShippingCompanies/ShippingCompanies';
import CompanyProgress from '../../components/CompanyProgress/CompanyProgress';
import { Check, Shipments, Message, File } from '../../Components/SidebarIcon';
import { useState,useEffect } from 'react';
import axios from "axios";
const chartData = [
  { month: 'Jan', Progress: 60 },
  { month: 'Feb', Progress: 70 },
  { month: 'Mar', Progress: 50 },
  { month: 'Apr', Progress: 45 },
  { month: 'May', Progress: 80 },
  { month: 'Jun', Progress: 65 },
  { month: 'Jul', Progress: 75 },
  { month: 'Aug', Progress: 40 },
  { month: 'Sep', Progress: 50 },
  { month: 'Oct', Progress: 55 },
  { month: 'Nov', Progress: 70 },
  { month: 'Dec', Progress: 80 },
];

const chartSeries = [
  {
    key: 'Progress',
    label: 'Progress',
    color: '#F9751C',
    icon: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="7" width="16" height="2" fill="#F9751C" />
      <circle cx="8.5" cy="8" r="3.5" fill="white" stroke="#F9751C" />
    </svg>

  }
];


const Star = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7276 2.44418L14.4874 5.99288C14.7274 6.48687 15.3673 6.9607 15.9073 7.05143L19.0969 7.58575C21.1367 7.92853 21.6167 9.4206 20.1468 10.8925L17.6671 13.3927C17.2471 13.8161 17.0172 14.6327 17.1471 15.2175L17.8571 18.3125C18.417 20.7623 17.1271 21.71 14.9774 20.4296L11.9877 18.6452C11.4478 18.3226 10.5579 18.3226 10.0079 18.6452L7.01824 20.4296C4.87847 21.71 3.57862 20.7522 4.13856 18.3125L4.84848 15.2175C4.97846 14.6327 4.74849 13.8161 4.32853 13.3927L1.84881 10.8925C0.388969 9.4206 0.858919 7.92853 2.89869 7.58575L6.08834 7.05143C6.61828 6.9607 7.25821 6.48687 7.49818 5.99288L9.25797 2.44418C10.2179 0.518607 11.7777 0.518607 12.7276 2.44418Z" fill="#FDC700" stroke="#FDC700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);

const DashboardShipping = () => {
const [notifications, setNotifications] = useState([]);

   const userName=(localStorage.getItem("userNameShipping") || "").split(" ").slice(0, 2).join(" ");
  const rate = 3.9;
  const [shipmentData, setShipmentData] = useState([]);
  const [shippingScope, setShippingScope] = useState([]);
  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("api/Notification/MyNotifications?pageNumber=1&pageSize=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📥 Raw notifications response:", res.data);

      const formatted = res.data.data.data.map((notif, index) => {
  let icon = File;
  let borderColor = "#F9751C";
  let iconColor = "#F9751C";

  if (notif.notificationType === 1 ||notif.notificationType === 2) {
    icon = Check;
    borderColor = "#21CF61";
    iconColor = "#21CF61";
  } else if (notif.notificationType === 2) {
    icon = Shipments;
    borderColor = "#F9751C";
    iconColor = "#F9751C";
  } else if (notif.notificationType === 3) {
    icon = Message;
    borderColor = "#21CF61";
    iconColor = "#204C80";
  }

  return {
    id: index,
    message: notif.message,
    date: notif.createdAt?.split("T")[0] ?? "N/A",
    icon,
    borderColor,
    iconColor,
  };
});


      setNotifications(formatted);
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    }
  };

  fetchNotifications();
}, []);
useEffect(() => {
  const fetchShipmentStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("api/Shipment/StatusCount", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data.data;

      // فقط الحالات اللي نحتاجها
      const selectedKeys = ["delivered", "inTransit", "pending"];

      const colorMap = {
        delivered: "#21CF61",
        inTransit: "#F9751C",
        pending: "#F7CF37"
      };

      const formattedSegments = selectedKeys.map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"), // Capitalized
        value: Number(data[key]) || 0,
        color: colorMap[key]
      }));

      setShipmentData(formattedSegments);
    } catch (error) {
      console.error("❌ Error fetching shipment status:", error);
    }
  };

  fetchShipmentStatus();
}, []);
useEffect(() => {
  const fetchShippingScopeCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('api/Offer/status-count', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
          console.log("😶‍🌫️",res.data.data);
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
const [lastRating, setLastRating] = useState(null);
useEffect(() => {
  const fetchLastRating = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/Rating/LastRate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
         console.log("✨✨✨✨✨✨✨✨✨",res.data);
      setLastRating(res.data.data); // تأكد إن دي هي الـ structure بتاعة الـ API
    } catch (error) {
      console.error("❌ Error fetching last rating:", error);
    }
  };

  fetchLastRating();
}, []);
  return (
    <div className="min-h-screen">
      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-col gap-x-3 md:flex-row">


        {/* Main Dashboard Content */}
        <div className="flex-1">
          <WelcomeHeader userName={userName} rate={rate} />

          {/* Stats Cards + Shipping Companies */}
          <div className="grid grid-cols-1  gap-4 mb-6 items-start">

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 items-stretch">
            <StatsCard
    type="users"
    segments={shipmentData} // نفس تنسيق Land, Sea, Air
  />

                    <StatsCard
  type="Offers"
  segments={shippingScope}
/>
         {lastRating && (
  <div className="border border-[#CACED8] bg-[#F1F1F166] rounded-[20px] px-4 py-5">
    <h3 className='flex  gap-x-2 mb-3 text-primaryBlue items-center font-semibold text-lg'><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6273 15.6675C13.7653 15.4598 16.2643 12.9248 16.4698 9.74251C16.5095 9.12001 16.5095 8.47501 16.4698 7.85251C16.2643 4.67101 13.7653 2.13751 10.6273 1.92826C9.54347 1.85684 8.45612 1.85684 7.3723 1.92826C4.2343 2.13676 1.7353 4.67101 1.5298 7.85326C1.49007 8.48264 1.49007 9.11389 1.5298 9.74326C1.6048 10.902 2.11705 11.9753 2.7208 12.8813C3.07105 13.515 2.84005 14.3063 2.4748 14.9985C2.2123 15.4973 2.0803 15.7463 2.18605 15.9263C2.29105 16.1063 2.5273 16.1123 2.99905 16.1235C3.9328 16.146 4.56205 15.882 5.06155 15.5138C5.3443 15.3045 5.48605 15.2003 5.58355 15.1883C5.68105 15.1763 5.8738 15.2558 6.2578 15.4133C6.6028 15.5558 7.00405 15.6435 7.37155 15.6683C8.4403 15.7388 9.55705 15.7388 10.628 15.6683M8.99605 9.00001H9.00355M11.993 9.00001H11.9998M5.9998 9.00001H6.00655" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
StartUps Feedback
</h3>
    <div className="bg-[#F3F4F6]  px-[16px] py-[20px] rounded-xl shadow-sm flex flex-col justify-between">
      {/* النجوم حسب score */}
      <div className="flex gap-[2px] mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} style={{ opacity: i < Math.round(lastRating.score) ? 1 : 0.3 }} />
        ))}
      </div>

      {/* التعليق */}
      <p className="text-[#101828BF] text-[20px] leading-relaxed">
        "{lastRating.comment}"
      </p>
    </div>

    {/* بيانات المستخدم */}
    <div className="flex items-center mt-6">
      <img
        src={lastRating.imageUrl || 'https://via.placeholder.com/40'}
        alt={lastRating.startUpName}
        className="w-10 h-10 rounded-full mr-4 object-cover"
      />
      <div>
        <p className="font-bold text-[#000000] text-[16px]">{lastRating.startUpName}</p>
        <p className="text-sm text-[#99A1AF]"> {lastRating.shipmentCode}</p>
      </div>
    </div>
  </div>
)}




            </div>



          </div>

          {/* Company Progress Chart */}
          <CompanyProgress title="Company Progress " data={chartData} series={chartSeries} />


          {/* Notifications */}
               {notifications.length === 0 ? (
  <div className="flex flex-col items-center justify-center text-center bg-white rounded-xl border border-borderGray p-6 shadow-sm">
    <svg
      className="w-12 h-12 text-gray-400 mb-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 10.5v3m0 0h-3m3 0h3m-3 0v3m0-3v-3m-6.75 9.75a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z"
      />
    </svg>
    <p className="text-sm text-gray-600 font-medium">You don't have any notifications yet</p>
    <p className="text-xs text-gray-400 mt-1">We’ll let you know when something arrives!</p>
  </div>
) : (
  <NotificationsList title="Latest Notifications" notifications={notifications} />
)}

        </div>
      </div>
    </div>
  );
};

export default DashboardShipping;

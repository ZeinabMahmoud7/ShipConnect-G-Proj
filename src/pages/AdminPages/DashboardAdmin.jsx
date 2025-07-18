import React from 'react';

import { WelcomeHeader } from '../../Components/WelcomeHeader/WelcomeHeader';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { NotificationsList } from '../../components/NotificationsList/NotificationsList';
import { useState,useEffect } from 'react';
import CompanyProgress from '../../components/CompanyProgress/CompanyProgress';
import { Check, Shipments, Message, File } from '../../Components/SidebarIcon'; 
import axios from 'axios';
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
<rect x="0.5" y="7" width="16" height="2" fill="#F9751C"/>
<circle cx="8.5" cy="8" r="3.5" fill="white" stroke="#F9751C"/>
</svg>

  }
];

const userName=localStorage.getItem("userNameAdmin");
const DashboardAdmin = () => {
   const [totalCompanies, setTotalCompanies] = useState(null); 
  useEffect(() => {
    const fetchTotalCompanies = async () => {
      try {
        const token = localStorage.getItem('token'); // إذا كنتِ بتحتاجي التوكن
        const response = await axios.get('/api/ShippingCompany/total-count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
     
        console.log("total",response);
        setTotalCompanies(response.data.data); // ← تأكدي إذا الـ response فعلاً فيه الرقم مباشرة
      } catch (error) {
        console.error('Error fetching total companies:', error);

if (error.response) {
  // السيرفر ردّ لكن فيه خطأ (زي 404، 500)
  console.error('Response Data:', error.response.data);
  console.error('Status Code:', error.response.status);
  console.error('Headers:', error.response.headers);
} else if (error.request) {
  // الطلب اتبعت لكن مفيش رد من السيرفر
  console.error('No response received:', error.request);
} else {
  // مشكلة حصلت في إعداد الطلب نفسه
  console.error('Error Message:', error.message);
}

console.error('Full Error Object:', error);

      }
    };

    fetchTotalCompanies();
  }, []);
  const [totalStartups, setTotalStartups] = useState(null);

  useEffect(() => {
  const fetchTotalStartups = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/StartUp/total-count', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("total startups", response);
      setTotalStartups(response.data.data);
    } catch (error) {
      console.error('Error fetching total startups:', error);

      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }

      console.error('Full Error Object:', error);
    }
  };

  fetchTotalStartups();
}, []);
  const [totalOffers, setTotalOffers] = useState(null);
  useEffect(() => {
  const fetchTotalOffers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/Offer/Alloffers-count', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("total offers", response);
      setTotalOffers(response.data.data.totalCount); // لاحظي: داخل `data`
    } catch (error) {
      console.error('Error fetching total offers:', error);

      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }

      console.error('Full Error Object:', error);
    }
  };

  fetchTotalOffers();
}, []);
const [shipmentData, setShipmentData] = useState([]);
const [notifications, setNotifications] = useState([]);
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
      const res = await axios.get("/api/Shipment/Admin/StatusCount", {
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
      console.error("❌ Error fetching shipment status:", error);
    }
  };

  fetchShipmentStatus();
}, []);
const [offersStatusSegments, setOffersStatusSegments] = useState([]);

useEffect(() => {
  const fetchOffersStatusCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/Offer/Alloffers-count', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { accepted, rejected } = res.data.data;

      const formattedSegments = [
        { label: 'Accepted', value: Number(accepted) || 0, color: '#21CF61' },
        { label: 'Rejected', value: Number(rejected) || 0, color: '#FD0D0D' },
      ];

      setOffersStatusSegments(formattedSegments);
    } catch (error) {
      console.error("❌ Error fetching offers count:", error);
    }
  };

  fetchOffersStatusCount();
}, []);



   const userName=localStorage.getItem("userNameAdmin");
    const rate =3.9;
  return (
    <div className="min-h-screen">
      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-col gap-x-3 md:flex-row">
    

        {/* Main Dashboard Content */}
        <div className="flex-1">
        <WelcomeHeader userName={userName} rate={rate} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {/* Card 1 */}
      <div className="flex items-center gap-4 bg-[#F6F6F6] px-6 py-5 rounded-xl shadow-sm">
        <div className="bg-[#FFE1CD]  text-[#FFE1CD] text-3xl p-3 rounded-xl">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5 17.5C19.5 18.163 19.2366 18.7989 18.7678 19.2678C18.2989 19.7366 17.663 20 17 20C16.337 20 15.7011 19.7366 15.2322 19.2678C14.7634 18.7989 14.5 18.163 14.5 17.5C14.5 16.837 14.7634 16.2011 15.2322 15.7322C15.7011 15.2634 16.337 15 17 15C17.663 15 18.2989 15.2634 18.7678 15.7322C19.2366 16.2011 19.5 16.837 19.5 17.5ZM9.5 17.5C9.5 18.163 9.23661 18.7989 8.76777 19.2678C8.29893 19.7366 7.66304 20 7 20C6.33696 20 5.70107 19.7366 5.23223 19.2678C4.76339 18.7989 4.5 18.163 4.5 17.5C4.5 16.837 4.76339 16.2011 5.23223 15.7322C5.70107 15.2634 6.33696 15 7 15C7.66304 15 8.29893 15.2634 8.76777 15.7322C9.23661 16.2011 9.5 16.837 9.5 17.5Z" stroke="#DF6109" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 17.5H9.5M19.5 17.5H20.263C20.483 17.5 20.593 17.5 20.685 17.488C21.016 17.4468 21.3239 17.2964 21.5599 17.0606C21.7959 16.8248 21.9465 16.517 21.988 16.186C22 16.093 22 15.983 22 15.763V13C22 11.2761 21.3152 9.62279 20.0962 8.40381C18.8772 7.18482 17.2239 6.5 15.5 6.5M15 15.5V7C15 5.586 15 4.879 14.56 4.44C14.122 4 13.415 4 12 4H5C3.586 4 2.879 4 2.44 4.44C2 4.878 2 5.585 2 7V15C2 15.935 2 16.402 2.201 16.75C2.33265 16.978 2.52199 17.1674 2.75 17.299C3.098 17.5 3.565 17.5 4.5 17.5" stroke="#DF6109" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>
        <div>
          <p className="text-sm text-gray-600 font-normal">Total Shipping Companies</p>
          <p className="text-xl font-bold text-gray-800 mt-1">  {totalCompanies !== null ? totalCompanies : '...'}</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex items-center gap-4 bg-[#F6F6F6] px-6 py-5 rounded-xl shadow-sm">
        <div className="bg-[#7EADE7]  text-[#0066FF] text-3xl p-3 rounded-xl">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.29507 17C3.53007 7.25 8.86307 2.938 12.0001 2C15.1371 2.938 20.4701 7.25 16.7051 17C16.1371 16.688 14.4001 16.063 12.0001 16.063C9.60007 16.063 7.86307 16.688 7.29507 17Z" stroke="#E4E6EC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4996 15.558C18.9416 15.691 20.7076 16.082 21.9806 17C21.9806 17 22.5036 12.064 17.9996 11M6.49958 15.558C5.05758 15.691 3.29158 16.082 2.01858 17C2.01858 17 1.49558 12.064 5.99958 11M9.49958 19C9.49958 19 9.91658 21.5 11.9996 22C14.0826 21.5 14.4996 19 14.4996 19M13.9996 9C13.9996 8.46957 13.7889 7.96086 13.4138 7.58579C13.0387 7.21071 12.53 7 11.9996 7C11.4691 7 10.9604 7.21071 10.5854 7.58579C10.2103 7.96086 9.99958 8.46957 9.99958 9C9.99958 9.53043 10.2103 10.0391 10.5854 10.4142C10.9604 10.7893 11.4691 11 11.9996 11C12.53 11 13.0387 10.7893 13.4138 10.4142C13.7889 10.0391 13.9996 9.53043 13.9996 9Z" stroke="#E4E6EC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>
        <div>
          <p className="text-sm text-gray-600 font-normal">Total Start Up Companies</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
  {totalStartups !== null ? totalStartups : '...'}
</p>

        </div>
      </div>

      {/* Card 3 */}
      <div className="flex items-center gap-4 bg-[#F6F6F6] px-6 py-5 rounded-xl shadow-sm">
        <div className="bg-[#FFF6D2]  text-[#FFD233] text-3xl p-3 rounded-xl">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.058 8.536L17.058 7.923C16.055 7.308 15.554 7 15 7C14.446 7 13.945 7.308 12.942 7.923L11.942 8.536C10.993 9.118 10.519 9.409 10.26 9.878C10 10.348 10 10.913 10 12.044V17.909C10 19.838 10 20.802 10.586 21.401C11.172 22 12.114 22 14 22H16C17.886 22 18.828 22 19.414 21.4C20 20.802 20 19.838 20 17.91V12.044C20 10.913 20 10.347 19.74 9.878C19.48 9.409 19.007 9.118 18.058 8.536Z" stroke="#C5A30D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.0008 7.10801C13.3618 6.49501 12.9808 6.17301 12.4978 6.05201C11.9378 5.91101 11.3498 6.06901 10.1728 6.38501L9.0008 6.69901C7.8878 6.99901 7.3308 7.14701 6.9448 7.51601C6.5578 7.88601 6.4078 8.41001 6.1088 9.45901L4.5548 14.897C4.0448 16.685 3.7888 17.579 4.2228 18.284C4.5948 18.889 6.0848 19.634 7.5018 20" stroke="#C5A30D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.495 10C15.336 9.44001 16.083 8.54301 16.547 7.42701C17.505 5.12201 16.894 2.75701 15.184 2.14601C13.473 1.53401 11.309 2.90601 10.351 5.21101C10.1956 5.58258 10.078 5.96887 10 6.36401" stroke="#C5A30D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>
        <div>
          <p className="text-sm text-gray-600 font-normal">Total Offers</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
  {totalOffers !== null ? totalOffers : '...'}
</p>

        </div>
      </div>
    </div>
          {/* Stats Cards + Shipping Companies */}
        <div className="grid grid-cols-1 mt-4  gap-4 mb-6 items-start">
 
            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 flex-1 items-stretch">
             <StatsCard
  type="users"
  segments={shipmentData}
/>


 
      
<StatsCard
  type="ShipmentsRequest"
  segments={offersStatusSegments}
/>

      
          
             
            </div>

     
      
          </div>

          {/* Company Progress Chart */}
          <CompanyProgress title="Platform Progress" data={chartData} series={chartSeries} />


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

export default DashboardAdmin;

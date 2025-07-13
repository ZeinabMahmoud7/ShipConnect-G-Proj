import { useState } from 'react';
import { WelcomeHeader } from '../components/WelcomeHeader/WelcomeHeader';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { NotificationsList } from '../components/NotificationsList/NotificationsList';
import ShippingCompanies from '../components/ShippingCompanies/ShippingCompanies';
import CompanyProgress from '../components/CompanyProgress/CompanyProgress';
import axios from "axios";
import { useEffect } from "react";

import { Check, Shipments, Message, File } from '../Components/SidebarIcon'; 
const Dashboard = () => {
   const [chartData, setChartData] = useState([]);
const [shipmentData, setShipmentData] = useState([]);
const [shippingScope, setShippingScope] = useState([]);


  const iconMap = {
  check: Check,
  shipments: Shipments,
  message: Message,
  file: File,
};
const titleConfig = {
  "New Offer Received": {
    icon: Message,
    borderColor: "#21CF61",
    iconColor: "#204C80",
  },
  "Shipping Offer Updated": {
    icon: Shipments,
    borderColor: "#F9751C",
    iconColor: "#F9751C",
  },
  // ممكن تضيفي أنواع تانية هنا حسب الحاجة
};
const [shippingSegments, setShippingSegments] = useState([]);
  const [notifications, setNotifications] = useState([]);
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
      const res = await axios.get('api/Shipment/startUp/ShippingScopeCount', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
          console.log("😶‍🌫️",res.data.data);
      const { domestic, international } = res.data.data;

      const formattedSegments = [
        { label: 'Domestic', value: Number(domestic) || 0, color: '#21CF61' },
        { label: 'International', value: Number(international) || 0, color: '#204C80' },
      ];

      setShippingScope(formattedSegments);
    } catch (error) {
      console.error("❌ Error fetching shipping scope count:", error);
    }
  };

  fetchShippingScopeCount();
}, []);


useEffect(() => {
  const fetchChartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("api/Shipment/Performance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      const transformedData = res.data.data.map(item => ({
        month: monthNames[item.month - 1], // تحويل الشهر لاسم
        onTime: item.onTime,
        late: item.late,
      }));

      console.log("📊 Transformed Chart Data:", transformedData);
      setChartData(transformedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  fetchChartData();
}, []);
useEffect(() => {
  const fetchShippingMethodCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('api/Shipment/startUp/ShippingMethodCount', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📦 Raw API Response:", res.data);

      const { land, sea, air } = res.data.data;

      const formattedSegments = [
        { label: 'Land', value: land, color: '#989EAE' },
        { label: 'Sea', value: sea, color: '#204C80' },
        { label: 'Air', value: air, color: '#7EADE7' },
      ];

      console.log("✅ Formatted Segments:", formattedSegments);

      setShippingSegments(formattedSegments);
    } catch (error) {
      console.error("❌ Error fetching shipping method count:", error);
      console.error("❌ Error response:", error.response?.data);

    }
  };

  fetchShippingMethodCount();
}, []);

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
  let borderColor = "#D1D5DC";
  let iconColor = "#6B7280";

  if (notif.notificationType === 1) {
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




   const userName = 'Bayu Sasmita';
   const rate=4.9;


const chartSeries = [
  {
    key: 'late',
    label: 'Late ',
    color: '#10233E',
    icon: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="7" width="16" height="2" fill="#255C9C"/>
<circle cx="8.5" cy="8" r="3.5" fill="white" stroke="#255C9C"/>
</svg>

  },
  {
    key: 'onTime',
    label: 'On Time',
    color: '#F9751C',
    icon: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="7" width="16" height="2" fill="#F9751C"/>
<circle cx="8.5" cy="8" r="3.5" fill="white" stroke="#F9751C"/>
</svg>

  }
];
// const notifications = [
//   {
//     id: 1,
//     message: ' Your shipment request has been sent to selected shipping companies',
//     date: '09-02-2024',
//     icon: Check,
//     borderColor: '#21CF61',
//     iconColor: '#21CF61',
//   },
//   {
//     id: 2,
//     message: ' Swift has accepted your shipping request',
//     date: '09-02-2024',
//     icon: Check,
//     borderColor: '#21CF61',
//     iconColor: '#21CF61',
//   },
//   {
//     id: 3,
//     message: 'Your shipment to cairo now in transit',
//     date: '09-02-2024',
//     icon: Shipments,
//     borderColor: '#F9751C',
//     iconColor: '#F9751C',
//   },
//   {
//     id: 4,
//     message: "You've received a new message from Swift",
//     date: '09-02-2024',
//     icon: Message,
//     borderColor: '#21CF61',
//     iconColor: '#21CF61',
//   },
//   {
//     id: 5,
//     message: 'Your weekly shipping performance report is ready',
//     date: '09-02-2024',
//     icon: File,
//     borderColor: '#F9751C',
//     iconColor: '#F9751C',
//   },
// ];

  return (
    <div className="min-h-screen">
      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-col gap-x-3 md:flex-row">
    

        {/* Main Dashboard Content */}
        <div className="flex-1">
          <WelcomeHeader userName={userName} rate={rate} />

          {/* Stats Cards + Shipping Companies */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-6 items-start">

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
 
  <StatsCard
    type="users"
    segments={shipmentData} // نفس تنسيق Land, Sea, Air
  />



           <StatsCard
  type="sales"
  segments={shippingSegments}
/>


              <StatsCard
                type="traffic"
                segments={[
                  { label: 'Paid', value: 85, color: '#21CF61' },
                  { label: 'No', value: 15, color: '#FD0D0D' },
                ]}
              />

          <StatsCard
  type="Scope"
  segments={shippingScope}
/>

            </div>

            {/* Right side: Shipping Companies */}
            <div className="w-full lg:max-w-xs h-full self-stretch">
              <ShippingCompanies />
            </div>
          </div>

          {/* Company Progress Chart */}
            <CompanyProgress
        title="On-Time vs. Delayed Deliveries"
        data={chartData}
        series={chartSeries}
      />

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

export default Dashboard;

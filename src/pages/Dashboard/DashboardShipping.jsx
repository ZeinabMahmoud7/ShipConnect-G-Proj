import React, { useState, useEffect } from 'react';
import { WelcomeHeader } from '../../components/WelcomeHeader/WelcomeHeader';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { NotificationsList } from '../../components/NotificationsList/NotificationsList';
import ShippingCompanies from '../../components/ShippingCompanies/ShippingCompanies';
import CompanyProgress from '../../components/CompanyProgress/CompanyProgress';
import { Check, Shipments, Message, File } from '../../Components/SidebarIcon';
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
    <path d="M12.7276 2.44418L14.4874 5.99288C14.7274 6.48687 15.3673 6.9607 15.9073 7.05143L19.0969 7.58575C21.1367 7.92853 21.6167 9.4206 20.1468 10.8925L17.6671 13.3927C17.2471 13.8161 17.0172 14.6327 17.1471 15.2175L17.8571 18.3125C18.417 20.7623 17.1271 21.71 14.9774 20.4296L11.9877 18.6452C11.4478 18.3226 10.5579 18.3226 10.0079 18.6452L7.01824 20.4296C4.87847 21.71 3.57862 20.7522 4.13856 18.3125L4.84848 15.2175C4.97846 14.6327 4.74849 13.8161 4.32853 13.3927L1.84881 10.8925C0.388969 9.4206 0.858919 7.92853 2.89869 7.58575L6.08834 7.05143C6.61828 6.9607 7.25821 6.48687 7.49818 5.99288L9.25797 2.44418C10.2179 0.518607 11.7777 0.518607 12.7276 2.44418Z" fill="#FDC700" stroke="#FDC700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Spinner = () => (
  <div className="flex justify-center items-center py-6">
    <div className="w-8 h-8 border-4 border-primaryBlue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const DashboardShipping = () => {
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  const [shipmentData, setShipmentData] = useState([]);
  const [loadingShipmentData, setLoadingShipmentData] = useState(true);

  const [shippingScope, setShippingScope] = useState([]);
  const [loadingScope, setLoadingScope] = useState(true);

  const [lastRating, setLastRating] = useState(null);
  const [loadingRating, setLoadingRating] = useState(true);

  const userName = (localStorage.getItem("userNameShipping") || "").split(" ").slice(0, 2).join(" ");
  const rate = 3.9;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("api/Notification/MyNotifications?pageNumber=1&pageSize=10", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = res.data.data.data.map((notif, index) => {
          let icon = File;
          let borderColor = "#F9751C";
          let iconColor = "#F9751C";

          if (notif.notificationType === 1 || notif.notificationType === 2) {
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
      } finally {
        setLoadingNotifications(false);
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
        const selectedKeys = ["delivered", "inTransit", "pending"];
        const colorMap = { delivered: "#21CF61", inTransit: "#F9751C", pending: "#F7CF37" };

        const formattedSegments = selectedKeys.map((key) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
          value: Number(data[key]) || 0,
          color: colorMap[key]
        }));

        setShipmentData(formattedSegments);
      } catch (error) {
        console.error("❌ Error fetching shipment status:", error);
      } finally {
        setLoadingShipmentData(false);
      }
    };

    fetchShipmentStatus();
  }, []);

  useEffect(() => {
    const fetchShippingScopeCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('api/Offer/status-count', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { accepted, rejected } = res.data.data;
        const formattedSegments = [
          { label: 'Accepted', value: Number(accepted) || 0, color: '#21CF61' },
          { label: 'Rejected', value: Number(rejected) || 0, color: '#FD0D0D' },
        ];

        setShippingScope(formattedSegments);
      } catch (error) {
        console.error("❌ Error fetching shipping scope count:", error);
      } finally {
        setLoadingScope(false);
      }
    };

    fetchShippingScopeCount();
  }, []);

  useEffect(() => {
    const fetchLastRating = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/Rating/LastRate", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLastRating(res.data.data);
      } catch (error) {
        console.error("❌ Error fetching last rating:", error);
      } finally {
        setLoadingRating(false);
      }
    };

    fetchLastRating();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-x-3 md:flex-row">
        <div className="flex-1">
          <WelcomeHeader userName={userName} rate={rate} />

          <div className="grid grid-cols-1 gap-4 mb-6 items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 items-stretch">
              {loadingShipmentData ? <Spinner /> : <StatsCard type="users" segments={shipmentData} />}
              {loadingScope ? <Spinner /> : <StatsCard type="Offers" segments={shippingScope} />}
              {loadingRating ? <Spinner /> : lastRating && (
                <div className="border border-[#CACED8] bg-[#F1F1F166] rounded-[20px] px-4 py-5">
                  <h3 className='flex gap-x-2 mb-3 text-primaryBlue items-center font-semibold text-lg'>
                    {/* أيقونة */}
                    StartUps Feedback
                  </h3>
                  <div className="bg-[#F3F4F6] px-[16px] py-[20px] rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="flex gap-[2px] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} style={{ opacity: i < Math.round(lastRating.score) ? 1 : 0.3 }} />
                      ))}
                    </div>
                    <p className="text-[#101828BF] text-[20px] leading-relaxed">
                      "{lastRating.comment}"
                    </p>
                  </div>
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

          <CompanyProgress title="Company Progress " data={chartData} series={chartSeries} />

          {loadingNotifications ? <Spinner /> :
            notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center bg-white rounded-xl border border-borderGray p-6 shadow-sm">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5v3m0 0h-3m3 0h3m-3 0v3m0-3v-3m-6.75 9.75a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" />
                </svg>
                <p className="text-sm text-gray-600 font-medium">You don't have any notifications yet</p>
                <p className="text-xs text-gray-400 mt-1">We’ll let you know when something arrives!</p>
              </div>
            ) : (
              <NotificationsList title="Latest Notifications" notifications={notifications} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardShipping;

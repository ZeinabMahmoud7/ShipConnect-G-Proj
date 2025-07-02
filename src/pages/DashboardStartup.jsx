import React from 'react';

import { WelcomeHeader } from '../components/WelcomeHeader/WelcomeHeader';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { NotificationsList } from '../components/NotificationsList/NotificationsList';
import ShippingCompanies from '../components/ShippingCompanies/ShippingCompanies';
import CompanyProgress from '../components/CompanyProgress/CompanyProgress';

import { Check, Shipments, Message, File } from '../Components/SidebarIcon'; 
const Dashboard = () => {
   const userName = 'Bayu Sasmita';
   const rate=4.9;
const chartData = [
  { month: 'Jan', late: 40, onTime: 60 },
  { month: 'Feb', late: 30, onTime: 70 },
  { month: 'Mar', late: 50, onTime: 50 },
  { month: 'Apr', late: 55, onTime: 45 },
  { month: 'May', late: 20, onTime: 80 },
  { month: 'Jun', late: 35, onTime: 65 },
  { month: 'Jul', late: 25, onTime: 75 },
  { month: 'Aug', late: 60, onTime: 40 },
  { month: 'Sep', late: 50, onTime: 50 },
  { month: 'Oct', late: 45, onTime: 55 },
  { month: 'Nov', late: 30, onTime: 70 },
  { month: 'Dec', late: 20, onTime: 80 },
];

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
const notifications = [
  {
    id: 1,
    message: ' Your shipment request has been sent to selected shipping companies',
    date: '09-02-2024',
    icon: Check,
    borderColor: '#21CF61',
    iconColor: '#21CF61',
  },
  {
    id: 2,
    message: ' Swift has accepted your shipping request',
    date: '09-02-2024',
    icon: Check,
    borderColor: '#21CF61',
    iconColor: '#21CF61',
  },
  {
    id: 3,
    message: 'Your shipment to cairo now in transit',
    date: '09-02-2024',
    icon: Shipments,
    borderColor: '#F9751C',
    iconColor: '#F9751C',
  },
  {
    id: 4,
    message: "You've received a new message from Swift",
    date: '09-02-2024',
    icon: Message,
    borderColor: '#21CF61',
    iconColor: '#21CF61',
  },
  {
    id: 5,
    message: 'Your weekly shipping performance report is ready',
    date: '09-02-2024',
    icon: File,
    borderColor: '#F9751C',
    iconColor: '#F9751C',
  },
];

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
                segments={[
                  { label: 'Delivered', value: 70, color: '#21CF61' },
                  { label: 'In Transit', value: 30, color: '#F9751C' },
                  { label: 'Pending', value: 10, color: '#F7CF37' },
                ]}
              />

              <StatsCard
                type="sales"
                segments={[
                  { label: 'Land', value: 70, color: '#989EAE' },
                  { label: 'Sea', value: 20, color: '#204C80' },
                  { label: 'Air', value: 10, color: '#7EADE7' },
                ]}
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
                segments={[
                  { label: 'Domestic', value: 50, color: '#21CF61' },
                  { label: 'International', value: 50, color: '#204C80' },
                ]}
              />
            </div>

            {/* Right side: Shipping Companies */}
            <div className="w-full lg:max-w-xs h-full self-stretch">
              <ShippingCompanies />
            </div>
          </div>

          {/* Company Progress Chart */}
          <CompanyProgress title="Shipping Performance" data={chartData} series={chartSeries} />

          {/* Notifications */}
         <NotificationsList title="Latest Notifications" notifications={notifications} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';

import { WelcomeHeader } from '../components/WelcomeHeader/WelcomeHeader';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { NotificationsList } from '../components/NotificationsList/NotificationsList';
import ShippingCompanies from '../components/ShippingCompanies/ShippingCompanies';
import CompanyProgress from '../components/CompanyProgress/CompanyProgress';
import { Check, Shipments, Message, File } from '../Components/SidebarIcon'; 

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
 const nour = [
               {
                 name: "Nour",
                 title: "Startup Founder",
                 feedback:
                   "ShipConnect helped us compare shipping offers in minutes. It saved us time and cut our costs!",
                 image: "https://themify.me/demo/themes/ultra-lifestyle/files/2019/02/author-big.jpg",
               },
             
             ];
             
             const Star = () => (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M12.7276 2.44418L14.4874 5.99288C14.7274 6.48687 15.3673 6.9607 15.9073 7.05143L19.0969 7.58575C21.1367 7.92853 21.6167 9.4206 20.1468 10.8925L17.6671 13.3927C17.2471 13.8161 17.0172 14.6327 17.1471 15.2175L17.8571 18.3125C18.417 20.7623 17.1271 21.71 14.9774 20.4296L11.9877 18.6452C11.4478 18.3226 10.5579 18.3226 10.0079 18.6452L7.01824 20.4296C4.87847 21.71 3.57862 20.7522 4.13856 18.3125L4.84848 15.2175C4.97846 14.6327 4.74849 13.8161 4.32853 13.3927L1.84881 10.8925C0.388969 9.4206 0.858919 7.92853 2.89869 7.58575L6.08834 7.05143C6.61828 6.9607 7.25821 6.48687 7.49818 5.99288L9.25797 2.44418C10.2179 0.518607 11.7777 0.518607 12.7276 2.44418Z" fill="#FDC700" stroke="#FDC700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
             
             );
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
const DashboardShipping = () => {
    const userName='John Smith';
    const rate =3.9;
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
                segments={[
                  { label: 'Delivered', value: 70, color: '#21CF61' },
                  { label: 'In Transit', value: 30, color: '#F9751C' },
                  { label: 'Pending', value: 10, color: '#F7CF37' },
                ]}
              />

              <StatsCard
                type="Offers"
                segments={[
                  { label: 'Accepted', value: 85, color: '#21CF61' },
                  { label: 'Rejected', value: 15, color: '#FD0D0D' },
                ]}
              />
         <div className='border border-[#CACED8] border-1 bg-[#F1F1F166] rounded-[20px] px-2 py-5'>
  <div className="bg-[#F3F4F6] px-[16px] py-[20px] rounded-xl shadow-sm p-6 flex flex-col justify-between">
    {/* النجوم */}
    <div className="flex gap-[2px] mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} />
      ))}
    </div>
    {/* النص */}
    <p className="text-[#101828BF] text-[20px] leading-relaxed">
      "{nour[0].feedback}"
    </p>
  </div>

  {/* الشخص */}
  <div className="flex items-center mt-6">
    <img
      src={nour[0].image}
      alt={nour[0].name}
      className="w-10 h-10 rounded-full mr-4"
    />
    <div>
      <p className="font-bold text-[#000000] text-[16px]">{nour[0].name}</p>
      <p className="text-sm text-[#99A1AF]">{nour[0].title}</p>
    </div>
  </div>
          </div>
                   
                   
          
             
            </div>

     
      
          </div>

          {/* Company Progress Chart */}
          <CompanyProgress title="Company Progress " data={chartData} series={chartSeries} />


          {/* Notifications */}
           <NotificationsList title="Latest Notifications" notifications={notifications} />
        </div>
      </div>
    </div>
  );
};

export default DashboardShipping;

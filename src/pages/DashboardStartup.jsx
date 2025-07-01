import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { WelcomeHeader } from '../components/WelcomeHeader/WelcomeHeader';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { NotificationsList } from '../components/NotificationsList/NotificationsList';
import ShippingCompanies from '../components/ShippingCompanies/ShippingCompanies';
import CompanyProgress from '../components/CompanyProgress/CompanyProgress';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-col gap-x-3 md:flex-row">
    

        {/* Main Dashboard Content */}
        <div className="flex-1">
          <WelcomeHeader />

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
          <CompanyProgress />

          {/* Notifications */}
          <NotificationsList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

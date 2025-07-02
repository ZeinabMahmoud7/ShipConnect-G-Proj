import React from 'react';

export function NotificationsList({ title = "Notifications", notifications = [] }) {
  return (
    <div className="p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5845 20.9242C3.28275 22.899 4.63 24.269 6.279 24.9518C12.6016 27.5726 21.3991 27.5726 27.7217 24.9518C29.3707 24.269 30.7179 22.8976 30.4162 20.9242C30.232 19.7101 29.3154 18.7 28.6368 17.7126C27.7486 16.4036 27.6607 14.977 27.6593 13.4584C27.6607 7.59054 22.8894 2.83337 17.0003 2.83337C11.1112 2.83337 6.33992 7.59054 6.33992 13.4584C6.33992 14.977 6.25208 16.405 5.36242 17.7126C4.68525 18.7 3.77008 19.7101 3.5845 20.9242Z" stroke="#1A3D65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.334 26.9167C11.9828 29.3605 14.275 31.1667 17.0007 31.1667C19.7277 31.1667 22.0171 29.3605 22.6673 26.9167" stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-primaryBlue font-normal text-2xl">{title}</span>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className="p-4 rounded-2xl border-2 bg-transparent"
              style={{ borderColor: notification.borderColor }}
            >
              <div className="flex">
                <Icon className="w-5 h-5 mt-0.5 me-2" style={{ color: notification.iconColor }} />
                <div className="flex flex-col ms-2 items-start min-w-0">
                  <p className="text-lg font-semibold leading-relaxed" style={{ color: notification.iconColor }}>
                    {notification.message}
                  </p>
                  <p className="text-lg mt-1 font-normal" style={{ color: '#10233E99' }}>
                    {notification.date}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

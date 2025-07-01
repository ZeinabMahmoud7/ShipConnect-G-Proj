import React from 'react';


 const Check = () => (
  
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12Z" stroke="#21CF61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12.75C8 12.75 9.6 13.662 10.4 15C10.4 15 12.8 9.75 16 8" stroke="#21CF61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
   const Shipments = () => (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C11.182 22 10.4 21.67 8.837 21.01C4.946 19.366 3 18.543 3 17.16V7M12 22C12.818 22 13.6 21.67 15.163 21.01C19.054 19.366 21 18.543 21 17.16V7M12 22V11.355M6 12L8 13M17 4L7 9M8.326 9.691L5.405 8.278C3.802 7.502 3 7.114 3 6.5C3 5.886 3.802 5.498 5.405 4.722L8.325 3.309C10.13 2.436 11.03 2 12 2C12.97 2 13.871 2.436 15.674 3.309L18.595 4.722C20.198 5.498 21 5.886 21 6.5C21 7.114 20.198 7.502 18.595 8.278L15.675 9.691C13.87 10.564 12.97 11 12 11C11.03 11 10.129 10.564 8.326 9.691Z" stroke="#F9751C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
   const Message = () => (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1697 20.8901C18.3537 20.6131 21.6857 17.2331 21.9597 12.9901C22.0127 12.1601 22.0127 11.3001 21.9597 10.4701C21.6857 6.22806 18.3537 2.85006 14.1697 2.57106C12.7246 2.47583 11.2748 2.47583 9.82973 2.57106C5.64573 2.84906 2.31373 6.22806 2.03973 10.4711C1.98676 11.3102 1.98676 12.1519 2.03973 12.9911C2.13973 14.5361 2.82273 15.9671 3.62773 17.1751C4.09473 18.0201 3.78673 19.0751 3.29973 19.9981C2.94973 20.6631 2.77373 20.9951 2.91473 21.2351C3.05473 21.4751 3.36973 21.4831 3.99873 21.4981C5.24373 21.5281 6.08273 21.1761 6.74873 20.6851C7.12573 20.4061 7.31473 20.2671 7.44473 20.2511C7.57473 20.2351 7.83173 20.3411 8.34373 20.5511C8.80373 20.7411 9.33873 20.8581 9.82873 20.8911C11.2537 20.9851 12.7427 20.9851 14.1707 20.8911M11.9947 12.0001H12.0047M15.9907 12.0001H15.9997M7.99973 12.0001H8.00873" stroke="#21CF61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
     const File = () => (

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 15H8M18 15V18C18 19.886 18 20.828 17.531 21.414C17.084 21.974 16.376 21.999 15 22M18.008 6H17.998M8 22H6C4.114 22 3.172 22 2.586 21.414C2 20.828 2 19.886 2 18V16C2 14.114 2 13.172 2.586 12.586C3.172 12 4.114 12 6 12H8C9.886 12 10.828 12 11.414 12.586C12 13.172 12 14.114 12 16V18C12 19.886 12 20.828 11.414 21.414C10.828 22 9.886 22 8 22ZM18 2C15.79 2 14 3.809 14 6.04C14 7.316 14.5 8.308 15.5 9.194C16.205 9.819 17.059 10.857 17.571 11.697C17.817 12.101 18.165 12.101 18.429 11.697C18.967 10.873 19.795 9.819 20.5 9.195C21.5 8.308 22 7.316 22 6.04C22 3.81 20.21 2 18 2Z" stroke="#F9751C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
 
export function NotificationsList() {
  return (
    <div className="p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5845 20.9242C3.28275 22.899 4.63 24.269 6.279 24.9518C12.6016 27.5726 21.3991 27.5726 27.7217 24.9518C29.3707 24.269 30.7179 22.8976 30.4162 20.9242C30.232 19.7101 29.3154 18.7 28.6368 17.7126C27.7486 16.4036 27.6607 14.977 27.6593 13.4584C27.6607 7.59054 22.8894 2.83337 17.0003 2.83337C11.1112 2.83337 6.33992 7.59054 6.33992 13.4584C6.33992 14.977 6.25208 16.405 5.36242 17.7126C4.68525 18.7 3.77008 19.7101 3.5845 20.9242Z" stroke="#1A3D65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.334 26.9167C11.9828 29.3605 14.275 31.1667 17.0007 31.1667C19.7277 31.1667 22.0171 29.3605 22.6673 26.9167" stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-primaryBlue font-normal text-2xl">Notifications</span>
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
      <div className="flex ">
        <Icon
          className="w-5 h-5 mt-0.5 me-2"
          style={{ color: notification.iconColor }}
        />
        <div className="flex flex-col ms-2 items-start min-w-0">
          <p className="text-lg font-semibold leading-relaxed" style={{color:notification.iconColor}}>
            {notification.message}
          </p>
          <p className="text-lg mt-1 font-normal" style={{color:'#10233E99'}}>
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

import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import  { useState } from 'react';


export function StatsCard({ type, segments }) {

 const total = segments.reduce((sum, s) => sum + s.value, 0);
const average = segments.length ? Math.round(total / segments.length) : 0;


  const ShipmentsIcon = () => (
    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 16.5C8.8865 16.5 8.3 16.2525 7.12775 15.7575C4.2095 14.5245 2.75 13.9072 2.75 12.87V5.25M9.5 16.5C10.1135 16.5 10.7 16.2525 11.8723 15.7575C14.7905 14.5245 16.25 13.9072 16.25 12.87V5.25M9.5 16.5V8.51625M5 9L6.5 9.75M13.25 3L5.75 6.75M6.7445 7.26825L4.55375 6.2085C3.3515 5.6265 2.75 5.3355 2.75 4.875C2.75 4.4145 3.3515 4.1235 4.55375 3.5415L6.74375 2.48175C8.0975 1.827 8.7725 1.5 9.5 1.5C10.2275 1.5 10.9032 1.827 12.2555 2.48175L14.4462 3.5415C15.6485 4.1235 16.25 4.4145 16.25 4.875C16.25 5.3355 15.6485 5.6265 14.4462 6.2085L12.2563 7.26825C10.9025 7.923 10.2275 8.25 9.5 8.25C8.7725 8.25 8.09675 7.923 6.7445 7.26825Z"
        stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ShippingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.5 17.5C19.5 18.163 19.2366 18.7989 18.7678 19.2678C18.2989 19.7366 17.663 20 17 20C16.337 20 15.7011 19.7366 15.2322 19.2678C14.7634 18.7989 14.5 18.163 14.5 17.5C14.5 16.837 14.7634 16.2011 15.2322 15.7322C15.7011 15.2634 16.337 15 17 15C17.663 15 18.2989 15.2634 18.7678 15.7322C19.2366 16.2011 19.5 16.837 19.5 17.5ZM9.5 17.5C9.5 18.163 9.23661 18.7989 8.76777 19.2678C8.29893 19.7366 7.66304 20 7 20C6.33696 20 5.70107 19.7366 5.23223 19.2678C4.76339 18.7989 4.5 18.163 4.5 17.5C4.5 16.837 4.76339 16.2011 5.23223 15.7322C5.70107 15.2634 6.33696 15 7 15C7.66304 15 8.29893 15.2634 8.76777 15.7322C9.23661 16.2011 9.5 16.837 9.5 17.5Z"
        stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 17.5H9.5M19.5 17.5H20.263C20.483 17.5 20.593 17.5 20.685 17.488C21.016 17.4468 21.3239 17.2964 21.5599 17.0606C21.7959 16.8248 21.9465 16.517 21.988 16.186C22 16.093 22 15.983 22 15.763V13C22 11.2761 21.3152 9.62279 20.0962 8.40381C18.8772 7.18482 17.2239 6.5 15.5 6.5M15 15.5V7C15 5.586 15 4.879 14.56 4.44C14.122 4 13.415 4 12 4H5C3.586 4 2.879 4 2.44 4.44C2 4.878 2 5.585 2 7V15C2 15.935 2 16.402 2.201 16.75C2.33265 16.978 2.52199 17.1674 2.75 17.299C3.098 17.5 3.565 17.5 4.5 17.5"
        stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const PaymentsIcon = () => (
    
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4.5H8.757C9.1511 4.49995 9.54135 4.57756 9.90545 4.72838C10.2696 4.8792 10.6004 5.10029 10.879 5.379L14 8.5M5 13.5H2M8.5 7.5L10.5 9.5C10.6313 9.63132 10.7355 9.78722 10.8066 9.9588C10.8776 10.1304 10.9142 10.3143 10.9142 10.5C10.9142 10.6857 10.8776 10.8696 10.8066 11.0412C10.7355 11.2128 10.6313 11.3687 10.5 11.5C10.3687 11.6313 10.2128 11.7355 10.0412 11.8066C9.86962 11.8776 9.68572 11.9142 9.5 11.9142C9.31428 11.9142 9.13038 11.8776 8.9588 11.8066C8.78722 11.7355 8.63132 11.6313 8.5 11.5L7 10C6.14 10.86 4.777 10.957 3.803 10.227L3.5 10" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 11V15.5C5 17.386 5 18.328 5.586 18.914C6.172 19.5 7.114 19.5 9 19.5H18C19.886 19.5 20.828 19.5 21.414 18.914C22 18.328 22 17.386 22 15.5V12.5C22 10.614 22 9.672 21.414 9.086C20.828 8.5 19.886 8.5 18 8.5H9.5" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.25 14C15.25 14.4641 15.0656 14.9092 14.7374 15.2374C14.4092 15.5656 13.9641 15.75 13.5 15.75C13.0359 15.75 12.5908 15.5656 12.2626 15.2374C11.9344 14.9092 11.75 14.4641 11.75 14C11.75 13.5359 11.9344 13.0908 12.2626 12.7626C12.5908 12.4344 13.0359 12.25 13.5 12.25C13.9641 12.25 14.4092 12.4344 14.7374 12.7626C15.0656 13.0908 15.25 13.5359 15.25 14Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
    const OffersIcon = () => (
    
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.058 8.536L17.058 7.923C16.055 7.308 15.554 7 15 7C14.446 7 13.945 7.308 12.942 7.923L11.942 8.536C10.993 9.118 10.519 9.409 10.26 9.878C10 10.348 10 10.913 10 12.044V17.909C10 19.838 10 20.802 10.586 21.401C11.172 22 12.114 22 14 22H16C17.886 22 18.828 22 19.414 21.4C20 20.802 20 19.838 20 17.91V12.044C20 10.913 20 10.347 19.74 9.878C19.48 9.409 19.007 9.118 18.058 8.536Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.0008 7.10801C13.3618 6.49501 12.9808 6.17301 12.4978 6.05201C11.9378 5.91101 11.3498 6.06901 10.1728 6.38501L9.0008 6.69901C7.8878 6.99901 7.3308 7.14701 6.9448 7.51601C6.5578 7.88601 6.4078 8.41001 6.1088 9.45901L4.5548 14.897C4.0448 16.685 3.7888 17.579 4.2228 18.284C4.5948 18.889 6.0848 19.634 7.5018 20" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.495 10C15.336 9.44001 16.083 8.54301 16.547 7.42701C17.505 5.12201 16.894 2.75701 15.184 2.14601C13.473 1.53401 11.309 2.90601 10.351 5.21101C10.1956 5.58258 10.078 5.96887 10 6.36401" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  );
    const ShipReq = () => (
    
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 21H8.5C5.2 21 3.55 21 2.525 19.92C1.5 18.843 1.5 17.106 1.5 13.633V8.368C1.5 4.895 1.5 3.158 2.525 2.079C3.55 1 5.2 1 8.5 1H11.5C14.8 1 16.45 1 17.475 2.08C18.5 3.157 18.5 4.894 18.5 8.367V10M17 14V21M20.5 17.5H13.5" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 1L6.082 1.493C6.282 2.69 6.382 3.289 6.802 3.645C7.22 4 7.827 4 9.041 4H10.958C12.171 4 12.778 4 13.198 3.645C13.618 3.289 13.718 2.69 13.917 1.493L14 1M6 15H10M6 10H14" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>



  );
  const typeConfig = {
    users: {
      title: 'Shipments',
      icon: <ShipmentsIcon />,
      bg: '#FFFCFA',
      border: '#FFE1CD',
      centerLabel: 'Shipments',
    },
    sales: {
      title: 'Shipping Method',
      icon: <ShippingIcon />,
      bg: '#FFE1CD',
      border: '#FFE1CD',
      centerLabel: 'Shipping',
    },
    traffic: {
      title: 'Payment',
      icon: <PaymentsIcon />,
      bg: '#FFFCFA',
      border: '#FFE1CD',
      centerLabel: 'Egp',
    },
    Scope: {
      title: 'Shipping Scope',
      icon: <ShippingIcon />,
      bg: '#FFE1CD',
      border: '#FFE1CD',
      centerLabel: 'Shipping',
    },
       Offers: {
      title: 'Offers',
      icon: <OffersIcon />,
      bg: '#FFE1CD',
      border: '#FFE1CD',
      centerLabel: 'Shipping',
    },
          ShipmentsRequest: {
      title: 'Shipment Request',
      icon: <ShipReq />,
      bg: '#FFE1CD',
      border: '#FFE1CD',
      centerLabel: 'Shipping',
    },
  };

  const { title, icon, bg, border, centerLabel } = typeConfig[type];
const [tooltip, setTooltip] = useState({
  visible: false,
  x: 0,
  y: 0,
  content: '',
});

  return (


<><div className="bg-white rounded-2xl shadow border px-5 py-6 h-fit"
 style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-primaryBlue font-normal  text-2xl">{title}</h3>
      </div>
  <div className="flex justify-center ">
  <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
    {/* دائرة الرسم */}
    <div className="flex justify-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e5e7eb" strokeWidth="3" />
       {segments.map((segment, index) => {
  const gap = 4;

  // حول القيمة إلى رقم، ولو مش رقم خليها 0
  const safeValue = Number(segment.value) || 0;

  // نفس الشيء لـ offset
  const offset = segments
    .slice(0, index)
    .reduce((sum, s) => sum + (Number(s.value) || 0), 0);

  // حساب القيمة النهائية مع طرح gap
  const value = safeValue - gap >= 0 ? safeValue - gap : 0;

  return (
<circle
  key={index}
  cx="18"
  cy="18"
  r="15.9155"
  fill="none"
  stroke={segment.color}
  strokeWidth="3"
  strokeDasharray={`${value} ${100 - value}`}
  strokeDashoffset={-offset}
  strokeLinecap="round"
  style={{ cursor: 'pointer' }}
  onMouseEnter={(e) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.x + rect.width / 2,
      y: rect.y - 10,
      content: `${segment.label}: ${segment.value} (${((safeValue / total) * 100).toFixed(1)}%)`,
    });
  }}
  onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
/>



  );
})}

        </svg>
        {tooltip.visible && (
  <div
    className="fixed bg-primaryBlue text-white text-xs px-2 py-1 rounded shadow z-50"
    style={{
      top: tooltip.y,
      left: tooltip.x,
      transform: 'translate(-50%, -100%)',
      pointerEvents: 'none',
    }}
  >
    {tooltip.content}
  </div>
)}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-lg font-semibold text-gray-700">{total}</div>
        </div>
      </div>
    </div>

    {/* العناصر النصية */}
    <div className="space-y-2 text-center lg:text-left">
      {segments.map((segment, index) => (
        <div key={index} className="flex items-center justify-center lg:justify-start gap-2 text-sm">
          <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: segment.color }}></span>
          <span className="font-semibold text-md" style={{ color: segment.color }}>{segment.label}</span>
        </div>
      ))}
    </div>
  </div>
</div>

     
    </div>
  
</>
  );
}

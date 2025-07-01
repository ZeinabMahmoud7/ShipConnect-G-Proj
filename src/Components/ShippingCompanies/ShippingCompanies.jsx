import React from 'react';

const companies = [
  { name: "FleetFlash Logistics", image: "https://i.imgur.com/KXjBzL0.png" },
  { name: "SwiftWave Shipping", image: "https://i.imgur.com/q2vX3ZQ.png" },
  { name: "TransPulse Express", image: "https://i.imgur.com/vHnQvVV.png" },
  { name: "OceanAura Freight", image: "https://i.imgur.com/I3qMUDk.png" },
  { name: "GlobalGlide Carriers", image: "https://i.imgur.com/73nQYwU.png" },
  { name: "FleetFlash Logistics", image: "https://i.imgur.com/KXjBzL0.png" },
  { name: "SwiftWave Shipping", image: "https://i.imgur.com/q2vX3ZQ.png" },
  { name: "TransPulse Express", image: "https://i.imgur.com/vHnQvVV.png" },
  { name: "OceanAura Freight", image: "https://i.imgur.com/I3qMUDk.png" },
];

export default function ShippingCompanies() {
  return (
    <div className="bg-lightGray border border-borderGray rounded-2xl px-4 py-5 w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#0e3c6e] text-lg">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5 17.5C19.5 18.163 19.2366 18.7989 18.7678 19.2678C18.2989 19.7366 17.663 20 17 20C16.337 20 15.7011 19.7366 15.2322 19.2678C14.7634 18.7989 14.5 18.163 14.5 17.5C14.5 16.837 14.7634 16.2011 15.2322 15.7322C15.7011 15.2634 16.337 15 17 15C17.663 15 18.2989 15.2634 18.7678 15.7322C19.2366 16.2011 19.5 16.837 19.5 17.5ZM9.5 17.5C9.5 18.163 9.23661 18.7989 8.76777 19.2678C8.29893 19.7366 7.66304 20 7 20C6.33696 20 5.70107 19.7366 5.23223 19.2678C4.76339 18.7989 4.5 18.163 4.5 17.5C4.5 16.837 4.76339 16.2011 5.23223 15.7322C5.70107 15.2634 6.33696 15 7 15C7.66304 15 8.29893 15.2634 8.76777 15.7322C9.23661 16.2011 9.5 16.837 9.5 17.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 17.5H9.5M19.5 17.5H20.263C20.483 17.5 20.593 17.5 20.685 17.488C21.016 17.4468 21.3239 17.2964 21.5599 17.0606C21.7959 16.8248 21.9465 16.517 21.988 16.186C22 16.093 22 15.983 22 15.763V13C22 11.2761 21.3152 9.62279 20.0962 8.40381C18.8772 7.18482 17.2239 6.5 15.5 6.5M15 15.5V7C15 5.586 15 4.879 14.56 4.44C14.122 4 13.415 4 12 4H5C3.586 4 2.879 4 2.44 4.44C2 4.878 2 5.585 2 7V15C2 15.935 2 16.402 2.201 16.75C2.33265 16.978 2.52199 17.1674 2.75 17.299C3.098 17.5 3.565 17.5 4.5 17.5" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
        <h2 className="text-base font-semibold text-primaryBlue">Your Shipping Companies</h2>
      </div>
      <div className="space-y-3">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-3 bg-white rounded-xl border border-borderGray px-3 py-2"
          >
            <img
              src={company.image}
              alt={company.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-primaryBlue font-medium text-sm">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

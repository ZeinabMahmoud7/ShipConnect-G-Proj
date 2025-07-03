import React, { useState } from 'react';
import {
  FaSearch,
  FaTimes,
  FaSlidersH,
  FaCalendarAlt,
  FaMoneyBillWave
} from 'react-icons/fa';
import { MessageCircle, CheckCircle, XCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
const OffersShipping = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [shipmentDate, setShipmentDate] = useState('');
  const [shipmentCost, setShipmentCost] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setShipmentDate('');
    setShipmentCost('');
    setShowConfirm(false);
  };

  const handleAddClick = () => {
    setShowConfirm(true);
  };

  const confirmAdd = () => {
    alert(`Added offer on ${shipmentDate} with cost $${shipmentCost}`);
    closeModal();
  };

  const shipments = [
    {
      title: "Shipment from source to destination",
      name: "startUp Name"
    },
    {
      title: "Shipment to Cairo from Giza",
      name: "Cargo Express"
    },
    {
      title: "International delivery",
      name: "FastTrack"
    },
    {
      title: "New shipment offer",
      name: "GoShip"
    },
    {
      title: "Deliver from Alexandria",
      name: "Maritime Line"
    },
    {
      title: "Package from Luxor to Aswan",
      name: "Nile Logistics"
    }
  ];

  const filteredShipments = shipments.filter(shipment =>
    shipment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-12">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 flex-wrap">
        <svg
          width="34"
          height="34"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M14.0435 6.402L13.2935 5.94225C12.5413 5.481 12.1655 5.25 11.75 5.25C11.3345 5.25 10.9588 5.481 10.2065 5.94225L9.4565 6.402C8.74475 6.8385 8.38925 7.05675 8.195 7.4085C8 7.761 8 8.18475 8 9.033V13.4318C8 14.8785 8 15.6015 8.4395 16.0507C8.879 16.5 9.5855 16.5 11 16.5H12.5C13.9145 16.5 14.621 16.5 15.0605 16.05C15.5 15.6015 15.5 14.8785 15.5 13.4325V9.033C15.5 8.18475 15.5 7.76025 15.305 7.4085C15.11 7.05675 14.7553 6.8385 14.0435 6.402Z"
            stroke="#204C80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.0001 5.33098C10.5209 4.87123 10.2351 4.62973 9.87286 4.53898C9.45286 4.43323 9.01186 4.55173 8.12911 4.78873L7.25011 5.02423C6.41536 5.24923 5.99761 5.36023 5.70811 5.63698C5.41786 5.91448 5.30536 6.30748 5.08111 7.09423L3.91561 11.1727C3.53311 12.5137 3.34111 13.1842 3.66661 13.713C3.94561 14.1667 5.06311 14.7255 6.12586 15"
            stroke="#204C80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.3712 7.49999C12.002 7.07999 12.5623 6.40724 12.9103 5.57024C13.6288 3.84149 13.1705 2.06774 11.888 1.60949C10.6047 1.15049 8.98175 2.17949 8.26325 3.90824C8.1467 4.18692 8.0585 4.47663 8 4.77299"
            stroke="#204C80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-primaryBlue font-bold text-2xl">Offers</span>
      </h2>

      {/* Search Input */}
      <div className="relative flex-grow min-w-[250px] mb-6">
        <input
          type="text"
          placeholder="Search For Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-[#255C9C] rounded-full pl-10 pr-10 py-2 focus:outline-none"
        />
        <Search
          size={20}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primaryBlue pointer-events-none"
        />
        <XCircle
          onClick={() => setSearchTerm('')}
          size={20}
          strokeWidth={1}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
        />
      </div>

      {/* Shipment Cards */}
      <div className="space-y-4">
        {filteredShipments.map((item, index) => (
<div
  key={index}
  onClick={() => navigate('/dashboardShipping/shipping-details', {
    state: { shipment: item }
  })}
  className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition gap-3"
>


            <div className=''>
              <div className="font-normal text-[#10233E] text-[28px]">{item.title}</div>
              <div className="text-[16px] text-[#10233E99] ">{item.name}</div>
            </div>
           <button
  onClick={(e) => {
    e.stopPropagation(); // يمنع التنقل
    openModal();
  }}
  className="bg-[#255C9C] text-white font-bold text-[14px] sm:text-[16px] px-4 py-2 rounded-full hover:bg-[#10233E] w-full sm:w-auto"
>
  + Add Offer
</button>

          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold text-[#153052] mb-6 flex items-center gap-2">
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C11.182 22 10.4 21.67 8.837 21.01C4.946 19.366 3 18.543 3 17.16V7M12 22C12.818 22 13.6 21.67 15.163 21.01C19.054 19.366 21 18.543 21 17.16V7M12 22V11.355M6 12L8 13M17 4L7 9M8.326 9.691L5.405 8.278C3.802 7.502 3 7.114 3 6.5C3 5.886 3.802 5.498 5.405 4.722L8.325 3.309C10.13 2.436 11.03 2 12 2C12.97 2 13.871 2.436 15.674 3.309L18.595 4.722C20.198 5.498 21 5.886 21 6.5C21 7.114 20.198 7.502 18.595 8.278L15.675 9.691C13.87 10.564 12.97 11 12 11C11.03 11 10.129 10.564 8.326 9.691Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


        <span className="text-primaryBlue font-bold text-2xl"> Shipment Details</span>
            </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  {/* Preferred Delivery Date */}
  <div>
    <label className="block text-sm font-medium text-[#153052] mb-1">
      Preferred Delivery Date *
    </label>
<>
  <style>
    {`
      input[type="date"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: none;
        cursor: pointer;
      }
      input[type="date"]::-webkit-calendar-picker-indicator {
        display: none !important;
        -webkit-appearance: none !important;
      }
      input[type="date"]::-moz-calendar-picker-indicator {
        display: none !important;
        -moz-appearance: none !important;
      }
    `}
  </style>

  <div className="relative w-full">
    <input
      type="date"
      id="real-date"
      value={shipmentDate}
      onChange={(e) => setShipmentDate(e.target.value)}
      className="w-full border border-[#255C9C] text-[#153052] bg-white rounded-full py-2 pr-10 pl-10 text-sm outline-none cursor-pointer"
      style={{
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        backgroundColor: 'white',
        backgroundImage: 'none',
        position: 'relative',
        zIndex: 10,
      }}
    />
    <div
      onClick={() => document.getElementById('real-date')?.showPicker()}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#204C80"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  </div>
</>





  </div>

  {/* Budget Range */}
  <div>
    <label className="block text-sm  font-medium text-[#153052] mb-1">
      Budget Range *
    </label>
    <div className="flex  border border-[#255C9C] items-center  rounded-full px-4 py-2">
   <svg className='me-1' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.943 17.335C20.3949 14.0635 18.8285 11.0484 16.467 8.719C15.95 8.216 15.692 7.965 15.121 7.733C14.55 7.5 14.059 7.5 13.078 7.5H10.922C9.94098 7.5 9.44998 7.5 8.87898 7.733C8.30898 7.965 8.04898 8.216 7.53298 8.719C5.17144 11.0484 3.60508 14.0635 3.05698 17.335C2.56998 20.273 5.27998 22.5 8.30798 22.5H15.692C18.721 22.5 21.432 20.273 20.942 17.335" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.6272 13.419C13.4112 12.62 12.3102 11.9 10.9892 12.439C9.66818 12.978 9.45918 14.711 11.4562 14.896C12.3602 14.979 12.9482 14.799 13.4872 15.308C14.0272 15.816 14.1272 17.231 12.7482 17.612C11.3712 17.993 10.0062 17.398 9.85818 16.552M11.8422 11.492V12.253M11.8422 17.729V18.493M7.25718 4.943C7.05018 4.643 6.75118 4.235 7.36918 4.143C8.00418 4.047 8.66318 4.481 9.30918 4.473C9.89218 4.464 10.1892 4.205 10.5092 3.835C10.8452 3.446 11.3652 2.5 12.0002 2.5C12.6352 2.5 13.1552 3.446 13.4912 3.835C13.8112 4.205 14.1082 4.465 14.6912 4.472C15.3372 4.482 15.9962 4.047 16.6312 4.142C17.2492 4.235 16.9502 4.642 16.7432 4.942L15.8112 6.301C15.4112 6.881 15.2122 7.171 14.7942 7.336C14.3762 7.501 13.8372 7.5 12.7582 7.5H11.2422C10.1622 7.5 9.62318 7.5 9.20618 7.336C8.78918 7.172 8.58918 6.88 8.18918 6.3L7.25718 4.943Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      <input
        type="text"
        placeholder="Enter cost..."
        value={shipmentCost}
        onChange={(e) => setShipmentCost(e.target.value)}
        className="w-full outline-none bg-transparent text-sm"
      />
    </div>
  </div>
</div>


        {showConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
      <div className="space-y-4">
        <p className="text-center text-[#10233E] font-medium">
          Offer Added Successfully
        </p>
   <div className="flex gap-6 justify-center">
  <button
    onClick={confirmAdd}
    className="bg-primaryBlue flex items-center gap-2 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300 font-semibold text-base"
    style={{ minWidth: '110px' }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22.75 12.5C22.75 6.977 18.273 2.5 12.75 2.5C7.227 2.5 2.75 6.977 2.75 12.5C2.75 18.023 7.227 22.5 12.75 22.5C18.273 22.5 22.75 18.023 22.75 12.5Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 13.25C8.75 13.25 10.35 14.162 11.15 15.5C11.15 15.5 13.55 10.25 16.75 8.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Ok
  </button>

  <button
    onClick={closeModal}
    className="bg-gray-300 border border-primaryBlue text-[#10233E] px-8 py-3 rounded-full hover:bg-gray-400 transition-colors duration-300 font-semibold text-base flex items-center gap-2"
    style={{ minWidth: '110px' }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M16.5 15.5L10.5 9.5M10.5 15.5L16.5 9.5M23.5 12.5C23.5 6.977 19.023 2.5 13.5 2.5C7.977 2.5 3.5 6.977 3.5 12.5C3.5 18.023 7.977 22.5 13.5 22.5C19.023 22.5 23.5 18.023 23.5 12.5Z"
        stroke="#204C80"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Cancel
  </button>
</div>

      </div>
    </div>
  </div>
)}

{!showConfirm && (
  <button
    className="bg-[#255C9C] w-full text-white py-2 rounded-full hover:bg-[#10233E]"
    onClick={handleAddClick}
  >
    Add
  </button>
)}

          </div>
        </div>
      )}
    </div>
  );
};

export default OffersShipping;

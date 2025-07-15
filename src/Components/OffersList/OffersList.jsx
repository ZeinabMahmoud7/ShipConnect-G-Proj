import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, CheckCircle, XCircle, Search } from 'lucide-react';
import PaymentModal from '../PaymentModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function OffersList({ offers, approvedChats, onApprove, onConnect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const filterRef = useRef(null);
const [payModalOfferId, setPayModalOfferId] = useState(null);
const [approvedLocal, setApprovedLocal] = useState(() => new Set(approvedChats));
const navigate = useNavigate();

 const filteredOffers = offers.map((shipment) => ({
  ...shipment,
  offers: shipment.offers.filter((offer) => {
    const matchesId = offer.offerId.toString().toLowerCase().includes(searchTerm.toLowerCase());
    let matchesPrice = true;
    if (priceFilter === 'gt100') matchesPrice = offer.price > 100;
    else if (priceFilter === 'lt100') matchesPrice = offer.price < 100;
    else if (priceFilter === 'eq100') matchesPrice = offer.price === 100;
    return matchesId && matchesPrice;
  }),
}));



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
const handleConfirmPayment = (id) => {
  alert(`Payment done for ${id}`);
  setPayModalOfferId(null);
navigate(`/dashboard/offers/chat/${id}`);


};

  return (
    <div className="relative px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
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

      <div className="mb-4 relative flex flex-wrap items-center gap-3">
        <div className="relative flex-grow min-w-[250px]">
          <input
            type="text"
            placeholder="Search For ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-primaryBlue rounded-full pl-10 pr-10 py-2 focus:outline-none"
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

        <div className="relative flex-shrink-0">
          <svg
            onClick={() => setFilterOpen(!filterOpen)}
            width="70"
            height="55"
            viewBox="0 0 70 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path d="M20 0.5H50C60.7696 0.5 69.5 9.23045 69.5 20V35C69.5 45.7696 60.7696 54.5 50 54.5H20C9.23045 54.5 0.5 45.7696 0.5 35V20C0.5 9.23045 9.23045 0.5 20 0.5Z" stroke="#204C80" />
            <path
              d="M26 22.5H29M29 22.5C29 21.568 29 21.102 29.152 20.735C29.2525 20.4922 29.3999 20.2716 29.5857 20.0857C29.7716 19.8999 29.9922 19.7525 30.235 19.652C30.602 19.5 31.068 19.5 32 19.5C32.932 19.5 33.398 19.5 33.765 19.652C34.0078 19.7525 34.2284 19.8999 34.4143 20.0857C34.6001 20.2716 34.7475 20.4922 34.848 20.735C35 21.102 35 21.568 35 22.5C35 23.432 35 23.898 34.848 24.265C34.7475 24.5078 34.6001 24.7284 34.4143 24.9143C34.2284 25.1001 34.0078 25.2475 33.765 25.348C33.398 25.5 32.932 25.5 32 25.5C31.068 25.5 30.602 25.5 30.235 25.348C29.9922 25.2475 29.7716 25.1001 29.5857 24.9143C29.3999 24.7284 29.2525 24.5078 29.152 24.265C29 23.898 29 23.432 29 22.5ZM26 32.5H32M41 32.5H44M41 32.5C41 31.568 41 31.102 40.848 30.735C40.7475 30.4922 40.6001 30.2716 40.4143 30.0857C40.2284 29.8999 40.0078 29.7525 39.765 29.652C39.398 29.5 38.932 29.5 38 29.5C37.068 29.5 36.602 29.5 36.235 29.652C35.9922 29.7525 35.7716 29.8999 35.5857 30.0857C35.3999 30.2716 35.2525 30.4922 35.152 30.735C35 31.102 35 31.568 35 32.5C35 33.432 35 33.898 35.152 34.265C35.2525 34.5078 35.3999 34.7284 35.5857 34.9143C35.7716 35.1001 35.9922 35.2475 36.235 35.348C36.602 35.5 37.068 35.5 38 35.5C38.932 35.5 39.398 35.5 39.765 35.348C40.0078 35.2475 40.2284 35.1001 40.4143 34.9143C40.6001 34.7284 40.7475 34.5078 40.848 34.265C41 33.898 41 33.432 41 32.5ZM38 22.5H44"
              stroke="#204C80"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div
            ref={filterRef}
            className={`absolute top-12 right-0 w-56 bg-white rounded-lg shadow-lg p-4 z-50 transition-transform duration-300 ease-in-out ${
              filterOpen ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0 pointer-events-none'
            }`}
          >
            <div
              onClick={() => {
                setPriceFilter('gt100');
                setFilterOpen(false);
              }}
              className={`px-3 py-2 mb-2 rounded-md cursor-pointer transition text-primaryBlue ${
                priceFilter === 'gt100' ? 'bg-borderGray font-semibold' : 'hover:bg-borderGray'
              }`}
            >
              Greater than $100
            </div>
            <div
              onClick={() => {
                setPriceFilter('lt100');
                setFilterOpen(false);
              }}
              className={`px-3 py-2 mb-2 rounded-md cursor-pointer transition text-primaryBlue ${
                priceFilter === 'lt100' ? 'bg-borderGray font-semibold' : 'hover:bg-borderGray'
              }`}
            >
              Less than $100
            </div>
            <div
              onClick={() => {
                setPriceFilter('eq100');
                setFilterOpen(false);
              }}
              className={`px-3 py-2 rounded-md cursor-pointer transition text-primaryBlue ${
                priceFilter === 'eq100' ? 'bg-borderGray font-semibold' : 'hover:bg-borderGray'
              }`}
            >
              Equal to $100
            </div>
          </div>
        </div>
      </div>

 {offers.length > 0 ? (
  filteredOffers.map((shipment) => (
    <div key={shipment.shipmentCode} className="mb-8">
      <h3 className="text-xl font-bold text-primaryBlue mb-4">
        Shipment Code: {shipment.shipmentCode}
      </h3>

      {shipment.offers.map((offer) => (
        <div key={offer.offerId} className="mb-6">
          {/* نفس تصميم العرض اللي كنتي عاملاه */}
          <div className="bg-white rounded-xl border border-borderGray px-4 py-5 mb-4">
            <div className="flex flex-col  md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
              <div className="flex flex-col items-start gap-1 max-w-full md:max-w-[70%]">
                <h3 className="text-2xl font-bold text-primaryBlack flex items-center gap-2 flex-wrap">
                  {shipment.shipmentCode}{' '}
                  <span className="text-primaryBlack font-normal text-lg gap-1 flex items-center">
                   ⭐ ({offer.companyRating?.toFixed(1)})

                  </span>
                </h3>
                <p className="text-gray mt-1 text-sm font-normal break-words w-full">
                  Estimated delivery Date: <span className="font-semibold text-lg text-primaryBlack">{offer.estimatedDeliveryDays} days</span>
                </p>
                <p className="text-gray text-sm font-normal break-words w-full text-start">
                  Cost: <span className="font-semibold text-lg text-primaryBlack">${offer.price}</span>
                </p>
                <p className="text-gray text-sm font-normal break-words w-full text-start">
                  Notes: <span className="text-primaryBlue">{offer.notes}</span>
                </p>
              </div>

   <div className="flex gap-4 mt-4">
  {!approvedLocal.has(offer.offerId) && (
    <>
      <button
      onClick={async () => {
    try {
      const token = localStorage.getItem('token'); // أو حسب مكان التخزين
      await axios.put(`/api/Offer/acceptOffer/${offer.offerId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApprovedLocal((prev) => new Set(prev).add(offer.offerId));
      onApprove?.(offer.offerId);
      toast.success(`✅ Offer ${offer.offerId} approved successfully!`);
    } catch (error) {
      console.error("❌ Error approving offer:", error);
      toast.error("Failed to approve offer. Please try again.");
    }
  }}
        className="flex items-center border border-[#177D3F] gap-x-2 text-[#177D3F] rounded-[20px] px-4 py-2 hover:bg-[#177D3F]/20
 transition"
      >
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12Z" stroke="#177D3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12.75C8 12.75 9.6 13.662 10.4 15C10.4 15 12.8 9.75 16 8" stroke="#177D3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 Approve
      </button>

      <button
        onClick={() => {
          // ممكن تحطي لوجيك الريجيكت هنا
          alert('Offer rejected');
        }}
        className="flex items-center border border-[#CE1C17] gap-x-2 text-[#CE1C17] rounded-[20px]   px-4 py-2 hover:bg-red-50 transition"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.75 15L9.75 9M9.75 15L15.75 9M22.75 12C22.75 6.477 18.273 2 12.75 2C7.227 2 2.75 6.477 2.75 12C2.75 17.523 7.227 22 12.75 22C18.273 22 22.75 17.523 22.75 12Z" stroke="#CE1C17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        Reject
      </button>
    </>
  )}

  {approvedLocal.has(offer.offerId) && (
    <button
      onClick={() => setPayModalOfferId(offer.offerId)}
      className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition"
    >
      Pay
    </button>
  )}
</div>

            </div>
          </div>
        </div>
      ))}
    </div>
  ))
) : (
  <p className="text-gray-500">No offers available.</p>
)}

{payModalOfferId && (
  <PaymentModal
    offerId={payModalOfferId}
    onClose={() => setPayModalOfferId(null)}
    onConfirm={handleConfirmPayment}
  />
)}



    </div>
  );
}

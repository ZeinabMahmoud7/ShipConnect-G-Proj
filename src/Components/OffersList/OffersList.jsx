import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, CheckCircle, XCircle, Search } from 'lucide-react';
import PaymentModal from '../PaymentModal';
import { useNavigate } from 'react-router-dom';

export default function OffersList({ offers, approvedChats, onApprove, onConnect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const filterRef = useRef(null);
const [payModalOfferId, setPayModalOfferId] = useState(null);
const [approvedLocal, setApprovedLocal] = useState(() => new Set(approvedChats));
const navigate = useNavigate();

  const filteredOffers = offers.filter((offer) => {
    const matchesId = offer.id.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesPrice = true;
    if (priceFilter === 'gt100') matchesPrice = offer.cost > 100;
    else if (priceFilter === 'lt100') matchesPrice = offer.cost < 100;
    else if (priceFilter === 'eq100') matchesPrice = offer.cost === 100;
    return matchesId && matchesPrice;
  });

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

      {filteredOffers.length > 0 ? (
        filteredOffers.map((offer) => (
          <div key={offer.id} className="mb-6">
            <p className="text-sm flex mb-3 text-primaryBlue font-medium flex-wrap items-center gap-1">
              <svg
                width="22"
                className="mt-1 flex-shrink-0"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 20.1667C10.2502 20.1667 9.53333 19.8642 8.10058 19.2592C4.53383 17.7522 2.75 16.9978 2.75 15.73V6.41671M11 20.1667C11.7498 20.1667 12.4667 19.8642 13.8994 19.2592C17.4662 17.7522 19.25 16.9978 19.25 15.73V6.41671M11 20.1667V10.4088M5.5 11L7.33333 11.9167M15.5833 3.66671L6.41667 8.25004M7.63217 8.88346L4.95458 7.58821C3.48517 6.87687 2.75 6.52121 2.75 5.95837C2.75 5.39554 3.48517 5.03987 4.95458 4.32854L7.63125 3.03329C9.28583 2.23304 10.1108 1.83337 11 1.83337C11.8892 1.83337 12.7151 2.23304 14.3678 3.03329L17.0454 4.32854C18.5148 5.03987 19.25 5.39554 19.25 5.95837C19.25 6.52121 18.5148 6.87687 17.0454 7.58821L14.3688 8.88346C12.7142 9.68371 11.8892 10.0834 11 10.0834C10.1108 10.0834 9.28492 9.68371 7.63217 8.88346Z"
                  stroke="#1A3D65"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ms-1 text-lg font-semibold">
                Shipment ID: <span className="text-gray">{offer.id}</span>
              </span>
            </p>
            <div className="bg-white rounded-xl border border-borderGray px-4 py-5 mb-4">
              <div className="flex flex-col  md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                <div className="flex flex-col items-start gap-1 max-w-full md:max-w-[70%]">
                  <h3 className="text-2xl font-bold text-primaryBlack flex items-center gap-2 flex-wrap">
                    {offer.company}{' '}
                    <span className="text-primaryBlack font-normal text-lg gap-1 flex items-center">
                      <svg
                        width="24"
                        className="mt-[0.5]"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7282 3.44399L15.4882 6.99299C15.7282 7.48699 16.3682 7.96099 16.9082 8.05099L20.0972 8.58599C22.1372 8.92899 22.6172 10.421 21.1472 11.893L18.6672 14.393C18.2472 14.816 18.0172 15.633 18.1472 16.218L18.8572 19.313C19.4172 21.763 18.1272 22.71 15.9772 21.43L12.9872 19.645C12.4472 19.323 11.5572 19.323 11.0072 19.645L8.01919 21.43C5.87919 22.71 4.57919 21.752 5.13919 19.313L5.84919 16.218C5.97919 15.633 5.74919 14.816 5.32919 14.393L2.84919 11.893C1.39019 10.42 1.86019 8.92899 3.89919 8.58599L7.08919 8.05099C7.61919 7.96099 8.25919 7.48699 8.49919 6.99299L10.2592 3.44399C11.2192 1.51899 12.7792 1.51899 13.7292 3.44399"
                          fill="#F7CF37"
                        />
                      </svg>
                      ({offer.rating})
                    </span>
                  </h3>
                  <p className="text-gray mt-1 text-sm font-normal break-words w-full">
                    Estimated delivery Date:{' '}
                    <span className="font-semibold text-lg text-primaryBlack">{offer.date}</span>
                  </p>
                  <p className="text-gray text-sm font-normal break-words w-full text-start">
                    Cost:{' '}
                    <span className="font-semibold text-lg text-primaryBlack">${offer.cost}</span>
                  </p>
                </div>

{approvedLocal.has(offer.id) ? (
  <button
    onClick={() => setPayModalOfferId(offer.id)}
    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full flex items-center gap-1 w-full md:w-auto justify-center"
  >
    Pay
  </button>
) : (
  <div className="flex gap-2 w-full md:w-auto flex-wrap md:flex-nowrap justify-center md:justify-start">
 <button
  onClick={() => {
    // لا تستدعي onApprove لمنع التنقل:
    setApprovedLocal(prev => new Set(prev).add(offer.id));
    // لو حابة تستدعيها لاحقاً بعد معالجة التنقل، احذفي السطر التالي:
    // if (onApprove) onApprove(offer.id);
  }}
  className="border border-success text-success hover:bg-green-50 px-4 py-2 rounded-full flex items-center gap-1 flex-grow md:flex-grow-0 justify-center"
>
  <CheckCircle size={18} /> Approve
</button>

    <button
      onClick={() => alert('Rejected!')}
      className="border border-error text-error hover:bg-red-50 px-4 py-2 rounded-full flex items-center gap-1 flex-grow md:flex-grow-0 justify-center"
    >
      <XCircle size={18} /> Reject
    </button>
  </div>
)}


              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No offers match your search.</p>
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

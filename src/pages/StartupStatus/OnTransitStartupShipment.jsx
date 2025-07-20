import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuHourglass } from 'react-icons/lu';
import { FaChevronLeft } from 'react-icons/fa6';
import { PiPackageLight } from 'react-icons/pi'; // For the package icon
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

export default function OnTransitStartupShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const response = await axios.get(`/api/Shipment/startUp/Id/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setShipment(response.data.data);
      } catch (error) {
        console.error('❌ Error fetching shipment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token && id) { // Ensure user token and ID exist before fetching
      fetchShipment();
    }
  }, [id, user]);

  if (loading) return <div className="p-8 text-center text-primaryBlue">Loading shipment details...</div>;
  if (!shipment) return <div className="p-8 text-center text-red-600 font-bold">Shipment not found.</div>;

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // Format as YYYY-MM-DD
    return date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  // Helper function to get status badge styling
  const getStatusBadge = (status) => {
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-700';
    let icon = <LuHourglass className="text-lg" />;

    switch (status) {
      case 'Delivered':
        bgColor = 'bg-green-100';
        textColor = 'text-green-600';
        // You might want a checkmark icon here
        break;
      case 'In Transit':
        bgColor = 'bg-[#FFE1CC]'; // Matches image
        textColor = 'text-[#E98025]'; // Matches image
        icon = <LuHourglass className="text-lg" />;
        break;
      case 'Pending':
      case 'Preparing': // Assuming 'Preparing' also uses pending style
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-600';
        // You might want an info icon here
        break;
      default:
        break;
    }
    return (
      <span className={`shrink-0 ${bgColor} ${textColor} px-4 py-1.5 text-sm rounded-md flex items-center gap-2`}>
        {icon} {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#E4E6EC] px-4 py-6 flex justify-center font-inter">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          {/* Header */}
          <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
            <FaChevronLeft
              className="cursor-pointer"
              onClick={() => navigate('/dashboard/shipments')}
            />
            <span>Transit Shipment</span>
            <span className="text-[#10233E99] font-normal">#{shipment.id}</span>
          </div>

        </div>

        {/* Main Card - General styling */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6 ">
          <div className="flex justify-end">{getStatusBadge(shipment.status)}</div>
          {/* Sender Data Section */}
          <div className="pb-4 pl-8">
            <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
              Sender Data (Startup)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
              <div>
                <p className="text-[#10233E99] mb-1">Phone Number</p>
                <p className="font-bold">{shipment.senderPhone ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Address</p>
                <p className="font-bold">{shipment.senderAddress ?? 'N/A'}</p> {/* Assuming senderAddress for sender's destination */}
              </div>
            </div>
          </div>

          {/* Receiver Data Section */}
          <div className="pb-4 pl-8">
            <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="9" r="3" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Receiver Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
              <div>
                <p className="text-[#10233E99] mb-1">Destination Name</p>
                <p className="font-bold">{shipment.receiverName ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Address</p>
                <p className="font-bold">{shipment.destinationAddress ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Email</p>
                <p className="font-bold">{shipment.receiverEmail ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Receiver Phone</p>
                <p className="font-bold">{shipment.receiverPhone ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Shipment Data Section */}
          <div className='pl-8'>
            <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
              <PiPackageLight className='text-xl' style={{ color: '#1A3D65' }} />
              Shipment Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
              <div>
                <p className="text-[#10233E99] mb-1">Shipment Type</p>
                <p className="font-bold">{shipment.shipmentType ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Weight</p>
                <p className="font-bold">{shipment.weightKg ?? 0} kg</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Dimensions (L×W×H)</p>
                <p className="font-bold">{shipment.dimensions ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Code</p>
                <p className="font-bold">{shipment.code ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Send Date</p>
                <p className="font-bold">{formatDate(shipment.sentDate)}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Quantity</p>
                <p className="font-bold">{shipment.quantity ?? 0} boxes</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Budget Range</p>
                <p className="font-bold">${shipment.price ?? 0}</p> {/* Assuming price is the budget */}
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Preferred Delivery Date</p>
                <p className="font-bold">{formatDate(shipment.requestedPickupDate)}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Offer Count</p>
                <p className="font-bold">{shipment.offersCount ?? 0}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Packaging Options</p>
                <p className="font-bold">{shipment.packagingOptions ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Scope</p>
                <p className="font-bold">{shipment.shippingScope ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Transport Type</p>
                <p className="font-bold">{shipment.transportType ?? 'N/A'}</p>
              </div>
              <div className="md:col-span-2"> {/* Description spans two columns */}
                <p className="text-[#10233E99] mb-1">Description</p>
                <p className="font-bold">{shipment.description ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Track Button */}
          <div className="pt-2 flex pl-8">
            <button
              onClick={() => navigate(`/dashboard/track/${shipment.id}`)}
              className="flex items-center gap-x-1 bg-[#F26C1D] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition"
            >
              <svg width="25" height="25" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 15.5H8.5M18.5 15.5V18.5C18.5 20.386 18.5 21.328 18.031 21.914C17.584 22.474 16.876 22.499 15.5 22.5M18.508 6.5H18.498M8.5 22.5H6.5C4.614 22.5 3.672 22.5 3.086 21.914C2.5 21.328 2.5 20.386 2.5 18.5V16.5C2.5 14.614 2.5 13.672 3.086 13.086C3.672 12.5 4.614 12.5 6.5 12.5H8.5C10.386 12.5 11.328 12.5 11.914 13.086C12.5 13.672 12.5 14.614 12.5 16.5V18.5C12.5 20.386 12.5 21.328 11.914 21.914C11.328 22.5 10.386 22.5 8.5 22.5ZM18.5 2.5C16.29 2.5 14.5 4.309 14.5 6.54C14.5 7.816 15 8.808 16 9.694C16.705 10.319 17.559 11.357 18.071 12.197C18.317 12.601 18.665 12.601 18.929 12.197C19.467 11.373 20.295 10.319 21 9.695C22 8.808 22.5 7.816 22.5 6.54C22.5 4.31 20.71 2.5 18.5 2.5Z" />
              </svg>
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

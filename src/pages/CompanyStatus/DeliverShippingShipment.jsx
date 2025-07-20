import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuHourglass } from 'react-icons/lu';
import { FaChevronLeft } from 'react-icons/fa6';
import { PiPackageLight } from 'react-icons/pi';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import avatarImg from '../../assets/Avatar.png';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'; // For Delivered status icon
import { FaRegCommentDots, FaPaperPlane } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs'; // For star icons

export default function DeliverShippingShipment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingData, setRatingData] = useState(null);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const res = await axios.get(`/api/Shipment/ShippingCompany/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setShipmentData(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load shipment');
      } finally {
        setLoading(false);
      }
    };

    const fetchRating = async () => {
      try {
        const res = await axios.get(`/api/Rating/ShipmentRate/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setRatingData(res.data.data);
      } catch (err) {
        setRatingData(null);
      }
    };

    fetchShipment();
    fetchRating();
  }, [id, user]);

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
    let icon = <LuHourglass className="text-lg" />; // Default icon

    switch (status) {
      case 'Delivered':
        bgColor = 'bg-[#B1F7CB]'; // Matches image
        textColor = 'text-[#1CA651]'; // Matches image
        icon = <IoIosCheckmarkCircleOutline className="text-lg" />;
        break;
      case 'In Transit':
        bgColor = 'bg-[#FFE1CC]';
        textColor = 'text-[#E98025]';
        icon = <LuHourglass className="text-lg" />;
        break;
      case 'Pending':
      case 'Preparing':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-600';
        icon = <LuHourglass className="text-lg" />; // Using hourglass for pending/preparing too
        break;
      default:
        // Default to a generic icon if status is unknown
        icon = <PiPackageLight className='text-lg' />;
        break;
    }
    return (
      <span className={`shrink-0 ${bgColor} ${textColor} px-4 py-1.5 text-sm rounded-md flex items-center gap-2`}>
        {icon} {status}
      </span>
    );
  };

  if (loading) return <div className="p-8 text-center text-primaryBlue">Loading shipment details...</div>;
  if (error) return <div className="p-8 text-center text-red-600 font-bold">{error}</div>;
  if (!shipmentData) return <div className="p-8 text-center text-red-600 font-bold">Shipment data not available.</div>;

  return (
    <div className="min-h-screen bg-[#E4E6EC] px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">

        {/* Header */}
        <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
          <FaChevronLeft
            className="cursor-pointer"
            onClick={() => navigate('/dashboardShipping/shipmentsShipping')}
          />
          <span>Transit ID</span>
          <span className="text-[#10233E99] font-normal">#{shipmentData.id}</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6">
          <div className="flex justify-end">
            {getStatusBadge(shipmentData.status)}
          </div>
          {/* Sender Data Section */}
          <div className="pb-4 pl-4">
            <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="9" r="3" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sender Data (Startup)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
              <div>
                <p className="text-[#10233E99] mb-1">Phone Number</p>
                <p className="font-bold">{shipmentData.senderPhone ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Address</p>
                <p className="font-bold">{shipmentData.senderAddress ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Receiver Data Section */}
          <div className="pb-4 pl-4">
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
                <p className="font-bold">{shipmentData.receiverName ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Address</p>
                <p className="font-bold">{shipmentData.destinationAddress ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Email</p>
                <p className="font-bold">{shipmentData.receiverEmail ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Receiver Phone</p>
                <p className="font-bold">{shipmentData.receiverPhone ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Shipment Data Section */}
          <div className='pl-4'>
            <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
              <PiPackageLight className='text-xl' style={{ color: '#1A3D65' }} />
              Shipment Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
              <div>
                <p className="text-[#10233E99] mb-1">Shipment Type</p>
                <p className="font-bold">{shipmentData.shipmentType ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Weight</p>
                <p className="font-bold">{shipmentData.weightKg ?? 0} kg</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Dimensions (L×W×H)</p>
                <p className="font-bold">{shipmentData.dimensions ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Code</p>
                <p className="font-bold">{shipmentData.code ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Send Date</p>
                <p className="font-bold">{formatDate(shipmentData.sentDate)}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Quantity</p>
                <p className="font-bold">{shipmentData.quantity ?? 0} boxes</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Budget Range</p>
                <p className="font-bold">${shipmentData.price ?? 0}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Preferred Delivery Date</p>
                <p className="font-bold">{formatDate(shipmentData.requestedPickupDate)}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Offer Count</p>
                <p className="font-bold">{shipmentData.offersCount ?? 0}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Packaging Options</p>
                <p className="font-bold">{shipmentData.packagingOptions ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Scope</p>
                <p className="font-bold">{shipmentData.shippingScope ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Transport Type</p>
                <p className="font-bold">{shipmentData.transportType ?? 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[#10233E99] mb-1">Description</p>
                <p className="font-bold">{shipmentData.description ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Actual Delivery Date</p>
                <p className="font-bold">
                  {formatDate(shipmentData.actualDelivery)}
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="space-y-3 pl-4">
            <div className="flex items-center text-[#1A3D65] font-semibold gap-2">
              <FaRegCommentDots className="text-lg" />
              <span>StartUp Feedback</span>
            </div>

            <div className="bg-[#F7F7F7] rounded-xl p-4 space-y-3 text-sm">
              {ratingData ? (
                <>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <BsStarFill key={i} className={i < ratingData.score ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>

                  <p className="text-[#10233E] text-sm leading-relaxed">
                    {ratingData.comment || 'No comment provided.'}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={
                        ratingData.imageUrl
                          ? (ratingData.imageUrl.startsWith('http') ? ratingData.imageUrl : `${import.meta.env.VITE_API_URL}${ratingData.imageUrl}`)
                          : avatarImg
                      }
                      alt={ratingData.startUpName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[#10233E] font-bold">{ratingData.startUpName}</p>
                      <p className="text-[#10233E99] text-xs">{ratingData.shipmentCode}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 italic">No rating submitted for this shipment.</p>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

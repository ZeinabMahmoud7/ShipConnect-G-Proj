import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Details.module.css';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa6';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import avatarImg from '../../assets/Avatar.png';

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


  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!shipmentData) return <div className="p-6 text-center text-red-600">Shipment not found.</div>;

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
          {/* Info Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm w-full text-[#10233E]">
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Company Name</p>
                <p className="font-bold">{shipmentData.companyName ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Cost</p>
                <p className="font-bold">${shipmentData.price ?? 0}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Tracking Number</p>
                <p className="font-bold">{shipmentData.code ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Date</p>
                <p className="font-bold">{shipmentData.sentDate
                  ? new Date(shipmentData.sentDate).toLocaleDateString()
                  : 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Address</p>
                <p className="font-bold">{shipmentData.destinationAddress ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Delivery Date</p>
                <p className="font-bold">Delivered: {shipmentData.deliveryDate
                  ? new Date(shipmentData.deliveryDate).toLocaleDateString()
                  : 'N/A'}</p>
              </div>
            </div>

            {/* Badge */}
            <span className="shrink-0 bg-[#B1F7CB] text-[#1CA651] px-4 py-1.5 text-sm rounded-md flex items-center gap-2">
              <IoIosCheckmarkCircleOutline className="text-lg" /> Delivered
            </span>
          </div>

          {/* Feedback Section */} 
          <div className="space-y-3">
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

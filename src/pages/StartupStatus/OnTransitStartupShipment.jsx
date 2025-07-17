import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuHourglass } from 'react-icons/lu';
import { FaChevronLeft } from 'react-icons/fa6';
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

    fetchShipment();
  }, [id, user]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!shipment) return <div className="p-8 text-center text-red-600 font-bold">Shipment not found.</div>;

  return (
    <div className="min-h-screen bg-[#E4E6EC] px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
          <FaChevronLeft
            className="cursor-pointer"
            onClick={() => navigate('/dashboard/shipments')}
          />
          <span>Transit Shipment</span>
          <span className="text-[#10233E99] font-normal">#{shipment.id}</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm w-full text-[#10233E]">
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Company Name</p>
                <p className="font-bold">{shipment.companyName ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Cost</p>
                <p className="font-bold">{shipment.price ?? 0} EGP</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Tracking Number</p>
                <p className="font-bold">{shipment.code ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Date</p>
                <p className="font-bold">
                  {shipment.sentDate
                    ? new Date(shipment.sentDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Address</p>
                <p className="font-bold">{shipment.destinationAddress ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Estimated Delivery Date</p>
                <p className="font-bold">
                  {shipment.requestedPickupDate
                    ? new Date(shipment.requestedPickupDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <span className="shrink-0 bg-[#FFE1CC] text-[#E98025] px-4 py-1.5 text-sm rounded-md flex items-center gap-2">
              <LuHourglass className="text-lg" /> In Transit
            </span>
          </div>

          {/* Track Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate(`/dashboardShipping/track/${shipment.id}`)}  // <- company + startup Tracking shipment
              className="flex items-center gap-x-1 bg-[#F26C1D] text-white px-6 py-2 rounded-full text-sm font-medium"
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

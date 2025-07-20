import { FaChevronLeft } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoCloseCircleOutline } from 'react-icons/io5'; // For Cancel button icon
import { PiPackageLight } from 'react-icons/pi'; // For Shipment Data icon

export default function PendingShippingShipment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [shipment, setShipment] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipment = async () => {
      console.log("📡 Fetching shipment with ID:", id);

      try {
        const response = await axios.get(`/api/Shipment/ShippingCompany/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        console.log("✅ Shipment fetched:", response.data);
        setShipment(response.data.data);
      } catch (error) {
        console.error('❌ Error fetching shipment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token && id) {
      fetchShipment();
    }
  }, [id, user]);


  const handleChangeStatus = async () => {
    console.log("🚀 Attempting to update shipment status to 'In Transit'...");

    try {
      // Step 1: Send status update request
      const res = await axios.get(`/api/Shipment/UpdateStatus/${shipment.id}?Status=2`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      console.log("✅ UpdateStatus response:", res.data);

      if (res.data.success) {
        // Step 2: Re-fetch the shipment to confirm status change
        console.log("🔄 Re-fetching shipment to verify status update...");
        const confirm = await axios.get(`/api/Shipment/ShippingCompany/${shipment.id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        console.log("📦 Fetched shipment after update:", confirm.data);
        const updatedShipment = confirm.data.data;

        // Step 3: Check status value
        console.log("📌 Status after update:", updatedShipment.status);

        if (updatedShipment.status === 'In Transit') {
          toast.success('Status updated successfully');
          navigate(`/dashboardShipping/shipmentsShipping/transit/${shipment.id}`);
        } else {
          toast.error('Status did not update properly');
          console.warn('⚠️ Backend returned unexpected status:', updatedShipment.status);
        }
      } else {
        toast.error('Failed to update status');
        console.warn('❌ UpdateStatus API returned failure:', res.data);
      }
    } catch (err) {
      console.error('❌ Error during status update flow:', err);
      toast.error('An error occurred while updating the status');
    }
  };


  // Helper function to format dates consistently
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  // Helper function to get status badge styling
  const getStatusBadge = (status) => {
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-700';
    let icon = <IoMdTime className="text-lg" />;

    switch (status) {
      case 'Delivered':
        bgColor = 'bg-[#B1F7CB]';
        textColor = 'text-[#1CA651]';
        icon = <IoCloseCircleOutline className="text-lg" />;
        break;
      case 'In Transit':
        bgColor = 'bg-[#FFE1CC]';
        textColor = 'text-[#E98025]';
        icon = <IoMdTime className="text-lg" />;
        break;
      case 'Pending':
      case 'Preparing':
        bgColor = 'bg-[#FFF5CC]';
        textColor = 'text-[#B38B00]';
        icon = <IoMdTime className="text-lg" />;
        break;
      default:
        icon = <PiPackageLight className='text-lg' />;
        break;
    }
    return (
      <span className={`shrink-0 ${bgColor} ${textColor} px-4 py-1.5 text-sm rounded-md flex items-center gap-2`}>
        {icon} {status}
      </span>
    );
  };
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!shipment) return <div className="p-8 text-center text-red-600 font-bold">Shipment not found.</div>;


  return (
    <div className="min-h-screen bg-[#F0F2F7] px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">

        {/* Header */}
        <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
          <FaChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
          <span>Transit ID</span>
          <span className="text-[#10233E99] font-normal">#{shipment.id}</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6">
          <div className="flex justify-end">
            {getStatusBadge(shipment.status)}
          </div>
          {/* Sender Data Section */}
          <div className="pl-4 pb-4">
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
                <p className="font-bold">{shipment.senderPhone ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Sender Address</p>
                <p className="font-bold">{shipment.senderAddress ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Receiver Data Section */}
          <div className="pl-4 pb-4">
            <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="9" r="3" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Receiver Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
              <div>
                <p className="text-[#10233E99] mb-1">Receiver Name</p>
                <p className="font-bold">{shipment.receiverName ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Address</p>
                <p className="font-bold">{shipment.destinationAddress ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Receiver Email</p>
                <p className="font-bold">{shipment.receiverEmail ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Receiver Phone</p>
                <p className="font-bold">{shipment.receiverPhone ?? 'N/A'}</p>
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
                <p className="text-[#10233E99] mb-1">Request Date</p>
                <p className="font-bold">{formatDate(shipment.requestDate)}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Quantity</p>
                <p className="font-bold">{shipment.quantity ?? 0} boxes</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Price</p>
                <p className="font-bold">{shipment.price ?? 0} EGP</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Preferred Pickup Date</p>
                <p className="font-bold">{formatDate(shipment.requestedPickupDate)}</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Offers Count</p>
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
              <div className="md:col-span-2">
                <p className="text-[#10233E99] mb-1">Description</p>
                <p className="font-bold">{shipment.description ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Button  */}
          <div className="pt-4 pl-4">
            <button
              onClick={handleChangeStatus}
              className="bg-[#F26C1D] text-white font-semibold px-5 py-2 rounded-full text-sm transition hover:opacity-90"
            >
              Change Status To In transit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdTime } from 'react-icons/io'; // For Pending status icon
import { FaChevronLeft } from 'react-icons/fa6';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoCloseCircleOutline } from 'react-icons/io5'; // For Cancel button icon
import { PiPackageLight } from 'react-icons/pi'; // For Shipment Data icon
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { ShipmentProvider } from '../../Context/ShipmentContext'; // Import ShipmentProvider
import EditShipmentForm from '../../Components/EditShipmentForm'; // Assuming this component exists
import toast from 'react-hot-toast';

export default function PendingStartupShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchShipment = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(`/api/Shipment/startUp/Id/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setShipment(response.data.data); // Update local state with fetched data
      } catch (error) {
        console.error('❌ Error fetching shipment:', error);
        setShipment(null); // Ensure shipment is null on error
      } finally {
        setLoading(false);
      }
    };

    if (user?.token && id) { // Ensure user token and ID exist before fetching
      fetchShipment();
    }
  }, [id, user]); // Depend on id and user to re-fetch if they change

  const handleDelete = async () => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <p className="text-lg font-semibold mb-3">Are you sure you want to cancel this shipment?</p>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await axios.delete(`/api/Shipment/startUp/delete/${id}`, {
                  headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                });
                toast.success('Shipment cancelled successfully');
                navigate('/dashboard/shipments'); // Navigate back after deletion
              } catch (error) {
                console.error('❌ Error cancelling shipment:', error);
                toast.error('Failed to cancel shipment');
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Yes, Cancel
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            No, Keep
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  // This function receives the updated shipment data from EditShipmentForm
  const handleUpdate = (updatedShipmentData) => {
    console.log("✅ PendingStartupShipment received updated data:", updatedShipmentData);
    setShipment(updatedShipmentData); // Update local state immediately to trigger re-render
    setEditModalOpen(false); // Close the modal
    // No need for a toast here, EditShipmentForm already shows one
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

  if (loading) return <div className="p-8 text-center text-primaryBlue">Loading shipment details...</div>;
  if (!shipment) return <div className="p-8 text-center text-red-600 font-bold">Shipment not found.</div>;

  return (
    <ShipmentProvider initialData={shipment}> {/* Wrap with ShipmentProvider, passing local shipment state */}
      <div className="min-h-screen bg-[#E4E6EC] px-4 py-6 flex justify-center font-inter">
        <div className="w-full max-w-4xl space-y-6">

          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
              <FaChevronLeft
                className="cursor-pointer text-xl"
                onClick={() => navigate('/dashboard/shipments')}
              />
              <span>Pending Shipment</span>
              <span className="text-[#10233E99] font-normal">#{shipment.id}</span>
            </div>
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
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="3" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="3" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

            {/* Action Buttons */}
            <div className="pl-4 pt-4 flex gap-4 justify-center sm:justify-start">
              <button
                onClick={() => setEditModalOpen(true)}
                className="flex items-center gap-2 bg-[#F9751C] text-white px-8 py-2 rounded-3xl hover:bg-orange-500 cursor-pointer transition"
              >
                <AiOutlineEdit size={20} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-[#CE1C17] text-white px-6 py-2 rounded-3xl hover:bg-red-900 cursor-pointer transition"
              >
                <IoCloseCircleOutline size={20} /> Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <EditShipmentForm
            shipment={shipment} // Pass the current shipment data as prop
            onUpdate={handleUpdate} // Pass the update handler as prop
            onClose={() => setEditModalOpen(false)}
          />
        )}
      </div>
    </ShipmentProvider>
  );
}

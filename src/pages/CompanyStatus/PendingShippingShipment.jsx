import { FaChevronLeft } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

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
        <div className="bg-white rounded-xl shadow px-6 py-6 space-y-6">

          {/* Top section with badge */}
          <div className="flex justify-end">
            <span className="flex items-center gap-2 text-[#B38B00] bg-[#FFF5CC] text-sm font-medium px-4 py-1.5 rounded-md">
              <IoMdTime /> Wait
            </span>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-sm text-[#3A3A3A]">
            <div>
              <p className="text-[#697A94] mb-1">Shipment Request ID</p>
              <p className="font-bold">{shipment.code}</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Request Date</p>
              <p className="font-bold">{new Date(shipment.requestDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Shipping Weight</p>
              <p className="font-bold">{shipment.weightKg} kg</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Type Of Goods</p>
              <p className="font-bold">{shipment.shipmentType}</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Shipping Dimensions</p>
              <p className="font-bold">{shipment.dimensions} cm</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Shipment Destination</p>
              <p className="font-bold">{shipment.destinationAddress}</p>
            </div>
          </div>

          {/* Button api = /api/Shipment/UpdateStatus/{ShipmentId} */}
          <div className="pt-4">
            <button
              onClick={handleChangeStatus}
              className="bg-[#F26C1D] text-white font-semibold px-5 py-2 rounded-full text-sm transition hover:opacity-90"
            >
              Change Status To In transit {/*in :\ */}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

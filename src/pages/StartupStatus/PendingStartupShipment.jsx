import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdTime } from 'react-icons/io';
import { FaChevronLeft } from 'react-icons/fa6';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { ShipmentProvider } from '../../Context/ShipmentContext';

import EditShipmentForm from '../../Components/EditShipmentForm';
import toast from 'react-hot-toast';

export default function PendingStartupShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const Info = ({ label, value }) => (
    <div>
      <p className="text-[#697A94] mb-1">{label}</p>
      <p className="font-bold break-words">{value ?? 'N/A'}</p>
    </div>
  );

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

  const handleDelete = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to cancel this shipment?');
      if (!confirm) return;

      await axios.delete(`/api/Shipment/startUp/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      toast.success('Shipment cancelled successfully');
      navigate('/dashboard/shipments'); // الرجوع للقائمة بعد الحذف
    } catch (error) {
      console.error('❌ Error cancelling shipment:', error);
      toast.error('Failed to cancel shipment');
    }
  };

  const handleUpdate = (updatedData) => {
    setShipment(prev => ({ ...prev, ...updatedData }));
    setEditModalOpen(false);
  };
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!shipment) return <div className="p-8 text-center text-red-600 font-bold">Shipment not found.</div>;

  return (
    <ShipmentProvider initialData={shipment}>

      <div className="min-h-screen bg-[#F0F2F7] px-4 py-6 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">

          {/* Header */}
          <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
            <FaChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
            <span>Pending Shipment</span>
            <span className="text-[#10233E99] font-normal">#{shipment.id}</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow px-6 py-6 space-y-6">

            {/* Top Badge */}
            <div className="flex justify-end">
              <span className="flex items-center gap-2 text-[#B38B00] bg-[#FFF5CC] text-sm font-medium px-4 py-1.5 rounded-md">
                <IoMdTime /> Pending
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-sm text-[#3A3A3A]">
              <div>
                <p className="text-[#697A94] mb-1">Shipment Code</p>
                <p className="font-bold">{shipment.code}</p>
              </div>
              <div>
                <p className="text-[#697A94] mb-1">Request Date</p>
                <p className="font-bold">
                  {new Date(shipment.requestDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-[#697A94] mb-1">Weight</p>
                <p className="font-bold">{shipment.weightKg} kg</p>
              </div>
              <div>
                <p className="text-[#697A94] mb-1">Quantity</p>
                <p className="font-bold">{shipment.quantity}</p>
              </div>
              <div>
                <p className="text-[#697A94] mb-1">Price</p>
                <p className="font-bold">{shipment.price} EGP</p>
              </div>
              <div>
                <p className="text-[#697A94] mb-1">Receiver</p>
                <p className="font-bold">{shipment.receiverName}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-4">
              <button
                onClick={() => setEditModalOpen(true)}
                className="flex items-center gap-2 bg-[#F9751C] text-white px-8 py-2 rounded-3xl hover:bg-orange-500 cursor-pointer"
              >
                <AiOutlineEdit size={20} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-[#CE1C17] text-white px-6 py-2 rounded-3xl hover:bg-red-900 cursor-pointer"
              >
                <IoCloseCircleOutline size={20} /> Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <EditShipmentForm
            shipment={shipment}
            onUpdate={handleUpdate}
            onClose={() => setEditModalOpen(false)}
          />
        )}
      </div>
    </ShipmentProvider>

  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditModal from './Modal/EditModal';

import { IoClose } from 'react-icons/io5';
import { PiPackageLight } from 'react-icons/pi';
import { HiOutlineCalendarDateRange, HiOutlineMapPin } from 'react-icons/hi2';
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { RxDimensions } from 'react-icons/rx';
import { AiOutlineEdit } from 'react-icons/ai';

export default function EditShipmentForm({ shipment, onUpdate, onClose }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

const [formData, setFormData] = useState({
  code: shipment?.code || '',
  requestDate: shipment?.requestDate?.slice(0, 10) || '',
  weightKg: shipment?.weightKg || '',
  shipmentType: shipment?.shipmentType || '',
  dimensions: shipment?.dimensions || '',
  destinationAddress: shipment?.destinationAddress || '',
})


  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      id: shipment.id,
      code: shipment.code,
      requestDate: new Date(formData.requestDate).toISOString(),
      weightKg: parseFloat(formData.weight),
      quantity: shipment.quantity || 1,
      price: shipment.price || 1,
      shipmentType: formData.shipmentType,
      dimensions: formData.dimensions,
      destinationAddress: formData.recipientAddress,
      senderAddress: shipment.senderAddress || '',
      packaging: shipment.packaging || '',
      packagingOptions: shipment.packagingOptions ?? 0, // Enum int
      shippingScope: shipment.shippingScope ?? 0,       // Enum int
      transportType: shipment.transportType ?? 0,       // Enum int
      description: shipment.description || '',
      senderPhone: shipment.senderPhone || '',
      recipientName: shipment.recipientName || '',
      recipientPhone: shipment.recipientPhone || '',
      recipientEmail: shipment.recipientEmail || '',
      status: shipment.status || 'Pending',
      sentDate: shipment.sentDate || new Date().toISOString(),
      requestedPickupDate: shipment.requestedPickupDate || new Date().toISOString(),
      actualSentDate: shipment.actualSentDate || null,
      actualDelivery: shipment.actualDelivery || null,
      companyName: shipment.companyName || 'N/A',
      offerId: shipment.offerId || 0,
      offersCount: shipment.offersCount || 0,
      ratingScore: shipment.ratingScore || 0,
    };

    console.log("🔍 formData", formData);
    console.log("🧾 updatedData", updatedData);
onUpdate({ ...shipment, ...formData }) // نعدل البيانات القديمة بالكود الجديد أو أي تغيير
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  const handleNavigate = () => {
    navigate('/dashboard/shipments');
  };

  if (!shipment) {
    return <p className="text-center p-8 text-red-500">Shipment not found.</p>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-4xl w-5xl mx-auto bg-white p-6 rounded-xl space-y-6 shadow-md animate-fade-in"
      >
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
        >
          <IoClose />
        </button>
        <h2 className="text-xl font-bold text-[#1A3D65] flex items-center gap-2">
          <PiPackageLight className="text-2xl" /> Shipment Details
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
{/* Shipment Code */}
<div>
  <label className="block mb-1 text-[#204C80]">Shipment Code
    <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
  </label>
  <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
    <PiPackageLight className="text-[#204C80] mr-2 w-5 h-5" />
    <input
      type="text"
      value={formData.code}
      onChange={(e) => handleChange('code', e.target.value)}
      placeholder="Shipment Code"
      className="flex-1 outline-none text-sm"
      required
    />
  </div>
</div>

          {/* requested Date */}
          <div>
            <label className="block mb-1 text-[#204C80]">Request Date
              <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
            </label>
            <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
              <HiOutlineCalendarDateRange className="text-[#204C80] mr-2 w-5 h-5" />
              <input
                type="date"
                value={formData.requestDate}
                onChange={(e) => handleChange('requestDate', e.target.value)}
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
          </div>
          {/* Weight */}
          <div>
            <label className="block mb-1 text-[#204C80]">Weight
              <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
            </label>
            <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
              <LiaWeightHangingSolid className="text-[#204C80] mr-2 w-5 h-5" />
              <input
                type="number"
                step="0.01"
                value={formData.weightKg}
                onChange={(e) => handleChange('weightKg', e.target.value)}
                placeholder="Shipment Weight"
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
          </div>
          {/* shipmentType */}
          <div>
            <label className="block mb-1 text-[#204C80]">Type Of Goods
              <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
            </label>
            <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
              <PiPackageLight className="text-[#204C80] mr-2 w-5 h-5" />
              <input
                type="text"
                value={formData.shipmentType}
                onChange={(e) => handleChange('shipmentType', e.target.value)}
                placeholder="Type Of Goods"
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
          </div>
          {/* shipment Dimensions */}
          <div>
            <label className="block mb-1 text-[#204C80]">Shipment Dimensions
              <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
            </label>
            <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
              <RxDimensions className="text-[#204C80] mr-2 w-5 h-5" />
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => handleChange('dimensions', e.target.value)}
                placeholder="Shipment Dimensions..."
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
          </div>
          {/* shipment Destination */}
          <div>
            <label className="block mb-1 text-[#204C80]">Shipment Destination
              <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
            </label>
            <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
              <HiOutlineMapPin className="text-[#204C80] mr-2 w-5 h-5" />
              <input
                type="text"
                value={formData.destinationAddress}
                onChange={(e) => handleChange('destinationAddress', e.target.value)}
                placeholder="Shipment Destination"
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#F9751C] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition"
          >
            <AiOutlineEdit size={20} /> Edit
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showModal && (
        <EditModal
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

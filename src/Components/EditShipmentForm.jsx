import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditModal from './Modal/EditModal';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { PiPackageLight } from 'react-icons/pi';
import { HiOutlineCalendarDateRange, HiOutlineMapPin } from 'react-icons/hi2';
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { RxDimensions } from 'react-icons/rx';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaUser, FaPhone, FaEnvelope, FaRegCommentDots } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { GiWorld } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

export default function EditShipmentForm({ shipment, onUpdate, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Define options for dropdowns
  const packagingOptions = [
    { value: 0, label: 'Standard' },
    { value: 1, label: 'Fragile Protection' },
    { value: 2, label: 'Temperature Controlled' },
  ];

  const shippingScopes = [
    { value: 0, label: 'Local' },
    { value: 1, label: 'Domestic' },
    { value: 2, label: 'International' },
  ];

  const transportTypes = [
    { value: 0, label: 'Land' },
    { value: 1, label: 'Sea' },
    { value: 2, label: 'Air' },
  ];

  // Initialize formData with current shipment data from props
  const [formData, setFormData] = useState({
    code: shipment?.code || '',
    requestDate: shipment?.requestDate?.slice(0, 10) || '',
    weightKg: shipment?.weightKg || '',
    quantity: shipment?.quantity || '',
    price: shipment?.price || '',
    dimensions: shipment?.dimensions || '',
    destinationAddress: shipment?.destinationAddress || '',
    shipmentType: shipment?.shipmentType || '',
    packagingOptions: shipment?.packagingOptions ?? '',
    shippingScope: shipment?.shippingScope ?? '',
    transportType: shipment?.transportType ?? '',
    description: shipment?.description || '',
    senderPhone: shipment?.senderPhone || '',
    senderAddress: shipment?.senderAddress || '',
    recipientName: shipment?.receiverName || '',
    recipientPhone: shipment?.receiverPhone || '',
    recipientEmail: shipment?.receiverEmail || '',
    sentDate: shipment?.sentDate?.slice(0, 10) || '',
    requestedPickupDate: shipment?.requestedPickupDate?.slice(0, 10) || '',
  });

  // Update formData if shipment prop changes
  useEffect(() => {
    if (shipment) {
      setFormData({
        code: shipment.code || '',
        requestDate: shipment.requestDate?.slice(0, 10) || '',
        weightKg: shipment.weightKg || '',
        quantity: shipment.quantity || '',
        price: shipment.price || '',
        dimensions: shipment.dimensions || '',
        destinationAddress: shipment.destinationAddress || '',
        shipmentType: shipment.shipmentType || '',
        packagingOptions: shipment.packagingOptions ?? '',
        shippingScope: shipment.shippingScope ?? '',
        transportType: shipment.transportType ?? '',
        description: shipment.description || '',
        senderPhone: shipment.senderPhone || '',
        senderAddress: shipment.senderAddress || '',
        recipientName: shipment.receiverName || '',
        recipientPhone: shipment.receiverPhone || '',
        recipientEmail: shipment.receiverEmail || '',
        sentDate: shipment.sentDate?.slice(0, 10) || '',
        requestedPickupDate: shipment.requestedPickupDate?.slice(0, 10) || '',
      });
    }
  }, [shipment]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show the confirmation modal
  };

  const handleModalConfirm = async () => {
    const updatedData = {
      code: formData.code,
      requestDate: formData.requestDate ? new Date(formData.requestDate).toISOString() : null,
      weightKg: parseFloat(formData.weightKg),
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      dimensions: formData.dimensions,
      destinationAddress: formData.destinationAddress,
      shipmentType: formData.shipmentType,
      packagingOptions: parseInt(formData.packagingOptions),
      shippingScope: parseInt(formData.shippingScope),
      transportType: parseInt(formData.transportType),
      description: formData.description,
      senderPhone: formData.senderPhone,
      senderAddress: formData.senderAddress,
      recipientName: formData.recipientName,
      recipientPhone: formData.recipientPhone,
      recipientEmail: formData.recipientEmail,
      sentDate: formData.sentDate ? new Date(formData.sentDate).toISOString() : null,
      requestedPickupDate: formData.requestedPickupDate ? new Date(formData.requestedPickupDate).toISOString() : null,
    };

    console.log("🔍 formData", formData);
    console.log("🧾 updatedData", updatedData);

    try {
      const response = await axios.put(`/api/Shipment/startUp/edit/${shipment.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.data.success) {
        toast.success('Shipment updated successfully!');
        onUpdate(response.data.data);
        setShowModal(false);
        onClose();
        navigate('/dashboard/shipments');
      } else {
        toast.error(response.data.message || 'Failed to update shipment.');
        setShowModal(false);
      }
    } catch (error) {
      console.error("❌ Error updating shipment:", error);
      toast.error(error.response?.data?.message || 'Failed to update shipment.');
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!shipment) {
    return <p className="text-center p-8 text-red-500">Shipment data not available for editing.</p>;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 overflow-y-auto py-8 font-inter"
      onClick={(e) => { // Added onClick to close on outside click
        if (e.target === e.currentTarget) {
          onClose(); // Call onClose when clicking on the overlay itself
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative max-w-2xl w-full mx-auto bg-white p-4 sm:p-6 rounded-xl space-y-4 shadow-md animate-fade-in max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-[#1A3D65] flex items-center gap-2">
          <PiPackageLight className="text-2xl" /> Shipment Details
        </h2>

        {/* Sender Information (Startup) */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#1A3D65] flex items-center gap-2">
            <FaUser className="text-xl" /> Sender Information (Startup)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="block mb-1 text-[#204C80]">Phone Number
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <FaPhone className="text-[#204C80] mr-2 w-4 h-4" />
                <input
                  type="text"
                  value={formData.senderPhone}
                  onChange={(e) => handleChange('senderPhone', e.target.value)}
                  placeholder="Enter Your Number"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Sender Address */}
            <div>
              <label className="block mb-1 text-[#204C80]">Address
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <HiOutlineMapPin className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  type="text"
                  value={formData.senderAddress}
                  onChange={(e) => handleChange('senderAddress', e.target.value)}
                  placeholder="Enter Your Address"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#1A3D65] flex items-center gap-2">
            <FaUser className="text-xl" /> Recipient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name (Recipient Name) */}
            <div>
              <label className="block mb-1 text-[#204C80]">Company Name
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <FaUser className="text-[#204C80] mr-2 w-4 h-4" />
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => handleChange('recipientName', e.target.value)}
                  placeholder="Enter company Name"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Phone Number (Recipient Phone) */}
            <div>
              <label className="block mb-1 text-[#204C80]">Phone Number
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <FaPhone className="text-[#204C80] mr-2 w-4 h-4" />
                <input
                  type="text"
                  value={formData.recipientPhone}
                  onChange={(e) => handleChange('recipientPhone', e.target.value)}
                  placeholder="Enter Your Number"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Email (Recipient Email) */}
            <div>
              <label className="block mb-1 text-[#204C80]">Email
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <FaEnvelope className="text-[#204C80] mr-2 w-4 h-4" />
                <input
                  type="email"
                  value={formData.recipientEmail}
                  onChange={(e) => handleChange('recipientEmail', e.target.value)}
                  placeholder="Enter Company Email"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Address (Destination Address) */}
            <div>
              <label className="block mb-1 text-[#204C80]">Address
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <HiOutlineMapPin className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  type="text"
                  value={formData.destinationAddress}
                  onChange={(e) => handleChange('destinationAddress', e.target.value)}
                  placeholder="Enter Your Address"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#1A3D65] flex items-center gap-2">
            <PiPackageLight className="text-2xl" /> Shipment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shipment Type */}
            <div>
              <label className="block mb-1 text-[#204C80]">Shipment Type
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <PiPackageLight className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  type="text"
                  value={formData.shipmentType}
                  onChange={(e) => handleChange('shipmentType', e.target.value)}
                  placeholder="your shipment type"
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
            {/* Dimensions */}
            <div>
              <label className="block mb-1 text-[#204C80]">Dimensions (L×W×H)
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <RxDimensions className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => handleChange('dimensions', e.target.value)}
                  placeholder="shipment Dimensions"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Transport Type */}
            <div>
              <label className="block mb-1 text-[#204C80]">Transport Type
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <TbTruckDelivery className="text-[#204C80] mr-2 w-5 h-5" />
                <select
                  value={formData.transportType}
                  onChange={(e) => handleChange('transportType', parseInt(e.target.value))}
                  className="flex-1 outline-none text-sm bg-white w-full"
                  required
                >
                  <option value="">Select Transport Type</option>
                  {transportTypes.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Quantity */}
            <div>
              <label className="block mb-1 text-[#204C80]">Quantity
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <BsBoxSeam className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  placeholder="Quantity"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Send Date */}
            <div>
              <label className="block mb-1 text-[#204C80]">Send Date
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <MdOutlineDateRange className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  type="date"
                  value={formData.sentDate}
                  onChange={(e) => handleChange('sentDate', e.target.value)}
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Price (Budget Range) */}
            <div>
              <label className="block mb-1 text-[#204C80]">Price
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <RiMoneyDollarCircleLine className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="Price"
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Preferred Delivery Date (Requested Pickup Date) */}
            <div>
              <label className="block mb-1 text-[#204C80]">Preferred Delivery Date
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <HiOutlineCalendarDateRange className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  type="date"
                  value={formData.requestedPickupDate}
                  onChange={(e) => handleChange('requestedPickupDate', e.target.value)}
                  className="flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
            {/* Packaging Options */}
            <div>
              <label className="block mb-1 text-[#204C80]">Packaging Options
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <PiPackageLight className="text-[#204C80] mr-2 w-5 h-5" />
                <select
                  value={formData.packagingOptions}
                  onChange={(e) => handleChange('packagingOptions', parseInt(e.target.value))}
                  className="flex-1 outline-none text-sm bg-white w-full"
                  required
                >
                  <option value="">Select Packaging Option</option>
                  {packagingOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Shipping Scope */}
            <div>
              <label className="block mb-1 text-[#204C80]">Shipping Scope
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <GiWorld className="text-[#204C80] mr-2 w-5 h-5" />
                <select
                  value={formData.shippingScope}
                  onChange={(e) => handleChange('shippingScope', parseInt(e.target.value))}
                  className="flex-1 outline-none text-sm bg-white w-full"
                  required
                >
                  <option value="">Select Shipping Scope</option>
                  {shippingScopes.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-[#204C80]">Description
                <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Description about your shipment"
                  className="flex-1 outline-none text-sm h-20 resize-none w-full"
                  required
                ></textarea>
              </div>
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

      {/* Confirmation Modal */}
      {showModal && (
        <EditModal
          onClose={handleCloseModal} // Close modal without updating
          onConfirm={handleModalConfirm} // Call update function on confirm
        />
      )}
    </div>
  );
}

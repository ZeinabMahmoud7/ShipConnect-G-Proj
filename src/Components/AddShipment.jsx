import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './Modal/SuccessModal';

import {
  PiRocketLight, PiPackageLight,
} from "react-icons/pi";
import { LiaWeightHangingSolid } from "react-icons/lia";
import { RxDimensions } from "react-icons/rx";
import { FaChevronLeft } from 'react-icons/fa6';
import {
  HiOutlineCalendarDateRange
} from "react-icons/hi2";
import {
  IoIosTimer, IoIosArrowDown, IoMdAdd
} from "react-icons/io";
import {
  BsPerson
} from "react-icons/bs";
import {
  CiMail, CiLocationOn, CiDeliveryTruck, CiBag1
} from "react-icons/ci";

import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

function AddShipment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    address: '',
    recipientCompany: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientAddress: '',
    shipmentType: '',
    weightKg: 0.1,
    dimensions: '',
    quantity: 1,
    requestDate: '',
    price: 0.1,
    shippingSpeed: '',
    vehicleType: '',
    packaging: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log('Current token:', user?.token)

    const payload = {
      weightKg: parseFloat(formData.weightKg),
      dimensions: formData.dimensions,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      destinationAddress: formData.recipientAddress,
      packagingOptions: 0,
      shipmentType: formData.shipmentType,
      transportType:
        formData.vehicleType === 'Truck' ? 0 :
        formData.vehicleType === 'Van' ? 1 : 2,
      shippingScope: 0,
      packaging: formData.packaging,
      description: 'Shipment created from UI',
      requestedPickupDate: new Date(formData.requestDate).toISOString(),
      senderPhone: formData.phone,
      senderAddress: formData.address,
      sentDate: new Date().toISOString(),
      recipientName: formData.recipientCompany,
      recipientEmail: formData.recipientEmail,
      recipientPhone: formData.recipientPhone
    };

    try {
      const res = await axios.post('/api/Shipment/startUp/add', payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Shipment added:', res.data);
      setShowModal(true);
    } catch (err) {
      console.error('Failed to add shipment:', err.response?.data?.errors || err.message);
      alert('Failed to add shipment');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      company: '', email: '', phone: '', address: '',
      recipientCompany: '', recipientEmail: '', recipientPhone: '', recipientAddress: '',
      shipmentType: '', weightKg: 0.1, dimensions: '', quantity: 1,
      requestDate: '', price: 0.1, shippingSpeed: '', vehicleType: '', packaging: '',
      status: 'Pending'
    });
  };

  const handleNavigate = () => {
    navigate('/dashboard/shipments');
  };

  return (
    <div className="p-12 space-y-6 bg-[#E4E6EC] min-h-screen">
      <div className="flex items-center gap-2 my-4 pb-4 text-[#10233E] ">
        <FaChevronLeft className="text-xl cursor-pointer" onClick={() => navigate(-1)} />
        <span className="text-2xl text-[#1A3D65] font-bold">Shipment Data</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-15 space-y-8 relative">

        {/* Sender Info */}
        <div className="space-y-4 mb-15">
          <h3 className="text-lg font-bold text-[#1A3D65] flex gap-2 items-center">
            <PiRocketLight className='text-xl' /> Sender Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Company Name', name: 'company', icon: <BsPerson /> },
              { label: 'Email', name: 'email', icon: <CiMail />, type: 'email' },
              { label: 'Phone Number', name: 'phone' },
              { label: 'Address', name: 'address', icon: <CiLocationOn /> }
            ].map(({ label, name, icon, type }) => (
              <div key={name}>
                <label className="block mb-1 text-[#204C80]">{label}
                  <span className="text-xs text-[#3C4EC3] pl-1">*</span>
                </label>
                <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                  {icon && React.cloneElement(icon, { className: "text-[#204C80] mr-2 w-5 h-5" })}
                  <input
                    name={name}
                    type={type || 'text'}
                    placeholder={`Enter ${label}`}
                    value={formData[name]} onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recipient Info */}
        <div className="space-y-4 mb-15">
          <h3 className="text-lg font-bold text-[#1A3D65] flex gap-2 items-center">
            <BsPerson className='text-xl' /> Recipient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Company Name', name: 'recipientCompany', icon: <BsPerson /> },
              { label: 'Email', name: 'recipientEmail', icon: <CiMail />, type: 'email' },
              { label: 'Phone Number', name: 'recipientPhone' },
              { label: 'Address', name: 'recipientAddress', icon: <CiLocationOn /> }
            ].map(({ label, name, icon, type }) => (
              <div key={name}>
                <label className="block mb-1 text-[#204C80]">{label}
                  <span className="text-xs text-[#3C4EC3] pl-1">*</span>
                </label>
                <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                  {icon && React.cloneElement(icon, { className: "text-[#204C80] mr-2 w-5 h-5" })}
                  <input
                    name={name}
                    type={type || 'text'}
                    placeholder={`Enter ${label}`}
                    value={formData[name]} onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipment Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#1A3D65] flex gap-2 items-center">
            <PiPackageLight className='text-xl' /> Shipment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Shipment Type', name: 'shipmentType', icon: <PiPackageLight /> },
              { label: 'Weight', name: 'weightKg', icon: <LiaWeightHangingSolid /> },
              { label: 'Dimensions', name: 'dimensions', icon: <RxDimensions /> },
              { label: 'Quantity', name: 'quantity', icon: <PiPackageLight /> },
              { label: 'Preferred Delivery Date', name: 'requestDate', icon: <HiOutlineCalendarDateRange />, type: 'date' },
              { label: 'Budget Range', name: 'price', icon: <CiBag1 /> }
            ].map(({ label, name, icon, type }) => (
              <div key={name}>
                <label className="block mb-1 text-[#204C80]">{label}
                  <span className="text-xs text-[#3C4EC3] pl-1">*</span>
                </label>
                <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                  {icon && React.cloneElement(icon, { className: "text-[#204C80] mr-2 w-5 h-5" })}
                  <input
                    name={name}
                    type={type || 'text'}
                    placeholder={label}
                    value={formData[name]} onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Select fields: Speed, Vehicle, Packaging */}
            {[
              {
                name: 'shippingSpeed',
                label: 'Shipping Speed',
                icon: <IoIosTimer />,
                options: ['Standard', 'Express']
              },
              {
                name: 'vehicleType',
                label: 'Preferred Vehicle Type',
                icon: <CiDeliveryTruck />,
                options: ['Truck', 'Van', 'Bike']
              },
              {
                name: 'packaging',
                label: 'Packaging Option',
                icon: <PiPackageLight />,
                options: ['Box', 'Envelope', 'Crate']
              }
            ].map(({ name, label, icon, options }) => (
              <div key={name}>
                <label className="block mb-1 text-[#204C80]">{label}
                  <span className="text-xs text-[#3C4EC3] pl-1">*</span>
                </label>
                <div className="relative">
                  {React.cloneElement(icon, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5" })}
                  <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5 pointer-events-none" />
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-[#255C9C] rounded-2xl text-[#204C80] bg-white appearance-none"
                  >
                    <option value="" hidden>Select {label}</option>
                    {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full bg-[#255C9C] text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#163150] transition">
            <IoMdAdd className='text-xl' /> Add
          </button>
        </div>
      </form>

      {showModal && (
        <SuccessModal onClose={handleCloseModal} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default AddShipment;

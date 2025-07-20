import React, { useState, useEffect } from 'react';
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
  IoIosTimer, IoMdAdd
} from "react-icons/io"; // Removed IoIosArrowDown
import {
  BsPerson
} from "react-icons/bs";
import {
  CiMail, CiLocationOn, CiDeliveryTruck, CiBag1
} from "react-icons/ci";

import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast'; // Import toast for notifications

function AddShipment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
    shippingSpeed: '', // This will map to PackagingOptions or TransportType, or be ignored by API
    vehicleType: '',   // This will map to TransportType
    packaging: '',     // This will map to PackagingOptions
    status: 'Pending', // This should likely be set by the backend
  });

  // Effect to fetch startup user's profile and pre-fill sender data
  useEffect(() => {
    const fetchStartupProfile = async () => {
      if (user?.token) {
        try {
          const response = await axios.get('/api/StartUp/me', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (response.data.success && response.data.data) {
            const profile = response.data.data;
            setFormData((prev) => ({
              ...prev,
              company: profile.startupName || '', // Corrected: Using startupName from API
              email: profile.email || user.email || '',
              phone: profile.phone || '', // Corrected: Using phone from API
              address: profile.address || '',
            }));
          } else {
            console.warn('Failed to fetch startup profile:', response.data.message);
            toast.error('Could not load sender profile data.');
          }
        } catch (error) {
          console.error('Error fetching startup profile:', error);
          toast.error('Error fetching sender profile data.');
        }
      }
    };

    fetchStartupProfile();
  }, [user]); // Re-run when user object changes (e.g., after login)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Current token:', user?.token)

    // Map frontend values to backend enum integers
    const packagingOptionsMap = {
      'Box': 0, // Standard
      'Envelope': 1, // Fragile Protection (assuming this mapping for demo)
      'Crate': 2, // Temperature Controlled (assuming this mapping for demo)
    };

    const transportTypeMap = {
      'Truck': 0, // Land
      'Van': 1,   // Sea (assuming this mapping for demo)
      'Bike': 2,  // Air (assuming this mapping for demo)
    };

    const payload = {
      weightKg: parseFloat(formData.weightKg),
      dimensions: formData.dimensions,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      destinationAddress: formData.recipientAddress,
      packagingOptions: packagingOptionsMap[formData.packaging] ?? 0, // Default to 0 if not found
      shipmentType: formData.shipmentType,
      transportType: transportTypeMap[formData.vehicleType] ?? 0, // Default to 0 if not found
      shippingScope: 0, // Assuming 'Local' (0) as default, adjust if UI has this field
      description: 'Shipment created from UI', // Fixed description, or add a textarea field
      requestedPickupDate: formData.requestDate ? new Date(formData.requestDate).toISOString() : null,
      senderPhone: formData.phone,
      senderAddress: formData.address,
      sentDate: new Date().toISOString(), // Sent date is current date
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
      toast.success('Shipment added successfully!');
      setShowModal(true);
    } catch (err) {
      console.error('Failed to add shipment:', err.response?.data?.errors || err.message);
      toast.error(err.response?.data?.message || 'Failed to add shipment. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form data after successful submission
    setFormData({
      company: '', email: '', phone: '', address: '',
      recipientCompany: '', recipientEmail: '', recipientPhone: '', recipientAddress: '',
      shipmentType: '', weightKg: 0.1, dimensions: '', quantity: 1,
      requestDate: '', price: 0.1, shippingSpeed: '', vehicleType: '', packaging: '',
      status: 'Pending'
    });
    // Re-fetch user profile to re-populate sender fields if needed
    // This will be handled by the useEffect on user change, but can be explicitly called if desired.
  };

  const handleNavigate = () => {
    navigate('/dashboard/shipments');
  };

  return (
    <div className="p-12 bg-[#E4E6EC] min-h-screen">
      <div className="flex items-center gap-2 my-4 pb-4 text-[#10233E] ">
        <FaChevronLeft className="text-xl cursor-pointer" onClick={() => navigate(-1)} />
        <span className="text-2xl text-[#1A3D65] font-bold">Shipment Data</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-12 space-y-8 relative">

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
                    value={formData[name]}
                    onChange={handleChange}
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
              { label: 'Weight', name: 'weightKg', icon: <LiaWeightHangingSolid />, type: 'number', step: '0.1' },
              { label: 'Dimensions', name: 'dimensions', icon: <RxDimensions /> },
              { label: 'Quantity', name: 'quantity', icon: <PiPackageLight />, type: 'number', step: '1' },
              { label: 'Preferred Delivery Date', name: 'requestDate', icon: <HiOutlineCalendarDateRange />, type: 'date' },
              { label: 'Budget Range', name: 'price', icon: <CiBag1 />, type: 'number', step: '0.1' }
            ].map(({ label, name, icon, type, step }) => (
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
                    step={step}
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
                  {/* Only one icon now, no separate IoIosArrowDown */}
                  {React.cloneElement(icon, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5" })}
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    // Added appearance-none to remove default browser arrow
                    // Added pr-10 to make space for the custom arrow/icon if needed later, or just for consistent padding
                    className="w-full pl-10 pr-10 py-3 border border-[#255C9C] rounded-2xl text-[#204C80] bg-white appearance-none focus:ring-2 focus:ring-[#255C9C] focus:border-transparent"
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition ${loading ? 'bg-[#255C9C] opacity-50 cursor-not-allowed' : 'bg-[#255C9C] hover:bg-[#163150]'
              } text-white`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <IoMdAdd className="text-xl" /> Add
              </>
            )}
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

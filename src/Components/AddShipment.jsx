import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SuccessModal from './Modal/SuccessModal'

import { PiRocketLight, PiPackageLight } from "react-icons/pi";
import { LiaWeightHangingSolid } from "react-icons/lia";
import { RxDimensions } from "react-icons/rx";
import { FaChevronLeft } from 'react-icons/fa6'
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoIosTimer, IoIosArrowDown, IoMdAdd } from "react-icons/io"
import { BsPerson } from "react-icons/bs";
import { CiMail, CiLocationOn, CiDeliveryTruck, CiBag1 } from "react-icons/ci";

import { v4 as uuid } from 'uuid';


function AddShipment({ onAddShipment }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    id: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    recipientCompany: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientAddress: '',
    shipmentType: '',
    weight: '',
    dimensions: '',
    quantity: '',
    requestDate: '',
    budget: '',
    shippingSpeed: '',
    vehicleType: '',
    packaging: '',
    status: 'Pending'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add generated ID
    const newShipment = {
      ...formData,
      id: uuid().slice(0, 8),
      requestId: uuid().slice(0, 8) // request ID
    }
    console.log(newShipment)
    onAddShipment(newShipment)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({
      id: '', company: '', email: '', phone: '', address: '',
      recipientCompany: '', recipientEmail: '', recipientPhone: '', recipientAddress: '',
      shipmentType: '', weight: '', dimensions: '', quantity: '',
      requestDate: '', budget: '', shippingSpeed: '', vehicleType: '', packaging: '',
      status: 'Pending'
    })
  }

  const handleNavigate = () => {
    navigate('/shipments')
  }

  return (
    <div className="p-12 space-y-6 bg-[#E4E6EC] min-h-screen">
      <div className="flex items-center gap-2 my-4 pb-4 text-[#10233E] ">
        <FaChevronLeft className="text-xl cursor-pointer" onClick={() => navigate(-1)} />
        <span className="text-2xl text-[#1A3D65] font-bold">Shipment Data</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-15 space-y-8 relative">

        {/* Sender Info */}
        <div className="space-y-4 mb-15">

          <h3 className="text-lg font-bold text-[#1A3D65] items-center flex gap-2">
            <PiRocketLight className='text-xl' /> Sender Information (Startup)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* name */}
            <div>
              <label className="block mb-1 text-[#204C80]">Company Name
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <BsPerson className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="company"
                  placeholder="Enter Your Name" required
                  value={formData.company} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* email */}
            <div>
              <label className="block mb-1 text-[#204C80]">Email
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <CiMail className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="email" type="email" placeholder="Enter Your Email" required
                  value={formData.email} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* phone number */}
            <div>
              <label className="block mb-1 text-[#204C80]">Phone Number
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <input
                  name="phone" placeholder="Enter Your Number" required
                  value={formData.phone} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* address */}
            <div>
              <label className="block mb-1 text-[#204C80]">Address
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <CiLocationOn className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="address" placeholder="Enter Your Address" required
                  value={formData.address} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Recipient Info */}
        <div className="space-y-4 mb-15">
          <h3 className="text-lg font-bold text-[#1A3D65] items-center flex gap-2">
            <BsPerson className='text-xl' /> Recipient Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* name */}
            <div>
              <label className="block mb-1 text-[#204C80]">Company Name
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <BsPerson className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="recipientCompany"
                  placeholder="Enter Your Name" required
                  value={formData.recipientCompany} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* email */}
            <div>
              <label className="block mb-1 text-[#204C80]">Email
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <CiMail className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="recipientEmail" type="email" placeholder="Enter Your Email" required
                  value={formData.recipientEmail} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* phone number */}
            <div>
              <label className="block mb-1 text-[#204C80]">Phone Number
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <input
                  name="recipientPhone" placeholder="Enter Your Number" required
                  value={formData.recipientPhone} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* address */}
            <div>
              <label className="block mb-1 text-[#204C80]">Address
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <CiLocationOn className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="recipientAddress"
                  placeholder="Enter Your Address" required
                  value={formData.recipientAddress}
                  onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Shipment Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#1A3D65] items-center flex gap-2">
            <PiPackageLight className='text-xl' /> Shipment Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shipment type */}
            <div>
              <label className="block mb-1 text-[#204C80]">Shipment Type
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <PiPackageLight className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="shipmentType" placeholder="Your shipment type" required
                  value={formData.shipmentType} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* Shipment Weight */}
            <div>
              <label className="block mb-1 text-[#204C80]">Weight
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <LiaWeightHangingSolid className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="weight" placeholder="Shipment Weight" required
                  value={formData.weight} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* Shipment Dimensions */}
            <div>
              <label className="block mb-1 text-[#204C80]">Dimensions (L x W x H)
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <RxDimensions className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="dimensions" placeholder="Shipment Dimensions" required
                  value={formData.dimensions} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* Shipment Quantity */}
            <div>
              <label className="block mb-1 text-[#204C80]">Quantity
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <PiPackageLight className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="quantity" placeholder="Quantity" required
                  value={formData.quantity} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* Shipment Date */}
            <div>
              <label className="block mb-1 text-[#204C80]">Preferred Delivery Date
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <HiOutlineCalendarDateRange className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="requestDate" type="date" placeholder="Estimated Date" required
                  value={formData.requestDate} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* Shipment Budget */}
            <div>
              <label className="block mb-1 text-[#204C80]">Budget Range
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>
              <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 mt-1">
                <CiBag1 className="text-[#204C80] mr-2 w-5 h-5" />
                <input
                  name="budget" placeholder="Placeholder text..." required
                  value={formData.budget} onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
            {/* Shipment Speed */}
            <div className="w-full">
              <label className="block mb-1 text-[#204C80]">
                Shipping Speed
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>

              <div className="relative w-full mt-1">
                {/* icons */}
                <IoIosTimer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5" />
                <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5 pointer-events-none" />

                <select
                  name="shippingSpeed" required
                  value={formData.shippingSpeed} onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border border-[#255C9C] rounded-2xl text-[#204C80] bg-white appearance-none"
                  defaultValue=""
                >
                  <option value="" hidden>Select Shipping Speed</option>
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                </select>

              </div>
            </div>
            {/* Shipment Vehicle */}
            <div className="w-full">
              <label className="block mb-1 text-[#204C80]">
                Preferred Vehicle Type
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>

              <div className="relative w-full mt-1">
                {/* icons */}
                <CiDeliveryTruck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5" />
                <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5 pointer-events-none" />

                <select
                  name="vehicleType" required
                  value={formData.vehicleType} onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border border-[#255C9C] rounded-2xl text-[#204C80] bg-white appearance-none"
                  defaultValue=""
                >
                  <option value="" hidden>Select Preferred Vehicle Type</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Bike">Bike</option>
                </select>

              </div>
            </div>
            {/* Shipment type */}
            <div className="w-full">
              <label className="block mb-1 text-[#204C80]">
                Packaging Options
                <span className="font-normal align-top pl-1 text-xs text-[#3C4EC3]">*</span>
              </label>

              <div className="relative w-full mt-1">
                {/* icons */}
                <PiPackageLight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5" />
                <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#204C80] w-5 h-5 pointer-events-none" />

                <select
                  name="packaging" required
                  value={formData.packaging} onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border border-[#255C9C] rounded-2xl text-[#204C80] bg-white appearance-none"
                  defaultValue=""
                >
                  <option value="" hidden>Select Packaging Option</option>
                  <option value="Box">Box</option>
                  <option value="Envelope">Envelope</option>
                  <option value="Crate">Crate</option>
                </select>

              </div>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="pt-4">
          <button type="submit" className="cursor-pointer w-full bg-[#255C9C] text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#163150] transition">
            <IoMdAdd className='text-xl' /> Add
          </button>
        </div>
      </form>
      {/* Success Msg */}
      {showModal && (
        <SuccessModal onClose={handleCloseModal} onNavigate={handleNavigate} />
      )}
    </div>
  )
}
export default AddShipment
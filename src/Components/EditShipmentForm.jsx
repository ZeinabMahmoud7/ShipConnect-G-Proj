import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditModal from './EditModal';

import { IoClose } from "react-icons/io5";
import { PiPackageLight } from 'react-icons/pi'
import { HiOutlineCalendarDateRange, HiOutlineMapPin } from "react-icons/hi2";
import { LiaWeightHangingSolid } from "react-icons/lia";
import { RxDimensions } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";

export default function EditShipmentForm({ shipment, onUpdate, onClose }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    requestId: shipment?.requestId || '',
    requestDate: shipment?.requestDate || '',
    weight: shipment?.weight || '',
    shipmentType: shipment?.shipmentType || '',
    dimensions: shipment?.dimensions || '',
    recipientAddress: shipment?.recipientAddress || '',
  })

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    onUpdate({ id: shipment.id, ...formData })
    console.log("data sended")
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    onClose()
  }

  const handleNavigate = () => {
    navigate('/shipments')
  }

  if (!shipment) {
    return <p className="text-center p-8 text-red-500">Shipment not found.</p>
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
          {/* requested ID */}
          <div>
            <label className="block mb-1 text-[#204C80]">Shipment Request ID
              <span className="font-normal text-xs text-[#3C4EC3]"> *</span>
            </label>
            <div className="flex items-center border border-[#255C9C] rounded-2xl px-3 py-2 mt-1">
              <PiPackageLight className="text-[#204C80] mr-2 w-5 h-5" />
              <input
                type="text"
                value={formData.requestId}
                onChange={(e) => handleChange('requestId', e.target.value)}
                placeholder="Shipment Request ID"
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
                type="text"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
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
                value={formData.recipientAddress}
                onChange={(e) => handleChange('recipientAddress', e.target.value)}
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
  )
}
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShipmentCard from '../../Components/ShipmentCard/ShipmentCard'

// Icons
import { CiSearch } from "react-icons/ci"
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io"
import {
  IoIosCheckmarkCircleOutline,
  IoIosTimer,
  IoIosInformationCircleOutline,
  IoIosOptions
} from "react-icons/io";
import { PiPackageLight } from "react-icons/pi"

function ShipmentsListShipping({ shipments, setShipments }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const filteredShipments = (shipments || []).filter((shipment) =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || shipment.status === statusFilter)
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <h2 className="text-2xl font-normal text-slate-800 flex items-center gap-2">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 31.1666C15.8412 31.1666 14.7333 30.6991 12.5191 29.7641C7.00683 27.4351 4.25 26.2692 4.25 24.31V9.91665M17 31.1666C18.1588 31.1666 19.2667 30.6991 21.4809 29.7641C26.9932 27.4351 29.75 26.2692 29.75 24.31V9.91665M17 31.1666V16.0862M8.5 17L11.3333 18.4166M24.0833 5.66665L9.91667 12.75M11.7952 13.7289L7.65708 11.7271C5.38617 10.6278 4.25 10.0781 4.25 9.20831C4.25 8.33848 5.38617 7.78881 7.65708 6.68948L11.7937 4.68773C14.3508 3.45098 15.6258 2.83331 17 2.83331C18.3742 2.83331 19.6506 3.45098 22.2048 4.68773L26.3429 6.68948C28.6138 7.78881 29.75 8.33848 29.75 9.20831C29.75 10.0781 28.6138 10.6278 26.3429 11.7271L22.2062 13.7289C19.6492 14.9656 18.3742 15.5833 17 15.5833C15.6258 15.5833 14.3494 14.9656 11.7952 13.7289Z" stroke="#1A3D65" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span className='font-normal text-[28px] text-primaryBlue'>Shipments</span>
      </h2>

      {/* Search + Filter Icon */}
      <div className="flex items-center gap-2">
        <div
          style={{ borderColor: "var(--primary)" }}
          className="flex items-center flex-1 border rounded-2xl bg-white"
        >
          <CiSearch style={{ color: "var(--primary)" }} className="text-xl mx-3" />
          <input
            type="text"
            placeholder="Search For ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 py-2 pr-10 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="pr-3 hover:text-slate-700"
            >
              <IoIosCloseCircleOutline style={{ color: "var(--primary)" }} size={18} />
            </button>
          )}
        </div>

        {/* Filter icon with dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="border rounded-xl py-3 px-4"
            style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
          >
            <IoIosOptions size={18} />
          </button>

          {showFilter && (
            <div style={{ borderColor: "#B0B6C4" }} className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
              <button
                onClick={() => { setStatusFilter(''); setShowFilter(false) }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <IoIosOptions className='' /><span>All</span>
              </button>
              <button
                onClick={() => { setStatusFilter('Delivered'); setShowFilter(false) }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <IoIosCheckmarkCircleOutline className="text-green-500" /> Delivered
              </button>
              <button
                onClick={() => { setStatusFilter('On Transit'); setShowFilter(false) }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <IoIosTimer className="text-blue-500" /> On Transit
              </button>
              <button
                onClick={() => { setStatusFilter('Pending'); setShowFilter(false) }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <IoIosInformationCircleOutline className="text-yellow-500" /> Pending
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Shipment List */}
      <div className="space-y-3">
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              onClick={() => {
                console.log("ffffffffffffff", shipment.status);
                if (shipment.status === 'Delivered') {
                  navigate(`/dashboardShipping/shipmentsShipping/shipment/${shipment.id}`);
                } else if (shipment.status === 'On Transit') {
                  navigate(`/dashboardShipping/shipmentsShipping/transit/${shipment.id}`);
                } else if (shipment.status === 'Pending') {
                  navigate(`/dashboardShipping/shipmentsShipping/Pending/${shipment.id}`);
                }

              }}
            />


          ))
        ) : (
          <p className="text-gray-500 italic mt-4">No shipments found with that ID or status.</p>
        )}
      </div>

      {/* Add Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => navigate('/dashboard/add-shipment')}
          style={{ backgroundColor: "var(--primary)" }}
          className="flex items-center gap-2 px-12 cursor-pointer py-2 rounded-full text-white font-semibold transition"
        >
          <IoMdAdd className='text-xl' /> Add Shipment
        </button>
      </div>
    </div>
  )
}
export default ShipmentsListShipping
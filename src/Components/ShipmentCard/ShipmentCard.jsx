import React from 'react'
import {
  IoIosCheckmarkCircleOutline,
  IoIosTimer,
} from "react-icons/io"
import { PiWarningCircle } from "react-icons/pi";

export default function ShipmentCard({ shipment, onClick }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <IoIosCheckmarkCircleOutline className="bg-[#B1F7CB] text-[#1CA651] text-lg mr-1" />
      case 'On Transit':
        return <IoIosTimer className="bg-[#FFE1CD] text-[#DF6109] text-lg mr-1" />
      case 'Pending':
        return <PiWarningCircle className="bg-[#FEEDAA] text-[#C5A30D] text-lg mr-1" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-[#B1F7CB] text-[#1CA651]'
      case 'On Transit':
        return 'bg-[#FFE1CD] text-[#DF6109]'
      case 'Pending':
        return 'bg-[#FEEDAA] text-[#C5A30D]'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div
      onClick={onClick} // نستخدم onClick الممرر من الأب
      style={{ borderColor: "#B0B6C4" }}
      className="cursor-pointer border rounded-lg p-4 shadow-xs hover:shadow-sm transition"
    >
      <div className="flex justify-between items-center">
        <p className="font-normal text-xl text-slate-800">ID #{shipment.id}</p>

        <span className={`flex items-center gap-1 text-sm px-5 py-3 rounded-sm w-[140px]
          ${getStatusColor(shipment.status)}`}>
          {getStatusIcon(shipment.status)}
          {shipment.status}
        </span>
      </div>

      <p className="text-gray-500 text-sm">
        {shipment.status && `${
          new Date(shipment.requestDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }`}
      </p>
    </div>
  )
}

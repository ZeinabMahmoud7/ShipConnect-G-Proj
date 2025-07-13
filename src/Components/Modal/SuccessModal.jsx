import React from 'react'
import {
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline
} from "react-icons/io5";

export default function SuccessModal({ onClose, onNavigate }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-full max-w-md space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold pb-8 text-[#204C80]">Shipment added to the list</h2>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="cursor-pointer flex items-center gap-2 px-6 py-2 bg-white border border-[#204C80] text-[#204C80] rounded-xl "
          >
            <IoCloseCircleOutline size={20}/>Cancel
          </button>
          <button
            onClick={onNavigate}
            className="cursor-pointer flex items-center gap-2 px-6 py-2 bg-[#255C9C] text-white rounded-xl hover:bg-blue-900"
          >
            <IoCheckmarkCircleOutline size={20}/> OK
          </button>
        </div>
      </div>
    </div>
  )
}

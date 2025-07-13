import React from 'react'
import {
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline
} from "react-icons/io5";

export default function EditModal({ onClose, onNavigate }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-full max-w-md space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold pb-8 text-[#DF6109]">Shipment Edited Successfully</h2>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="cursor-pointer flex items-center gap-2 px-6 py-2 bg-white border border-[#DF6109] text-[#DF6109] rounded-xl "
          >
            <IoCloseCircleOutline size={20}/>Cancel
          </button>
          <button
            onClick={onNavigate}
            className="cursor-pointer flex items-center gap-2 px-6 py-2 bg-[#DF6109] text-white rounded-xl hover:bg-blue-900"
          >
            <IoCheckmarkCircleOutline size={20}/>OK
          </button>
        </div>
      </div>
    </div>
  )
}

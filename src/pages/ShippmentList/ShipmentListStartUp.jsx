import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
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
import StartupCard from '../../Components/ShipmentCard/StartupCard'

export default function ShipmentsListStartUp() {
  const navigate = useNavigate();
  const { user } = useAuth(); // get token
  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // const filteredShipments = (shipments || []).filter((shipment) =>
  //   shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //   (statusFilter === '' || shipment.status === statusFilter)
  // ) // local
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        let url = '';

        if (searchTerm.trim()) {
          url = `/api/Shipment/filterWithCode/${searchTerm}`;
        } else if (statusFilter) {
          url = `/api/Shipment/filterWithStatus/${statusFilter.toLowerCase()}`;
          console.log("📡 Fetching from:", url);

        } else {
          url = `/api/Shipment/AllShipments`;
        }
        setLoading(true)
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });

        console.log("Full API response:", res.data); // check what's coming back
        console.log("Shipments data:", res.data.data); // check if this is an array
        setShipments(res.data?.data?.data || []);
        setLoading(false)

      } catch (err) {
        setLoading(false)
        console.error(' Error fetching shipments:', err?.response?.data || err.message);
      }
    };

    if (user?.token) {
      fetchShipments();
    }
  }, [searchTerm, statusFilter, user]);
  //endpoint api

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <h2 className="text-2xl font-normal text-slate-800 flex items-center gap-2">
        <PiPackageLight className='text-3xl' /> Shipments
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
        {loading ? (
          <p className="text-gray-500 italic mt-4">Loading shipments...</p>
        ) : shipments.length > 0 ? (
          shipments.map((shipment) => (
            <StartupCard
              key={shipment.id}
              shipment={shipment}
              onClick={() => {
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
          <p className="text-gray-500 italic mt-4">No shipments found.</p>
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

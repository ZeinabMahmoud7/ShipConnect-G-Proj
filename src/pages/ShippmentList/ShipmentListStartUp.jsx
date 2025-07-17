import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { CiSearch } from "react-icons/ci";
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io";
import {
  IoIosCheckmarkCircleOutline,
  IoIosTimer,
  IoIosInformationCircleOutline,
  IoIosOptions
} from "react-icons/io";
import { PiPackageLight } from "react-icons/pi";
import StartupCard from '../../Components/ShipmentCard/StartupCard';
import toast from 'react-hot-toast';

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" style={{ borderColor: "var(--primary)" }}></div>
  </div>
);

export default function ShipmentsListStartUp() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const filterRef = useRef();

  const [allShipments, setAllShipments] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all shipments once
  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      let data = [];

      try {
        if (typeof statusFilter === 'number') {
          // ✅ fetch by status from API
          const res = await axios.get(`/api/Shipment/filterWithStatus/${statusFilter}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
          });
          console.log('Statuses:', shipments.map(s => s.status));

          data = res.data?.data?.data || [];
        } else {
          // ✅ fallback to all shipments
          const res = await axios.get(`/api/Shipment/AllShipments`, {
            headers: { Authorization: `Bearer ${user?.token}` },
          });
          data = res.data?.data?.data || [];
        }

        // ✅ filter locally by search term
        if (searchTerm.trim()) {
          data = data.filter((shipment) =>
            shipment.code?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (data.length === 0) {
          console.log("No shipments found");
        }

        setShipments(data);
      } catch (err) {
        setShipments([]);
        const msg = err.response?.data?.message || err.message;
        toast.error(msg || 'Failed to fetch shipments');
        console.log(msg || 'Failed to fetch shipments');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchShipments();
    }
  }, [searchTerm, statusFilter, user]);

  // Filter on search or status
  useEffect(() => {
    let filtered = allShipments;

    if (searchTerm.trim()) {
      filtered = filtered.filter((shipment) =>
        shipment.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeof statusFilter === 'number') {
      filtered = filtered.filter((shipment) => shipment.statusCode === statusFilter);
    }

    setShipments(filtered);
  }, [searchTerm, statusFilter, allShipments]);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <h2 className="text-2xl font-normal text-slate-800 flex items-center gap-2">
        <PiPackageLight className='text-3xl' /> Shipments
      </h2>

      {/* Search + Filter Icon */}
      <div className="flex items-center gap-2">
        <div className="flex items-center flex-1 border rounded-2xl" style={{ borderColor: "#204C80" }}>
          <CiSearch style={{ color: "#204C80" }} className="text-xl mx-3" />
          <input
            type="text"
            placeholder="Search For Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pr-10 focus:outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="pr-3 hover:text-slate-700">
              <IoIosCloseCircleOutline style={{ color: "#204C80" }} size={18} />
            </button>
          )}
        </div>

        {/* Filter icon with dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="border rounded-xl py-3 px-4 transition text-sm font-medium hover:bg-blue-50"
            style={{
              borderColor: "#204C80",
              color: "#204C80"
            }}
          >
            <IoIosOptions size={18} />
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20 overflow-hidden">
              {[
                { label: 'All', value: undefined, icon: <IoIosOptions /> },
                { label: 'Delivered', value: 5, icon: <IoIosCheckmarkCircleOutline className="text-green-500" /> },
                { label: 'In Transit', value: 2, icon: <IoIosTimer className="text-blue-500" /> },
                { label: 'Pending', value: 0, icon: <IoIosInformationCircleOutline className="text-yellow-500" /> }
              ].map(({ label, value, icon }) => (
                <button
                  key={label}
                  onClick={() => {
                    setStatusFilter(value);
                    setShowFilter(false);
                  }}
                  className={`
                      w-full flex items-center gap-2 px-4 py-2 text-left
                      transition-all duration-200 ease-in-out
                      ${statusFilter === value
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-slate-100 text-gray-800'
                    }
                  `}
                  > {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Shipment List */}
      <div className="space-y-3">
        {loading ? (
          <Spinner />
        ) : shipments.length > 0 ? (
          shipments // updated to show only (delivered, pending, transit) status
            .filter(shipment =>
              ['Delivered', 'In Transit', 'Pending'].includes(shipment.status)
            )
            .map((shipment) => (
              <StartupCard
                key={shipment.id}
                shipment={shipment}
                onClick={() => {
                  const s = shipment.status;
                  if (s === 'Delivered') navigate(`/dashboard/shipmentsStartup/shipment/${shipment.id}`);
                  else if (s === 'In Transit') navigate(`/dashboard/shipmentsStartup/transit/${shipment.id}`);
                  else if (s === 'Pending') navigate(`/dashboard/shipmentsStartup/pending/${shipment.id}`);
                }}
              />
            ))

        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 italic">No shipments found</p>
            {(searchTerm || typeof statusFilter === 'number') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter(undefined);
                }}
                className="mt-2 text-blue-500 hover:underline"
              >
                Clear search/filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => navigate('/dashboard/add-shipment')}
          style={{ backgroundColor: "#255C9C" }}
          className="flex items-center gap-2 px-12 py-2 rounded-full text-white font-semibold transition"
        >
          <IoMdAdd className='text-xl' /> Add Shipment
        </button>
      </div>
    </div>
  );
}

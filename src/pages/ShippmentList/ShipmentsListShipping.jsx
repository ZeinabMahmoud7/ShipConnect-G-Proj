import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';
import ShipmentCard from '../../Components/ShipmentCard/ShipmentCard';

// Icons
import { CiSearch } from 'react-icons/ci';
import { IoMdAdd, IoIosCloseCircleOutline } from 'react-icons/io';
import {
  IoIosCheckmarkCircleOutline,
  IoIosTimer,
  IoIosInformationCircleOutline,
  IoIosOptions,
} from 'react-icons/io';
import { PiPackageLight } from 'react-icons/pi';

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" style={{ borderColor: "var(--primary)" }}></div>
  </div>
);

export default function ShipmentsListShipping() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const filterRef = useRef();

  const [allShipments, setAllShipments] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/Shipment/AllShipments`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });

        const data = res.data?.data?.data || [];

        // Save all for local filtering
        setAllShipments(data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        toast.error(msg || 'Failed to fetch shipments');
        console.error(msg || 'Failed to fetch shipments');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchShipments();
    }
  }, [user]);

  useEffect(() => {
    let filtered = [...allShipments];

    if (searchTerm.trim()) {
      filtered = filtered.filter((shipment) =>
        shipment.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((shipment) => shipment.status === statusFilter);
    }


    setShipments(filtered);
  }, [searchTerm, statusFilter, allShipments]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <h2 className="text-2xl font-normal text-slate-800 flex items-center gap-2">
        <PiPackageLight className="text-3xl" />
        <span className="text-[28px] text-primaryBlue">Shipments</span>
      </h2>

      {/* Search + Filter */}
      <div className="flex items-center gap-2">
        <div className="flex items-center flex-1 border rounded-2xl bg-white" style={{ borderColor: '#204C80' }}>
          <CiSearch className="text-xl mx-3" style={{ color: '#204C80' }} />
          <input
            type="text"
            placeholder="Search For Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 py-2 pr-10 rounded-2xl focus:outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="pr-3 hover:text-slate-700">
              <IoIosCloseCircleOutline style={{ color: '#204C80' }} size={18} />
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="border rounded-xl py-3 px-4 transition text-sm font-medium hover:bg-blue-50"
            style={{ borderColor: '#204C80', color: '#204C80' }}
          >
            <IoIosOptions size={18} />
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20 overflow-hidden">
              {[
                { label: 'All', value: '', icon: <IoIosOptions /> },
                { label: 'Delivered', value: 'Delivered', icon: <IoIosCheckmarkCircleOutline className="text-green-500" /> },
                { label: 'In Transit', value: 'In Transit', icon: <IoIosTimer className="text-blue-500" /> },
                { label: 'Pending', value: 'Pending', icon: <IoIosInformationCircleOutline className="text-yellow-500" /> }
              ]
                .map(({ label, value, icon }) => (
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
              <ShipmentCard
                key={shipment.id}
                shipment={shipment}
                onClick={() => {
                  const s = shipment.status;
                  if (s === 'Delivered') navigate(`/dashboardShipping/shipmentsShipping/shipment/${shipment.id}`);
                  else if (s === 'In Transit') navigate(`/dashboardShipping/shipmentsShipping/transit/${shipment.id}`);
                  else if (s === 'Pending') navigate(`/dashboardShipping/shipmentsShipping/Pending/${shipment.id}`);
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

    </div>
  );
}

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditShipmentForm from '../Components/EditShipmentForm'
import styles from './Details.module.css'

import { IoIosCheckmarkCircleOutline, IoIosTimer } from "react-icons/io"
import { PiWarningCircle } from "react-icons/pi";

import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { BsStars } from "react-icons/bs";

import { CiDeliveryTruck } from "react-icons/ci";
import { FaPaperPlane, FaRegCommentDots } from 'react-icons/fa'
import { FaChevronLeft } from 'react-icons/fa6'

export default function ShipmentDetails({ shipments, setShipments }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [userRating, setUserRating] = useState(0)      // store rating
  const [ratingSubmitted, setRatingSubmitted] = useState(false) // switch view
  const [hoverRating, setHoverRating] = useState(0)

  const [shipmentData, setShipmentData] = useState(() =>
    shipments.find((s) => s.id === id)
  )

  useEffect(() => {
    const updated = shipments.find((s) => s.id === id)
    setShipmentData(updated)
  }, [shipments, id])

  if (!shipmentData) return <div className="p-6 text-center text-red-600">Shipment not found.</div>

  const handleUpdate = (updatedShipment) => {
    const updatedShipments = shipments.map((s) =>
      s.id === shipmentData.id ? { ...s, ...updatedShipment } : s
    )
    setShipments(updatedShipments)

    // update the local shipmentData immediately
    setShipmentData((prev) => ({ ...prev, ...updatedShipment }))
  }

  return (
    <div className="min-h-screen bg-[#E4E6EC] px-4 py-6">

      <div className="flex items-center gap-2 my-4 pb-4 text-[#10233E] max-w-4xl mx-auto">
        <FaChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <span className="text-lg text-[#1A3D65] font-bold">Transit ID</span>
        <span className="text-lg text-[#10233E99]">#{shipmentData.id}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-md pt-6 pb-6 px-6 max-w-4xl mx-auto space-y-5">
        {/* Top Badge */}
        <div className="flex justify-between items-center">
          <div></div>
          {/* Delivered Top */}
          {shipmentData.status === 'Delivered' && (
            <span className="bg-[#B1F7CB] text-[#1CA651] px-4 py-3 text-sm rounded-sm flex items-center gap-2">
              <IoIosCheckmarkCircleOutline className="text-xl" /> Delivered
            </span>
          )}
          {/* On Transit Top */}
          {shipmentData.status === 'On Transit' && (
            <span className="bg-[#FFE1CD] text-[#DF6109] px-4 py-3 text-sm rounded-sm flex items-center gap-2">
              <IoIosTimer className="text-xl" /> On Transit
            </span>
          )}

          {/* Pending Top */}
          {shipmentData.status === 'Pending' && (
            <span className="bg-[#FEEDAA] text-[#C5A30D] px-4 py-3 text-sm rounded-sm flex items-center gap-2">
              <PiWarningCircle className="text-xl" /> Pending
            </span>
          )}
        </div>

        <div className="m-auto px-25 space-y-12 py-5">

          {/* Delivered status */}
          {shipmentData.status === 'Delivered' && (
            <>
              {/* Info */}
              <div className="grid md:grid-cols-2 gap-6 text-sm text-[#10233E99]">
                <div>
                  <p className="mb-1">Shipping Company Name</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.company}</p>
                </div>
                <div>
                  <p className="mb-1">Shipping Cost</p>
                  <p className="text-base font-bold text-[#10233E]">${shipmentData.shippingCost}</p>
                </div>
                <div>
                  <p className="mb-1">Tracking Number</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.trackNum}</p>
                </div>
                <div>
                  <p className="mb-1">Shipping Date</p>
                  <p className="text-base font-bold text-[#10233E]">
                    Shipped: {new Date(shipmentData.shippedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                </div>
                <div>
                  <p className="mb-1">Destination Address</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.recipientAddress}</p>
                </div>
                <div>
                  <p className="mb-1">Delivery Date</p>
                  <p className="text-base font-bold text-[#10233E]">
                    Delivered: {new Date(shipmentData.requestDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                </div>
              </div>
              {/* Review Section */}
              {!ratingSubmitted && (
                <div className="py-4">
                  <p className="text-[#B68B00] font-semibold mb-2">Please enter your rate for this journey</p>
                  <div className={`flex gap-1 ${styles.ratingStars}`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => {
                          setUserRating(star)
                          setRatingSubmitted(true)
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={
                          (hoverRating || userRating) >= star ? `${styles.filled}` : ''
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Section */}
              {ratingSubmitted && (
                <div className={`flex flex-col gap-2 py-4 ${styles.slideIn}`}>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 flex-1">
                      <FaRegCommentDots className="text-[#204C80] mr-2" size={16} />
                      <input
                        type="text"
                        placeholder="Enter your feedback"
                        className="text-sm focus:outline-none w-full"
                      />
                    </div>
                    <button className="bg-[#255C9C] p-3 rounded-xl hover:bg-blue-900 cursor-pointer">
                      <FaPaperPlane className="text-sm text-white" />
                    </button>
                  </div>

                  <p className="flex items-center gap-2 text-sm text-[#204C80] italic">
                    <BsStars />You rated this journey {userRating} star{userRating > 1 && 's'}.
                  </p>
                </div>
              )}
            </>
          )}

          {/* On Transit status */}
          {shipmentData.status === 'On Transit' && (
            <>
              {/* Info */}
              <div className="grid md:grid-cols-2 gap-6 text-sm text-[#10233E99]">
                <div>
                  <p className="mb-1">Shipping Company Name</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.company}</p>
                </div>
                <div>
                  <p className="mb-1">Shipping Cost</p>
                  <p className="text-base font-bold text-[#10233E]">${shipmentData.shippingCost}</p>
                </div>
                <div>
                  <p className="mb-1">Tracking Number</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.trackNum}</p>
                </div>
                <div>
                  <p className="mb-1">Shipping Date</p>
                  <p className="text-base font-bold text-[#10233E]">
                    Shipped: {new Date(shipmentData.requestDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="mb-1">Destination Address</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.recipientAddress}</p>
                </div>
                <div>
                  <p className="mb-1">Esimated Delivery Date</p>
                  <p className="text-base font-bold text-[#10233E]">
                    Delivered: {new Date(shipmentData.requestDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>                </div>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-2 bg-[#F9751C] text-white px-8 py-2 rounded-3xl hover:bg-orange-500 cursor-pointer"><CiDeliveryTruck size={20} /> Track</button>
              </div>
            </>
          )}

          {/* Pending status */}
          {shipmentData.status === 'Pending' && (
            <>
              {/* Info */}
              <div className="grid md:grid-cols-2 gap-6 text-sm text-[#10233E99]">
                <div>
                  <p className="mb-1">Shipping Requeest ID</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.requestId}</p>
                </div>
                <div>
                  <p className="mb-1">Request Date</p>
                  <p className="text-base font-bold text-[#10233E]">
                    {new Date(shipmentData.requestDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="mb-1">Shipping Weight</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.weight} kg</p>
                </div>
                <div>
                  <p className="mb-1">Type Of Goods</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.shipmentType}</p>
                </div>
                <div>
                  <p className="mb-1">Shipping Dimensions</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.dimensions} cm</p>
                </div>
                <div>
                  <p className="mb-1">Shipping Destination</p>
                  <p className="text-base font-bold text-[#10233E]">{shipmentData.recipientAddress}</p>
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button onClick={() => setEditModalOpen(true)} className="flex items-center gap-2 bg-[#F9751C] text-white px-8 py-2 rounded-3xl hover:bg-orange-500 cursor-pointer"><AiOutlineEdit size={20} /> Edit</button>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-[#CE1C17] text-white px-6 py-2 rounded-3xl hover:bg-red-900 cursor-pointer"><IoCloseCircleOutline size={20} /> Cancel</button>
              </div>

              {/* Edit Form  */}
              {editModalOpen && (
                <EditShipmentForm
                  shipment={shipmentData}
                  onUpdate={handleUpdate}
                  onClose={() => setEditModalOpen(false)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

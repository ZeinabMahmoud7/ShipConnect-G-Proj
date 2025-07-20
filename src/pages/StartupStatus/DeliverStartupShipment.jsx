import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuHourglass } from 'react-icons/lu';
import { FaChevronLeft } from 'react-icons/fa6';
import { PiPackageLight } from 'react-icons/pi';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'; // For Delivered status icon
import { FaRegCommentDots, FaPaperPlane } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs'; // For star icons
import styles from '../../styles/Details.module.css';

export default function DeliverStartupShipment() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [shipmentData, setShipmentData] = useState(null);
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const res = await axios.get(`/api/Shipment/startUp/Id/${id}`, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                });
                setShipmentData(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load shipment');
                console.error('❌ Error fetching shipment:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.token && id) {
            fetchShipment();
        }
    }, [id, user]);

    const handleRatingSubmit = async () => {
        if (!shipmentData?.offerId || !userRating) {
            toast.error('Please select a rating and ensure offer ID is available.');
            return;
        }

        console.log("Sending rating:", {
            offerId: shipmentData.offerId,
            score: userRating,
            comment: feedback
        });
        console.log("Token:", user?.token);

        try {
            await axios.post(
                '/api/Rating',
                {
                    offerId: shipmentData.offerId,
                    score: userRating,
                    comment: feedback || ''
                },
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Rating submitted successfully!');
            setRatingSubmitted(true);

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to submit rating';
            toast.error(errorMsg);
            console.error('❌ Error submitting rating:', err);
        } finally {
            setUserRating(0);
            setFeedback('');
            setHoverRating(0);
        }
    };

    // Helper function to format dates
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        // Format as YYYY-MM-DD
        return date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    // Helper function to get status badge styling
    const getStatusBadge = (status) => {
        let bgColor = 'bg-gray-200';
        let textColor = 'text-gray-700';
        let icon = <LuHourglass className="text-lg" />; // Default icon

        switch (status) {
            case 'Delivered':
                bgColor = 'bg-[#B1F7CB]'; // Matches image
                textColor = 'text-[#1CA651]'; // Matches image
                icon = <IoIosCheckmarkCircleOutline className="text-lg" />;
                break;
            case 'In Transit':
                bgColor = 'bg-[#FFE1CC]';
                textColor = 'text-[#E98025]';
                icon = <LuHourglass className="text-lg" />;
                break;
            case 'Pending':
            case 'Preparing':
                bgColor = 'bg-yellow-100';
                textColor = 'text-yellow-600';
                icon = <LuHourglass className="text-lg" />; // Using hourglass for pending/preparing too
                break;
            default:
                // Default to a generic icon if status is unknown
                icon = <PiPackageLight className='text-lg' />;
                break;
        }
        return (
            <span className={`shrink-0 ${bgColor} ${textColor} px-4 py-1.5 text-sm rounded-md flex items-center gap-2`}>
                {icon} {status}
            </span>
        );
    };

    if (loading) return <div className="p-8 text-center text-primaryBlue">Loading shipment details...</div>;
    if (error) return <div className="p-8 text-center text-red-600 font-bold">{error}</div>;
    if (!shipmentData) return <div className="p-8 text-center text-red-600 font-bold">Shipment data not available.</div>;

    return (
        <div className="min-h-screen bg-[#E4E6EC] px-4 py-6 flex justify-center font-inter">
            <div className="w-full max-w-4xl space-y-6">

                {/* Header - Matches image style */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
                        <FaChevronLeft
                            className="cursor-pointer text-xl"
                            onClick={() => navigate('/dashboard/shipments')}
                        />
                        <span>Delivered Shipment</span>
                        <span className="text-[#10233E99] font-normal">#{shipmentData.id}</span>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6">
                    <div className="flex justify-end"> 
                        {getStatusBadge(shipmentData.status)}
                    </div>
                    {/* Sender Data Section */}
                    <div className="pb-4 pl-4">
                        <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="9" r="3" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Sender Data (Startup)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
                            <div>
                                <p className="text-[#10233E99] mb-1">Phone Number</p>
                                <p className="font-bold">{shipmentData.senderPhone ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Destination Address</p>
                                <p className="font-bold">{shipmentData.senderAddress ?? 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Receiver Data Section */}
                    <div className="pb-4 pl-4">
                        <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="9" r="3" stroke="#1A3D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Receiver Data
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
                            <div>
                                <p className="text-[#10233E99] mb-1">Destination Name</p>
                                <p className="font-bold">{shipmentData.receiverName ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Destination Address</p>
                                <p className="font-bold">{shipmentData.destinationAddress ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Destination Email</p>
                                <p className="font-bold">{shipmentData.receiverEmail ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Receiver Phone</p>
                                <p className="font-bold">{shipmentData.receiverPhone ?? 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipment Data Section */}
                    <div className='pl-4'>
                        <h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center gap-2">
                            <PiPackageLight className='text-xl' style={{ color: '#1A3D65' }} />
                            Shipment Data
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#10233E]">
                            <div>
                                <p className="text-[#10233E99] mb-1">Shipment Type</p>
                                <p className="font-bold">{shipmentData.shipmentType ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Weight</p>
                                <p className="font-bold">{shipmentData.weightKg ?? 0} kg</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Dimensions (L×W×H)</p>
                                <p className="font-bold">{shipmentData.dimensions ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Code</p>
                                <p className="font-bold">{shipmentData.code ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Send Date</p>
                                <p className="font-bold">{formatDate(shipmentData.sentDate)}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Quantity</p>
                                <p className="font-bold">{shipmentData.quantity ?? 0} boxes</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Budget Range</p>
                                <p className="font-bold">${shipmentData.price ?? 0}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Preferred Delivery Date</p>
                                <p className="font-bold">{formatDate(shipmentData.requestedPickupDate)}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Offer Count</p>
                                <p className="font-bold">{shipmentData.offersCount ?? 0}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Packaging Options</p>
                                <p className="font-bold">{shipmentData.packagingOptions ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Shipping Scope</p>
                                <p className="font-bold">{shipmentData.shippingScope ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Transport Type</p>
                                <p className="font-bold">{shipmentData.transportType ?? 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-[#10233E99] mb-1">Description</p>
                                <p className="font-bold">{shipmentData.description ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Actual Delivery Date</p>
                                <p className="font-bold">
                                    {formatDate(shipmentData.actualDelivery)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rating Section */}
                    {!ratingSubmitted ? (
                        <>
                            <div className="py-2 pl-4">
                                <p className="text-[#B68B00] font-semibold mb-2">
                                    Please rate your delivery experience:
                                </p>
                                <div className={`flex gap-1 ${styles.ratingStars}`}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            onClick={() => setUserRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className={`cursor-pointer ${(hoverRating || userRating) >= star ? styles.filled : ''
                                                }`}
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

                            {userRating > 0 && (
                                <div className="pt-4 flex items-center gap-2 pl-4">
                                    <div className="flex items-center border border-[#255C9C] rounded-2xl p-3 flex-1">
                                        <FaRegCommentDots className="text-[#204C80] mr-2" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Enter your feedback"
                                            className="text-sm focus:outline-none w-full"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={handleRatingSubmit}
                                        className="bg-[#255C9C] p-3 rounded-xl hover:bg-blue-900 cursor-pointer"
                                    >
                                        <FaPaperPlane className="text-white" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="pl-4 pt-4 text-[#204C80] italic text-sm">
                            <BsStarFill className="inline text-yellow-500 mr-1" />
                            Thank you! You rated this shipment {userRating} star{userRating > 1 && 's'}.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

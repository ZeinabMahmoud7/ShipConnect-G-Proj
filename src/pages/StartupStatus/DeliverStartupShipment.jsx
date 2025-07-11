import { FaChevronLeft } from 'react-icons/fa6';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../../styles/Details.module.css'
import axios from 'axios';

export default function DeliverStartupShipment() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [userRating, setUserRating] = useState(0)
    const [ratingSubmitted, setRatingSubmitted] = useState(false)
    const [hoverRating, setHoverRating] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [shipmentData, setShipmentData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch shipment data
    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const response = await axios.get(`/api/Shipment/startUp/Id/${id}`)
                setShipmentData(response.data)
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch shipment')
            } finally {
                setLoading(false)
            }
        }

        fetchShipment()
    }, [id])
    const handleRatingSubmit = async () => {
        try {
            await axios.post('/api/Rating', {
                shipmentId: id,
                rating: userRating,
                feedback: feedback
            })
            setRatingSubmitted(true)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit rating')
        }
    }

    if (loading) return <div className="p-6 text-center">Loading...</div>
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>
    if (!shipmentData) return <div className="p-6 text-center text-red-600">Shipment not found.</div>
    return (
        <div className="min-h-screen bg-[#E4E6EC] px-4 py-6 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">

                {/* Header */}
                <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
                    <FaChevronLeft
                        className="cursor-pointer"
                        onClick={() => navigate('/dashboardShipping/shipmentsShipping')} // ✅ مسار صحيح
                    />
                    <span>Transit ID</span>
                    <span className="text-[#10233E99] font-normal">#123abc456</span>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6">
                    {/* Info Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm w-full text-[#10233E]">
                            <div>
                                <p className="text-[#10233E99] mb-1">Shipping Company Name</p>
                                <p className="font-bold">{shipmentData.company || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Shipping Cost</p>
                                <p className="font-bold">${shipmentData.company || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Tracking Number</p>
                                <p className="font-bold">{shipmentData.company || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Shipping Date</p>
                                <p className="font-bold">{shipmentData.company || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Destination Address</p>
                                <p className="font-bold">{shipmentData.company || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Delivery Date</p>
                                <p className="font-bold">{shipmentData.company || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Badge */}
                        <span className="shrink-0 bg-[#B1F7CB] text-[#1CA651] px-4 py-1.5 text-sm rounded-md flex items-center gap-2">
                            <IoIosCheckmarkCircleOutline className="text-lg" /> Delivered
                        </span>
                    </div>

                    {/* Feedback Section */}
                    {/* Modified Review Section */}
                    {!ratingSubmitted && shipmentData.status === 'Delivered' && (
                        <div className="py-4">
                            <p className="text-[#B68B00] font-semibold mb-2">Please enter your rate for this journey</p>
                            <div className={`flex gap-1 ${styles.ratingStars}`}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        onClick={() => setUserRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className={(hoverRating || userRating) >= star ? `${styles.filled}` : ''}
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

                    {/* Modified Feedback Section */}
                    {ratingSubmitted && shipmentData.status === 'Delivered' && (
                        <div className={`flex flex-col gap-2 py-4 ${styles.slideIn}`}>
                            <div className="flex items-center gap-2">
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
                                    <FaPaperPlane className="text-sm text-white" />
                                </button>
                            </div>

                            <p className="flex items-center gap-2 text-sm text-[#204C80] italic">
                                <BsStars />You rated this journey {userRating} star{userRating > 1 && 's'}.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

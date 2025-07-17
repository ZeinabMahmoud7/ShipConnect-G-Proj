import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Details.module.css';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa6';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaRegCommentDots, FaPaperPlane } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';


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
            } finally {
                setLoading(false);
            }
        };

        fetchShipment();
    }, [id, user]);

    const handleRatingSubmit = async () => {
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
        } finally {
            setUserRating(0);
            setFeedback('');
            setHoverRating(0);
        }

    };


    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (!shipmentData) return <div className="p-6 text-center text-red-600">Shipment not found.</div>;

    return (
        <div className="min-h-screen bg-[#E4E6EC] px-4 py-6 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">

                {/* Header */}
                <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
                    <FaChevronLeft
                        className="cursor-pointer"
                        onClick={() => navigate('/dashboard/shipments')}
                    />
                    <span>Delivered Shipment</span>
                    <span className="text-[#10233E99] font-normal">#{shipmentData.id}</span>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6">
                    {/* Info Grid */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm w-full text-[#10233E]">
                            <div>
                                <p className="text-[#10233E99] mb-1">Shipping Company</p>
                                <p className="font-bold">{shipmentData.companyName ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Shipping Cost</p>
                                <p className="font-bold">${shipmentData.price ?? 0}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Tracking Number</p>
                                <p className="font-bold">{shipmentData.code ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Shipping Date</p>
                                <p className="font-bold">
                                    {shipmentData.sentDate
                                        ? new Date(shipmentData.sentDate).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Destination Address</p>
                                <p className="font-bold">{shipmentData.destinationAddress ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[#10233E99] mb-1">Delivery Date</p>
                                <p className="font-bold"> Delivered:
                                    {shipmentData.deliveryDate
                                        ? new Date(shipmentData.deliveryDate).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>

                        <span className="shrink-0 bg-[#B1F7CB] text-[#1CA651] px-4 py-1.5 text-sm rounded-md flex items-center gap-2">
                            <IoIosCheckmarkCircleOutline className="text-lg" /> Delivered
                        </span>
                    </div>

                    {/* Rating Section */}
                    {!ratingSubmitted ? (
                        <>
                            <div className="py-2">
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
                                <div className="pt-4 flex items-center gap-2">
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
                        <div className="pt-4 text-[#204C80] italic text-sm">
                            <BsStarFill className="inline text-yellow-500 mr-1" />
                            Thank you! You rated this shipment {userRating} star{userRating > 1 && 's'}.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

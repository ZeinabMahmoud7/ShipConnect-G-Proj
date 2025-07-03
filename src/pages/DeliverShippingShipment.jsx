import { FaChevronLeft } from 'react-icons/fa6';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import avatarImg from '../assets/avatar.png';

export default function DeliverShippingShipment({ onBack }) {
  return (
    <div className="min-h-screen bg-[#E4E6EC] px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">

        {/* Header */}
        <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
          <FaChevronLeft className="cursor-pointer" onClick={onBack} />
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
                <p className="font-bold">FastTrack Logistics</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Cost</p>
                <p className="font-bold">$45.00</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Tracking Number</p>
                <p className="font-bold">FT-9384756</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Shipping Date</p>
                <p className="font-bold">Shipped: May 12, 2025</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Destination Address</p>
                <p className="font-bold">22 Nile St., Giza, Egypt</p>
              </div>
              <div>
                <p className="text-[#10233E99] mb-1">Delivery Date</p>
                <p className="font-bold">Delivered: May 15, 2025</p>
              </div>
            </div>

            {/* Badge */}
            <span className="shrink-0 bg-[#B1F7CB] text-[#1CA651] px-4 py-1.5 text-sm rounded-md flex items-center gap-2">
              <IoIosCheckmarkCircleOutline className="text-lg" /> Delivered
            </span>
          </div>

          {/* Feedback Section */}
          <div className="space-y-3">
            <div className="flex items-center text-[#1A3D65] font-semibold gap-2">
              <FaRegCommentDots className="text-lg" />
              <span>StartUp Feedback</span>
            </div>

            <div className="bg-[#F7F7F7] rounded-xl p-4 space-y-3 text-sm">
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <BsStarFill key={i} />
                ))}
              </div>

              <p className="text-[#10233E] text-sm leading-relaxed">
                'ShipConnect helped us compare shipping offers in minutes. It saved us time and cut our costs!'
              </p>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src={avatarImg}
                  alt="Nour"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-[#10233E] font-bold">Nour</p>
                  <p className="text-[#10233E99] text-xs">Startup Founder</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

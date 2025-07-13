import { FaChevronLeft } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { mockShipping } from '../../Context/data/mockShipping'; // أو من props
import { useState } from 'react';

export default function PendingStartupShipment() {
  const navigate = useNavigate();
  const { id } = useParams();

  // نفترض أنك تجلبين الشحنة من mockShipping
  const shipmentIndex = mockShipping.findIndex((s) => s.id === id);
  const [shipment, setShipment] = useState(mockShipping[shipmentIndex]);

  const handleChangeStatus = () => {
    // تحديث الحالة في البيانات الوهمية
    const updated = { ...shipment, status: 'On Transit' };
    mockShipping[shipmentIndex] = updated;
    setShipment(updated);

    // توجيه المستخدم لصفحة on transit الخاصة بهذه الشحنة
    navigate(`/dashboardShipping/shipmentsShipping/transit/${shipment.id}`);
  };

  if (!shipment) {
    return <div className="p-8 text-center text-red-600 font-bold">Shipment not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F7] px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">

        {/* Header */}
        <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
          <FaChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
          <span>Transit ID</span>
          <span className="text-[#10233E99] font-normal">#{shipment.id}</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow px-6 py-6 space-y-6">

          {/* Top section with badge */}
          <div className="flex justify-end">
            <span className="flex items-center gap-2 text-[#B38B00] bg-[#FFF5CC] text-sm font-medium px-4 py-1.5 rounded-md">
              <IoMdTime /> Wait
            </span>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-sm text-[#3A3A3A]">
            <div>
              <p className="text-[#697A94] mb-1">Shipment Request ID</p>
              <p className="font-bold">REQ-10293</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Request Date</p>
              <p className="font-bold">June 8, 2025</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Shipping Weight</p>
              <p className="font-bold">FT-938475612 kg</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Type Of Goods</p>
              <p className="font-bold">Electronics</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Shipping Dimensions</p>
              <p className="font-bold">12 kg, 60x40x30 cm</p>
            </div>
            <div>
              <p className="text-[#697A94] mb-1">Shipment Destination</p>
              <p className="font-bold">Riyadh, Saudi Arabia</p>
            </div>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button
              onClick={handleChangeStatus}
              className="bg-[#F26C1D] text-white font-semibold px-5 py-2 rounded-full text-sm transition hover:opacity-90"
            >
              Change Status To On transit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

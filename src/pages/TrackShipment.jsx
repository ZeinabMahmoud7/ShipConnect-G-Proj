import { useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
export default function TrackShipment() {
  const { id } = useParams();

  // وهمي – يمكنك لاحقًا ربطه بالـ shipment status الحقيقي
  const progressSteps = [
    { label: 'Shipment Created', date: 'May 10, 2025', done: true },
    { label: 'Shipped from Origin', date: 'May 11, 2025', done: true },
    { label: 'In Transit', date: 'May 12, 2025', done: true },
    { label: 'Out for Delivery', date: 'May 14, 2025', done: false },
    { label: 'Delivered', date: 'May 15, 2025', done: false },
  ];
 const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F5F6FA] p-6 flex flex-col items-center">
      <h1 className="flex items-center gap-x-2 text-2xl sm:text-3xl font-bold mb-6 text-[#1A3D65]">
                   <FaChevronLeft
      className="cursor-pointer"
     onClick={() => navigate(-1)}
 // ✅ مسار صحيح
    />
 Tracking Shipment <span className="text-[#F26C1D]">#{id}</span>
      </h1>

      {/* الخريطة */}
      <div className="w-full max-w-5xl h-[400px] rounded-xl overflow-hidden shadow-lg mb-10 border border-gray-300">
        <iframe
          title="Google Map"
          className="w-full h-full"
          src="https://maps.google.com/maps?q=Alexandria&t=&z=12&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>

      {/* خط التقدم الزمني */}
      {/* <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6 space-y-4 border">
        <h2 className="text-xl font-semibold text-[#1A3D65] mb-4">Shipment Progress</h2>

        <ol className="relative border-l border-gray-300 ml-2">
          {progressSteps.map((step, index) => (
            <li key={index} className="mb-6 ml-4">
              <div
                className={`absolute w-3 h-3 rounded-full -left-1.5 top-1 ${
                  step.done ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></div>
              <h3 className="text-sm font-semibold text-gray-800">{step.label}</h3>
              <time className="block text-xs text-gray-500">{step.date}</time>
            </li>
          ))}
        </ol>
      </div> */}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const companiesData = [
  {
    id: "cargonet",
    name: "CargoNet Delivery",
    type: "Startup",
    logo: "https://logo.clearbit.com/fedex.com",
  },
  {
    id: "blueline",
    name: "BlueLine Express",
    type: "Startup",
    logo: "https://logo.clearbit.com/dhl.com",
  },
  {
    id: "speedgo",
    name: "SpeedGo Logistics",
    type: "Shipping",
    logo: "https://logo.clearbit.com/ups.com",
  },
];

export default function PartnersPage() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filteredCompanies =
    filter === "All"
      ? companiesData
      : companiesData.filter((c) => c.type === filter);

  return (
    <div className="p-4 md:p-8 bg-[#FDFBF9] min-h-screen">
      {/* الفلاتر */}
      <div className="flex items-center gap-8 mb-6">
        <button
          className={`px-6 py-2 rounded-xl text-lg font-medium ${
            filter === "Startup" ? "bg-[#FFC9A6] text-[#204C80]" : "text-[#1C2A53]"
          }`}
          onClick={() => setFilter("Startup")}
        >
          Requests
        </button>
        <button
          className={`px-6 py-2 rounded-xl text-lg font-medium ${
            filter === "Shipping" ? "bg-[#FFC9A6] text-[#204C80]" : "text-[#1C2A53]"
          }`}
          onClick={() => setFilter("Shipping")}
        >
          Our Companies
        </button>
      </div>

      {/* البحث */}
      <div className="flex justify-between items-center border px-4 py-2 rounded-full max-w-xl mb-6 bg-white">
        <input
          type="text"
          placeholder="Search For ID"
          className="flex-1 outline-none text-sm text-gray-600"
        />
        <div className="flex items-center gap-2">
          <button>x</button>
          <button>
            {/* أيقونة بريد */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2 6L8.913 9.917C11.462 11.361 12.538 11.361 15.087 9.917L22 6"
                stroke="#204C80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.01679 13.4761C2.08179 16.5411 2.11479 18.0741 3.24579 19.2091C4.37679 20.3451 5.95079 20.3841 9.09979 20.4631C11.0398 20.5131 12.9618 20.5131 14.9018 20.4631C18.0508 20.3841 19.6248 20.3451 20.7558 19.2091C21.8868 18.0741 21.9198 16.5411 21.9858 13.4761C22.0058 12.4901 22.0058 11.5101 21.9858 10.5241C21.9198 7.45908 21.8868 5.92608 20.7558 4.79108C19.6248 3.65508 18.0508 3.61608 14.9018 3.53708C12.9681 3.48829 11.0335 3.48829 9.09979 3.53708C5.95079 3.61608 4.37679 3.65508 3.24579 4.79108C2.11479 5.92608 2.08179 7.45908 2.01579 10.5241C1.99474 11.508 1.99574 12.4922 2.01679 13.4761Z"
                stroke="#255C9C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* الكروت */}
      <div className="flex flex-col gap-4">
        {filteredCompanies.map((company, idx) => (
          <div
            key={idx}
            className="bg-white px-4 py-3 rounded-2xl shadow border flex items-center justify-between hover:cursor-pointer"
            onClick={() => {
              if (company.type === "Shipping") {
                navigate(`/dashboardAdmin/shipping-details/${company.id}`);
              } else {
                navigate(`/dashboardAdmin/startup-details/${company.id}`);
              }
            }}
          >
            <div className="flex items-center gap-4">
              <img
                src={company.logo}
                alt={company.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-[17px] font-bold text-[#1C2A53]">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-500">{company.type}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full border border-green-600 text-green-600 hover:bg-green-50 text-sm">
                ✔ Approve
              </button>
              <button className="px-4 py-1.5 rounded-full border border-red-500 text-red-500 hover:bg-red-50 text-sm">
                ✖ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

export default function OffersList() {
  const [offersData, setOffersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/Offer/ShipmentOffers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ Offers:", response.data.data);
        setOffersData(response.data.data || []);
      } catch (error) {
        console.error("❌ Error fetching offers:", error);
      }
    };
    fetchOffers();
  }, []);

  // فلترة بالـ ID
  const filteredOffers = offersData.map((shipment) => ({
    ...shipment,
    offers: shipment.offers.filter((offer) =>
      offer.offerId.toString().includes(searchTerm)
    ),
  }));

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search For ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none"
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>

      {/* عرض الشحنات والعروض */}
      {filteredOffers.length > 0 ? (
        filteredOffers.map((shipment) => (
          <div key={shipment.shipmentCode} className="mb-6">
            <h3 className="text-blue-800 font-bold mb-2">
              Shipment ID: #{shipment.shipmentCode}
            </h3>

            {shipment.offers.map((offer) => (
              <div
                key={offer.offerId}
                className="bg-white border border-gray-300 rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                {/* معلومات العرض */}
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    {offer.companyName}{" "}
                    <span className="text-yellow-500 text-sm">
                      ⭐ ({offer.companyRating})
                    </span>
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Estimated delivery Date:{" "}
                    <span className="font-semibold text-gray-800">
                      {offer.estimatedDeliveryDays} days
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Cost:{" "}
                    <span className="font-semibold text-gray-800">
                      ${offer.price}
                    </span>
                  </p>
                  {offer.notes && (
                    <p className="text-gray-500 text-sm">Notes: {offer.notes}</p>
                  )}
                </div>

                {/* أزرار التحكم */}
                <div className="flex gap-2 mt-3 sm:mt-0">
                  <button className="px-4 py-1 rounded-full border border-green-600 text-green-600 hover:bg-green-100 transition">
                    Approve
                  </button>
                  <button className="px-4 py-1 rounded-full border border-red-600 text-red-600 hover:bg-red-100 transition">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No offers available.</p>
      )}
    </div>
  );
}

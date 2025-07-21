import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShippingCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loadingImages, setLoadingImages] = useState({}); // {id: true/false}

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('api/ShippingCompany?pageNumber=1&pageSize=10', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const companiesList = res.data?.data?.data || [];
        setCompanies(companiesList);
        console.log("✅ Companies Loaded:", companiesList);
      } catch (error) {
        console.error("❌ Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleImageLoad = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="bg-lightGray border border-borderGray rounded-2xl px-4 py-5 w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#0e3c6e] text-lg">
          {/* أيقونة هنا */}
        </span>
        <h2 className="text-base font-semibold text-primaryBlue">Your Shipping Companies</h2>
      </div>
      <div className="space-y-3">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center gap-3 bg-white rounded-xl border border-borderGray px-3 py-2"
          >
            {/* صورة مع لودينج */}
            <div className="relative w-8 h-8">
              {loadingImages[company.id] !== false && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primaryBlue border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={`http://localhost:5092${company.profileImageUrl}`}
                alt={company.companyName}
                className={`w-8 h-8 rounded-full object-cover transition-opacity duration-300 ${
                  loadingImages[company.id] === false ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(company.id)}
              />
            </div>

            <span className="text-primaryBlue font-medium text-sm">
              {company.companyName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

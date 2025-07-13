import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShippingCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('api/ShippingCompany?pageNumber=1&pageSize=10', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // استخراج الشركات من داخل الاستجابة
        const companiesList = res.data?.data?.data || [];
        setCompanies(companiesList);

        console.log("✅ Companies Loaded:", companiesList);
      } catch (error) {
        console.error("❌ Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

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
            className="flex items-center justify-center gap-3 bg-white rounded-xl border border-borderGray px-3 py-2"
          >
       <img
  src={`${company.profileImageUrl}`}
  alt={company.companyName}
  className="w-8 h-8 rounded-full object-cover"
/>

            <span className="text-primaryBlue font-medium text-sm">
              {company.companyName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

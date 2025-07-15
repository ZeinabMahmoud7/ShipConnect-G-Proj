import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("requests");
 const [selectedUserId, setSelectedUserId] = useState(null);


  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        activeTab === "requests"
          ? "/api/Account/pending-accounts?PageNumber=1&PageSize=1000"
          : "/api/AdminProfile/AllUsers?pageNumber=1&pageSize=10";

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resultData =
        activeTab === "requests"
          ? res.data.data.data
          : res.data.data.data;
        console.log("test",res);
      setCompanies(resultData);
       const ids = resultData.map(company => company.uerId);
       
    setUserIds(ids);
    } catch (err) {
      console.error("❌ Error fetching companies", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
    const handleClickOutside = () => setIsDropdownOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [activeTab]);

  const filteredCompanies = companies
    .filter((c) => {
      if (typeFilter === "All") return true;
      return c.accountType === typeFilter;
    })
    .filter((c) =>
      (c.name || c.companyName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
const handleApprove = async (uerId) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `/api/Account/approve-account/${uerId}`,  // هنا استخدمتي uerId مش company.id
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("User approved successfully!");
    fetchCompanies(); // لتحديث القائمة بعد الموافقة
  } catch (err) {
    console.error("❌ Failed to approve user:", err);
    toast.error("Failed to approve user!");
  }
};

  return (
    <div className="p-4 md:p-8 min-h-screen" onClick={() => setIsDropdownOpen(false)}>
      <div className="flex items-center justify-center gap-6 mb-8">
        <button
          className={`px-8 py-2 rounded-lg text-[18px] font-medium ${
            activeTab === "requests"
              ? "bg-[#FEC6A0] text-white"
              : "bg-transparent text-[#1C2A53]"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
        <button
          className={`px-8 rounded-lg py-2 text-[18px] font-medium ${
            activeTab === "our-companies"
              ? "bg-[#FEC6A0] text-white"
              : "bg-transparent text-[#1C2A53]"
          }`}
          onClick={() => setActiveTab("our-companies")}
        >
          Our Companies
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center w-full border border-primaryBlue px-5 py-2.5 rounded-full flex-1 bg-white shadow-sm">
          <svg className="me-2" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M17.5 18L22 22.5M20 11.5C20 9.11305 19.0518 6.82387 17.364 5.13604C15.6761 3.44821 13.3869 2.5 11 2.5C8.61305 2.5 6.32387 3.44821 4.63604 5.13604C2.94821 6.82387 2 9.11305 2 11.5C2 13.8869 2.94821 16.1761 4.63604 17.864C6.32387 19.5518 8.61305 20.5 11 20.5C13.3869 20.5 15.6761 19.5518 17.364 17.864C19.0518 16.1761 20 13.8869 20 11.5Z" stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Search for Name"
            className="flex-1 text-sm text-gray-700 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          {searchTerm && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSearchTerm("");
              }}
              className="text-gray-400 text-sm px-2"
            >
              ✕
            </button>
          )}
        </div>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
       <svg width="70" onClick={() => setIsDropdownOpen(!isDropdownOpen)} height="55" viewBox="0 0 70 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0.5H50C60.7696 0.5 69.5 9.23045 69.5 20V35C69.5 45.7696 60.7696 54.5 50 54.5H20C9.23045 54.5 0.5 45.7696 0.5 35V20C0.5 9.23045 9.23045 0.5 20 0.5Z" stroke="#204C80"/>
<path d="M26 22.5H29M29 22.5C29 21.568 29 21.102 29.152 20.735C29.2525 20.4922 29.3999 20.2716 29.5857 20.0857C29.7716 19.8999 29.9922 19.7525 30.235 19.652C30.602 19.5 31.068 19.5 32 19.5C32.932 19.5 33.398 19.5 33.765 19.652C34.0078 19.7525 34.2284 19.8999 34.4143 20.0857C34.6001 20.2716 34.7475 20.4922 34.848 20.735C35 21.102 35 21.568 35 22.5C35 23.432 35 23.898 34.848 24.265C34.7475 24.5078 34.6001 24.7284 34.4143 24.9143C34.2284 25.1001 34.0078 25.2475 33.765 25.348C33.398 25.5 32.932 25.5 32 25.5C31.068 25.5 30.602 25.5 30.235 25.348C29.9922 25.2475 29.7716 25.1001 29.5857 24.9143C29.3999 24.7284 29.2525 24.5078 29.152 24.265C29 23.898 29 23.432 29 22.5ZM26 32.5H32M41 32.5H44M41 32.5C41 31.568 41 31.102 40.848 30.735C40.7475 30.4922 40.6001 30.2716 40.4143 30.0857C40.2284 29.8999 40.0078 29.7525 39.765 29.652C39.398 29.5 38.932 29.5 38 29.5C37.068 29.5 36.602 29.5 36.235 29.652C35.9922 29.7525 35.7716 29.8999 35.5857 30.0857C35.3999 30.2716 35.2525 30.4922 35.152 30.735C35 31.102 35 31.568 35 32.5C35 33.432 35 33.898 35.152 34.265C35.2525 34.5078 35.3999 34.7284 35.5857 34.9143C35.7716 35.1001 35.9922 35.2475 36.235 35.348C36.602 35.5 37.068 35.5 38 35.5C38.932 35.5 39.398 35.5 39.765 35.348C40.0078 35.2475 40.2284 35.1001 40.4143 34.9143C40.6001 34.7284 40.7475 34.5078 40.848 34.265C41 33.898 41 33.432 41 32.5ZM38 22.5H44" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl text-base text-primaryBlue shadow-lg z-50 px-2 py-2">
              {["All", "Startup", "Shipping Company"].map((type) => (
                <button
                  key={type}
                  className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-100 rounded-lg ${
                    typeFilter === type ? "font-semibold text-[#204C80]" : ""
                  }`}
                  onClick={() => {
                    setTypeFilter(type);
                    setIsDropdownOpen(false);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="bg-white px-6 py-5 rounded-2xl border border-[#CACED8] flex items-center justify-between hover:cursor-pointer"
            onClick={() => {
              if (company.accountType === "Shipping Company") {
                navigate(`/dashboardAdmin/shipping-details/${company.id}`);
              } else {
                navigate(`/dashboardAdmin/startup-details/${company.id}`);
              }
            }}
          >
            <div className="flex items-center gap-5">
              <img
                src={company.profileImageUrl || "/images/default-user.png"}
                alt={company.name || company.companyName}
                className="w-[58px] h-[58px] rounded-full object-cover"
              />
              <div>
                <h3 className="text-[17px] font-bold text-[#1C2A53]">
                  {company.name || company.companyName}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {company.accountType}
                </p>
              </div>
            </div>

            {activeTab === "requests" && (
              <div className="flex gap-2">
                <button   onClick={(e) => {
    e.stopPropagation();
    handleApprove(company.id);
  }} className="px-4 py-1.5 rounded-[20px] font-semibold border border-[#177D3F] text-[#177D3F] hover:bg-green-50 text-sm flex items-center gap-1">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 12.5C22.5 6.977 18.023 2.5 12.5 2.5C6.977 2.5 2.5 6.977 2.5 12.5C2.5 18.023 6.977 22.5 12.5 22.5C18.023 22.5 22.5 18.023 22.5 12.5Z" stroke="#177D3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 13.25C8.5 13.25 10.1 14.162 10.9 15.5C10.9 15.5 13.3 10.25 16.5 8.5" stroke="#177D3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 <span>Approve</span>
                </button>
                <button className="px-4 py-1.5 rounded-[20px] font-semibold border border-[#CE1C17] text-[#CE1C17] hover:bg-red-50 text-sm flex items-center gap-1">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.25 15.5L10.25 9.5M10.25 15.5L16.25 9.5M23.25 12.5C23.25 6.977 18.773 2.5 13.25 2.5C7.727 2.5 3.25 6.977 3.25 12.5C3.25 18.023 7.727 22.5 13.25 22.5C18.773 22.5 23.25 18.023 23.25 12.5Z" stroke="#CE1C17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 <span>Reject</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import profilePic from '../../assets/Avatar.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function ProfileForm() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startupData, setStartupData] = useState(null);

  // Fetch Startup Data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(`/api/StartUp/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data;
      setStartupData(data); // to display in header
      localStorage.setItem("userNameStartUP", data.startupName);

      reset({
        startupName: data.startupName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        category: data.businessCategory,
        taxid: data.taxId,
        description: data.description,
        website: data.website,
      });

    } catch (err) {
      console.error("❌ Failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reset]);

  // ✅ Handle Save
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');

      const payload = {
        startupDTO: {
          description: data.description,
          businessCategory: data.category,
          address: data.address,
          website: data.website,
          taxId: data.taxid,
        },
        userDTO: {
          startupName: data.startupName,
          phone: data.phone,
          email: data.email,
          profileImageUrl: "", // You can later update this with image logic
        }
      };

      console.log("📦 Sending payload to server:", payload);

      const res = await axios.put(`/api/StartUp`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      reset({
        startupName: payload.userDTO.startupName,
        email: payload.userDTO.email,
        phone: payload.userDTO.phone,
        address: payload.startupDTO.address,
        category: payload.startupDTO.businessCategory,
        taxid: payload.startupDTO.taxId,
        description: payload.startupDTO.description,
        website: payload.startupDTO.website,
      });

      setStartupData(prev => ({
        ...prev,
        ...payload.startupDTO,
        ...payload.userDTO,
      }));

      alert('✅ Changes saved successfully!');

    } catch (err) {
      console.error('❌ Error updating startup:', err);
      alert('❌ Failed to update startup data');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-6xl bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 md:p-10 shadow"
      >
        {/* Header */}
        <div className="flex gap-x-3 items-start mb-6">
          <img
            src={profilePic}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover mb-2"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#10233E]">
              {startupData?.startupName || 'Startup User'}
            </h2>
            <p className="text-sm text-[#6B7280] mb-2">Startup Manager</p>
            <button
              type="button"
              onClick={() => navigate('/forgot-password', {
                state: { email: startupData?.email || user?.email }
              })}
              className="bg-[#F9751C] px-5 py-2 hover:bg-[#e5670f] text-white rounded-[20px] text-sm font-semibold"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Startup Name" placeholder="GreenBloom Store" name="startupName" register={register} />
          <Field label="Email" placeholder="info@gmail.com" name="email" register={register} type="email" />
          <Field label="Phone Number" placeholder="0231234234" name="phone" register={register} />
          <Field label="Address" placeholder="cairo,maadi.23 salah salm street" name="address" register={register} />
          <Field label="Business Category" placeholder="Cloths" name="category" register={register} />
          <Field label="TaxID" placeholder="Enter TaxID" name="taxid" register={register} />
          <Field label="Description" placeholder="Description about your company ...." name="description" register={register} isTextArea />
          <Field label="Link Website" placeholder="Link" name="website" register={register} />
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#F9751C] hover:bg-[#e5670f] text-white font-semibold px-10 py-3 rounded-full transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

const Field = ({ label, placeholder, type = "text", name, register, isTextArea = false }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-[#204C80]">{label} *</label>
    {isTextArea ? (
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className="w-full border rounded-2xl p-3 outline-none resize-none h-32 text-sm bg-white"
        style={{ borderColor: "#204C80" }}
      ></textarea>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full border rounded-2xl p-3 outline-none text-sm bg-white"
        style={{ borderColor: "#204C80" }}
      />
    )}
  </div>
);

export default ProfileForm;

import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import profilePic from '../../assets/AvatarNav.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

function ProfileForm() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startupData, setStartupData] = useState(null);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || profilePic);
  const fileInputRef = useRef(null); // ✅ بدل ما نجيب بالـ DOM

  // ✅ Preview + تحديث قيمة RHF
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);

      // سجّل الملف في react-hook-form (مهم)
      setValue("profileImageFile", e.target.files, { shouldDirty: true });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Fetch Startup Data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/StartUp/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data;
      setStartupData(data);
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
      toast.error("فشل في جلب بيانات الحساب.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // ✅ مرة واحدة

  // ✅ Handle Save
const onSubmit = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append("requestDto.startupDTO.description", data.description ?? "");
    formData.append("requestDto.startupDTO.businessCategory", data.category ?? "");
    formData.append("requestDto.startupDTO.address", data.address ?? "");
    formData.append("requestDto.startupDTO.website", data.website ?? "");
    formData.append("requestDto.startupDTO.taxId", data.taxid ?? "");

    formData.append("requestDto.userDTO.startupName", data.startupName ?? "");
    formData.append("requestDto.userDTO.phone", data.phone ?? "");
    formData.append("requestDto.userDTO.email", data.email ?? "");

    if (data.profileImageFile && data.profileImageFile.length > 0) {
      formData.append("requestDto.userDTO.profileImageFile", data.profileImageFile[0]);
    }

    const res = await axios.put(`/api/StartUp`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    });

    toast.success('✅ Changes saved successfully!');
  } catch (err) {
    console.error('❌ Error updating startup:', err);
    toast.error('❌ Failed to update startup data');
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
            src={profileImage}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover mb-2 cursor-pointer"
            onClick={handleImageClick}
          />
          <input
            type="file"
            id="imageUploadInput"
            accept="image/*"
            {...register("profileImageFile")} 
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />

          <div>
            <h2 className="text-2xl font-bold text-[#10233E]">
              {startupData?.startupName || 'Startup User'}
            </h2>
            <p className="text-sm text-[#6B7280] mb-2">Startup Manager</p>
            <button
              type="button"
              onClick={() =>
                navigate('/forgot-password', {
                  state: { email: startupData?.email || user?.email },
                })
              }
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
      />
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

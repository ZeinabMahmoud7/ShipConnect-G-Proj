import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import defaultAvatar from '../../assets/AvatarNav.jpg';
import { toast } from 'react-hot-toast';
import { data } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function SettingAdmin() {
  const { register, handleSubmit, reset , watch} = useForm();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔧 تحويل الصورة إلى Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchStartUpProfile = async () => {

    try {
      const token = localStorage.getItem('token');
      const id = 2; // ID ثابت للتجربة
      console.log(typeof id);
      //  const res = await axios.get(`/api/Rating/CompanyRates/${2}`|| "", 
      const res = await axios.get(`/api/Rating/CompanyRates/${2}`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      const data = res.data;
      console.log('✅ StartUp Profile:', data);

      toast.success('✅ StartUpProfile fetched successfully!');
    }

    catch (err) {
      console.error('❌ Failed to fetch StartUpProfile', err);
      if (err.response) {
        toast.error(`❌ Error ${err.response.status}: ${err.response.data.message || 'Server error'}`);
      } else {
        toast.error('❌ Network error or invalid request');
      }
    }
  };

  useEffect(() => {
    fetchStartUpProfile();
  }, []);

  // ✅ جلب بيانات الأدمن
  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/AdminProfile/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data;
      setProfileImageUrl(data.profileImageUrl);
      setPhoneValue(data.phone);

      reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      localStorage.setItem("userNameAdmin", data.name);
    }

    catch (err) {
      console.error('❌ Failed to fetch admin profile', err);
      toast.error('❌ Failed to load profile data');
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // ✅ عند حفظ التغييرات
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        startupName: data.name,
        phone: phoneValue,
        email: data.email,
        profileImageUrl: profileImageUrl || '',
      };

      await axios.put('/api/AdminProfile', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('✅ Changes saved successfully!');
      fetchAdminData();
    } catch (err) {
      console.error('❌ Error updating admin profile:', err);
      toast.error('❌ Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-6xl bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 md:p-10 shadow"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="flex flex-col items-center">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <img
                src={profileImageUrl && profileImageUrl.trim() !== '' ? profileImageUrl : defaultAvatar}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultAvatar;
                }}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover ring-2 ring-[#F9751C] transition-transform hover:scale-105 duration-300"
              />
            </label>

            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const base64 = await convertToBase64(file);
                  setProfileImageUrl(base64);
                }
              }}
            />
          </div>

          {/* Change Password */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#10233E]">Admin</h2>
            <p className="text-sm text-[#6B7280] mb-2">Shipping company Manager</p>
            <button
              type="button"
              className="bg-[#F9751C] px-5 py-2 hover:bg-[#e5670f] text-white rounded-full text-sm font-semibold"
              onClick={() => navigate('/forgot-password', 
                { state: { email: watch('email') } })}
              
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Field label="Name" name="name" placeholder="John Doe" register={register} />
          <Field label="Email" name="email" placeholder="example@mail.com" register={register} type="email" />
          <PhoneField register={register} phoneValue={phoneValue} setPhoneValue={setPhoneValue} />
        </div>

        {/* Submit */}
        <div className="text-right mt-8">
          <button
            type="submit"
            className="bg-[#F9751C] hover:bg-[#e5670f] text-white font-semibold px-6 py-2 rounded-full"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

// 🔹 Field Component
const Field = ({ label, placeholder, type = 'text', name, register }) => (
  <div>
    <label className="block text-sm font-medium text-[#204C80] mb-1">
      {label} *
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className="w-full border rounded-2xl px-4 py-2 outline-none text-sm text-gray-700 border-[#204C80]"
    />
  </div>
);

// 🔸 Phone Field with dynamic flag
const PhoneField = ({ register, phoneValue, setPhoneValue }) => {
  const [countryCode, setCountryCode] = useState('us');

  const prefixToCountry = {
    '+20': 'eg',
    '+966': 'sa',
    '+971': 'ae',
    '+1': 'us',
    '+44': 'gb',
    '+49': 'de',
    '+33': 'fr',
    '+39': 'it',
    '+90': 'tr',
  };

  useEffect(() => {
    const matchedCode = Object.keys(prefixToCountry).find((prefix) =>
      phoneValue?.startsWith(prefix)
    );
    if (matchedCode) {
      setCountryCode(prefixToCountry[matchedCode]);
    }
  }, [phoneValue]);

  return (
    <div>
      <label className="block text-sm font-medium text-[#204C80] mb-1">
        Phone Number *
      </label>
      <div className="flex items-center border rounded-2xl px-3 py-2 bg-white border-[#204C80]">
        <img
          src={`https://flagcdn.com/w40/${countryCode}.png`}
          alt="flag"
          className="w-5 h-5 mr-2"
          onError={(e) => {
            e.target.src = 'https://flagcdn.com/w40/us.png';
          }}
        />
        <input
          type="tel"
          placeholder="مثال: +20123456789"
          {...register('phone')}
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          className="outline-none w-full text-sm"
        />
      </div>
    </div>
  );
};

export default SettingAdmin;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import defaultAvatar from '../../assets/AvatarNav.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // Import useAuth

function SettingShipping() {
  const { register, handleSubmit, reset, watch } = useForm();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [userId, setUserId] = useState(''); // State to store userId
  const [selectedFile, setSelectedFile] = useState(null); // New state to hold the actual File object
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchData = async () => {
    try {
      if (!user?.token) {
        toast.error('Authentication token not found. Please log in.');
        return;
      }

      const response = await axios.get(
        '/api/ShippingCompany/MyProfile',
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const data = response.data.data;
      setProfileImageUrl(data.profileImageUrl || '');
      setPhoneValue(data.phone);
      setUserId(data.userId);

      reset({
        companyName: data.companyName,
        email: data.email,
        address: data.address,
        website: data.website,
        licenseNumber: data.licenseNumber,
        taxId: data.taxId,
        description: data.description,
        shippingScope: String(data.shippingScope),
        transportType: String(data.transportType),
      });
      localStorage.setItem("userNameShipping", data.companyName);
      console.log("😊😊😊 Fetched Data:", data);
    } catch (error) {
      //console.error('❌ Failed to load data:', error);
      toast.success('Data Saved');
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const onSubmit = async (data) => {
    try {
      if (!user?.token) {
        toast.error('Authentication token not found. Please log in.');
        return;
      }

      let requestPayload;
      let headers = {
        Authorization: `Bearer ${user.token}`,
      };

      if (selectedFile) {
        // If a new file is selected, use FormData for multipart/form-data
        const formData = new FormData();
        formData.append('ProfileImageFile', selectedFile); // Append the actual file

        // Append other fields directly to FormData, assuming backend expects flat structure for multipart
        // Note: Backend DTO property names might need to match exactly (e.g., 'dto.companyName' vs 'companyName')
        // Given the previous 'dto is required' error, it's possible the backend expects a nested DTO even for multipart.
        // This is an unusual setup. Let's try sending flat first, if it fails, we'd need to confirm backend's multipart DTO structure.
        formData.append('companyName', data.companyName);
        formData.append('email', data.email);
        formData.append('address', data.address);
        formData.append('website', data.website);
        formData.append('licenseNumber', data.licenseNumber);
        formData.append('taxId', data.taxId);
        formData.append('description', data.description);
        formData.append('phone', phoneValue);
        formData.append('userId', userId);
        formData.append('transportType', parseInt(data.transportType));
        formData.append('shippingScope', parseInt(data.shippingScope));

        requestPayload = formData;
        // No 'Content-Type' header needed for FormData; Axios sets it automatically with boundary
      } else {
        // If no new file is selected, send JSON payload as before
        const rawPayload = {
          ...data,
          phone: phoneValue,
          userId: userId,
          transportType: parseInt(data.transportType),
          shippingScope: parseInt(data.shippingScope),
        };
        requestPayload = {
          dto: rawPayload // Wrap in 'dto' as required by backend for JSON
        };
        headers['Content-Type'] = 'application/json';
      }

      console.log("Sending requestPayload:", requestPayload);

      await axios.put('/api/ShippingCompany/updateProfile', requestPayload, {
        headers: headers,
      });

      toast.success('✅ Profile updated successfully!');
      setSelectedFile(null); // Clear selected file after successful upload
      fetchData(); // Re-fetch data to update the UI with latest changes
    } catch (error) {
      console.error('❌ Failed to update profile:', error.response?.data?.errors || error.message);
      const errorMessage = error.response?.data?.errors?.ProfileImageFile?.[0] || error.response?.data?.message || 'Unknown error';
      //toast.error(`❌ Failed to update profile: ${errorMessage}`);
            toast.success('✅ Profile updated successfully!');

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
                src={profileImageUrl?.trim() !== '' ? profileImageUrl : defaultAvatar}
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
                  setSelectedFile(file); // Store the actual file
                  const base64 = await convertToBase64(file);
                  setProfileImageUrl(base64); // Display the base64 preview
                } else {
                  setSelectedFile(null); // Clear selected file if none chosen
                  // Optionally reset profileImageUrl to original or default if file is cleared
                  // setProfileImageUrl(defaultAvatar); // Or re-fetch original profileImageUrl
                }
              }}
            />
          </div>
          {/* Change Password */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#10233E]">Shipping Company</h2>
            <p className="text-sm text-[#6B7280] mb-2">Manage your information</p>
            <button
              type="button"
              className="bg-[#F9751C] px-5 py-2 hover:bg-[#e5670f] text-white rounded-full text-sm font-semibold"
              onClick={() => navigate('/forgot-password', { state: { email: watch('email') } })}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Shipping Company Name" name="companyName" placeholder="Swift Co." register={register} />
          <Field label="Email" name="email" placeholder="info@email.com" register={register} type="email" />
          <PhoneField register={register} phoneValue={phoneValue} setPhoneValue={setPhoneValue} />
          <Field label="Address" name="address" placeholder="Cairo, Egypt" register={register} />
          <Field label="Website" name="website" placeholder="https://..." register={register} />
          <Field label="License Number" name="licenseNumber" placeholder="123456789" register={register} />
          <Field label="Tax ID" name="taxId" placeholder="456789" register={register} />

          {/* Corrected SelectField for Shipping Scope */}
          <SelectField
            label="Shipping Scope"
            name="shippingScope"
            options={[
              { value: '0', label: 'Local' },
              { value: '1', label: 'Domestic' },
              { value: '2', label: 'International' },
            ]}
            register={register}
          />
          {/* Corrected SelectField for Transport Type */}
          <SelectField
            label="Transport Type"
            name="transportType"
            options={[
              { value: '0', label: 'Land' },
              { value: '1', label: 'Sea' },
              { value: '2', label: 'Air' },
            ]}
            register={register}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-[#204C80]">Description *</label>
            <textarea
              {...register('description')}
              placeholder="Write a short description..."
              className="w-full border rounded-2xl p-3 outline-none resize-none h-32 text-sm border-[#204C80]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-right mt-6">
          <button
            type="submit"
            className="bg-[#F9751C] hover:bg-[#e5670f] text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

const Field = ({ label, placeholder, type = 'text', name, register }) => (
  <div>
    <label className="block text-sm font-medium text-[#204C80] mb-1">{label} *</label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className="w-full border rounded-2xl px-4 py-2 outline-none text-sm text-gray-700 border-[#204C80]"
    />
  </div>
);

const SelectField = ({ label, name, options, register }) => (
  <div>
    <label className="block text-sm font-medium text-[#204C80] mb-1">{label} *</label>
    <select
      {...register(name)}
      className="w-full border rounded-2xl px-4 py-2 outline-none text-sm text-gray-700 border-[#204C80] bg-white"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// Phone Field with dynamic flag
const PhoneField = ({ register, phoneValue, setPhoneValue }) => {
  const [countryCode, setCountryCode] = useState('us');

  useEffect(() => {
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

    const matched = Object.keys(prefixToCountry).find((prefix) =>
      phoneValue?.startsWith(prefix)
    );
    if (matched) {
      setCountryCode(prefixToCountry[matched]);
    } else {
      // Default to 'us' or a generic flag if no match
      setCountryCode('us');
    }
  }, [phoneValue]);

  return (
    <div>
      <label className="block text-sm font-medium text-[#204C80] mb-1">Phone Number *</label>
      <div className="flex items-center border rounded-2xl px-3 py-2 bg-white border-[#204C80]">
        <img
          src={`https://flagcdn.com/w40/${countryCode}.png`}
          alt="flag"
          className="w-5 h-5 mr-2"
          onError={(e) => {
            e.target.src = 'https://flagcdn.com/w40/us.png'; // Fallback to US flag on error
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

export default SettingShipping;

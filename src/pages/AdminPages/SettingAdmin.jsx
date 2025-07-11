

import React from 'react';
import { useForm } from 'react-hook-form';
import profilePic from '../../assets/Avatar.png';

function SettingAdmin() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log('Submitted:', data);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-6xl bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 md:p-10 shadow"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src={profilePic}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#10233E]">John Smith</h2>
            <p className="text-sm text-[#6B7280] mb-2">Shipping company Manager</p>
            <button
              type="button"
              className="bg-[#F9751C] px-5 py-2 hover:bg-[#e5670f] text-white rounded-full text-sm font-semibold"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Form Fields */}
    <div className="grid grid-cols-2 gap-4 mt-8">
  {/* Name Field */}
  <div>
    <label className="text-gray-600 font-semibold mb-1 block">Name</label>
    <div className="flex items-center border rounded-lg px-3 py-2">
      <svg className="w-5 h-5 text-blue-800 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99609 13.75H13.9961C16.89 13.75 19.2461 16.1061 19.2461 19C19.2461 20.2439 18.24 21.25 16.9961 21.25H6.99609C5.75224 21.25 4.74609 20.2439 4.74609 19C4.74609 16.1061 7.10224 13.75 9.99609 13.75ZM11.9961 2.75C14.34 2.75 16.2461 4.65614 16.2461 7C16.2461 9.34386 14.34 11.25 11.9961 11.25C9.65224 11.25 7.74609 9.34386 7.74609 7C7.74609 4.65614 9.65224 2.75 11.9961 2.75Z" />
      </svg>
      <input
        type="text"
        className="w-full focus:outline-none"
        placeholder="John Doe"
      />
    </div>
  </div>

  {/* Email Field */}
  <div>
    <label className="text-gray-600 font-semibold mb-1 block">Email</label>
    <div className="flex items-center border rounded-lg px-3 py-2">
      <svg className="w-5 h-5 text-blue-800 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6L8.913 9.917C11.462 11.361 12.538 11.361 15.087 9.917L22 6" />
        <path d="M2.01679 13.4761C2.08179 16.5411 2.11479 18.0741 3.24579 19.2091C4.37679 20.3451 5.95079 20.3841 9.09979 20.4631C11.0398 20.5131 12.9618 20.5131 14.9018 20.4631C18.0508 20.3841 19.6248 20.3451 20.7558 19.2091C21.8868 18.0741 21.9198 16.5411 21.9858 13.4761C22.0058 12.4901 22.0058 11.5101 21.9858 10.5241C21.9198 7.45908 21.8868 5.92608 20.7558 4.79108C19.6248 3.65508 18.0508 3.61608 14.9018 3.53708C12.9681 3.48829 11.0335 3.48829 9.09979 3.53708C5.95079 3.61608 4.37679 3.65508 3.24579 4.79108C2.11479 5.92608 2.08179 7.45908 2.01579 10.5241C1.99474 11.508 1.99574 12.4922 2.01679 13.4761Z" />
      </svg>
      <input
        type="email"
        className="w-full focus:outline-none"
        placeholder="example@mail.com"
      />
    </div>
  </div>
</div>


        {/* Submit Button */}
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

const PhoneField = ({ register }) => (
  <div>
    <label className="block text-sm font-medium text-[#204C80] mb-1">
      Phone Number *
    </label>
    <div className="flex items-center border rounded-2xl px-3 py-2 bg-white border-[#204C80]">
      <img
        src="https://flagcdn.com/w40/in.png"
        alt="flag"
        className="w-5 h-5 mr-2"
      />
      <span className="text-sm text-gray-500 mr-2">+1</span>
      <input
        type="tel"
        placeholder="234567890"
        {...register('phone')}
        className="outline-none w-full text-sm"
      />
    </div>
  </div>
);

export default SettingAdmin;

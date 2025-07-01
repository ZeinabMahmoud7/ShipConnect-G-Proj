import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiPackageThin } from "react-icons/pi";

import { CiLock, CiMail, CiLocationOn } from "react-icons/ci";
import { BsEye, BsEyeSlash, BsPerson } from "react-icons/bs";

import profilePic from '../../assets/Avatar.png';

import '../ContactForm/contact-form.css'

function ProfileForm() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = () => {
        // logic here
        reset()
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center ">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-t from-orange-100 to-white p-6 p-8 rounded-2xl shadow-md w-full max-w-4xl">
                    {/* Header Section */}
                    <div className="flex items-center mb-6">
                        <img src={profilePic} alt="profile" className="w-20 h-20 rounded-full mr-4" />
                        <div>
                            <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }} >Bayu Sasmita</h2>
                            <p className="text-sm" style={{ color: "var(--subtext)" }}>Startup Manager</p>
                        </div>
                    </div>

                    {/* Grid Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Startup Name */}
                        <div>
                            <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
                                Startup Name <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
                            </label>
                            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "var(--primary)" }}>
                                <BsPerson style={{ color: "var(--primary)" }} className="w-5 h-5 mr-2" />
                                <input
                                    type="text"
                                    placeholder="@wearBloom.Store"
                                    className="custom-textarea w-full outline-none"
                                    {...register('name', { required: "Name is required" })}
                                />
                            </div>
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
                                Email <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
                            </label>
                            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "var(--primary)" }}>
                                <CiMail style={{ color: "var(--primary)" }} className="w-5 h-5 mr-2" />

                                <input
                                    type="email"
                                    placeholder="info@gmail.com"
                                    className="custom-textarea w-full outline-none"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </div>
                        </div>


                        {/* Phone Number */}
                        <div>
                            <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
                                Phone Number <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
                            </label>
                            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "var(--primary)" }}>
                                <div className="flex items-center pr-2 border-r bg-white" style={{ borderColor: "var(--primary)" }}>
                                    <img src="/flags/eg.png" alt="EG Flag" className="w-5 h-4 object-cover" />
                                    <select className="bg-white text-sm outline-none ml-1">
                                        <option value="+20">+20</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+971">+971</option>
                                    </select>
                                </div>
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="0123456789"
                                    className="custom-textarea w-full outline-none pl-2"
                                    {...register('phone', {
                                        required: "Phone Number is required",
                                        pattern: {
                                            value: /^[0-9]{7,15}$/,
                                            message: "Enter a valid phone number"
                                        }
                                    })}
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
                                Address <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
                            </label>
                            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "var(--primary)" }}>
                                <CiLocationOn style={{ color: "var(--primary)" }} className="w-5 h-5 mr-2" />

                                <input
                                    type="text"
                                    placeholder="cairo, maadi 23, salah salm street"
                                    className="custom-textarea w-full outline-none"
                                    {...register('address', { required: "Address is required" })}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
                                Password <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
                            </label>
                            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white relative" style={{ borderColor: "var(--primary)" }}>
                                <CiLock style={{ color: "var(--primary)" }} className="w-5 h-5 mr-2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="custom-textarea w-full outline-none pr-8"
                                    {...register('password', { required: "Password is required" })}
                                />
                                <div
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute right-3 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </div>
                            </div>
                        </div>

                        {/* Business Category */}
                        <div>
                            <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
                                Business Category <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
                            </label>
                            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "var(--primary)" }}>
                                <PiPackageThin style={{ color: "var(--primary)" }} className="w-5 h-5 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Cloths"
                                    className="custom-textarea w-full outline-none"
                                    {...register('category', { required: "Business Category is required" })}
                                />
                            </div>
                        </div>
                        {/* Description (Full Width) */}
                        <div className="md:col-span-2">
                            <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
                                Description <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
                            </label>
                            <textarea
                                placeholder="Description about your company ..."
                                style={{ borderColor: "var(--primary)" }}
                                className="custom-textarea w-full border rounded-2xl p-3 resize-none h-32 outline-none"
                                {...register('description', { required: "Description is required" })}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-right mt-6">
                        <button type="submit" className="w-xs bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfileForm

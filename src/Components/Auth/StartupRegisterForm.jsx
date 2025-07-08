import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';
import LogoShip from '../../assets/LogoShip.png';
import { useNavigate } from 'react-router-dom';
import { IoAlertCircleSharp } from "react-icons/io5";
import toast from 'react-hot-toast';

export default function StartupRegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ mode: 'onTouched' });
  const password = useWatch({ control, name: 'password' });

  const onSubmit = async (data) => {
    const formData = {
      companyName: data.companyName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      password: data.password,
      confirmPassword: data.confirmPassword,
      address: data.address,
      description: data.description,
      taxId: data.taxId,
      website: data.website,
      acceptTerms: data.acceptTerms,
      businessCategory: data.businessCategory,
    };

    // validation
    if (!formData.acceptTerms) {
      toast.error('You must accept the terms and conditions');
      return;
    }
    console.log('Submitting formData:', formData); 

    try {
      setLoading(true);
      await axios.post('/api/Account/register/startUp', formData);

      // success
      toast.success('Registered successfully');
      navigate('/dashboard');

    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[Object.keys(err.response.data.errors)[0]]?.[0] ||
        'Registration failed. Please try again.';
      // error
      toast.error(errorMsg);
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl p-6 md:p-12 bg-[#7EADE7] rounded-2xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center">
            <img src={LogoShip} alt="ShipConnect" className="h-10 w-10 object-contain" />
            <h3 className="text-white px-2 font-normal">ShipConnect</h3>
          </div>
          <div className="my-5">
            <h2 className="text-2xl font-semibold p-4 text-[#162456]">Sign Up</h2>
            <p className="text-sm text-[#10233E99]">Welcome, you can sign up!</p>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" onSubmit={handleSubmit(onSubmit)}>
          {/* Company Name */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">Startup Name *</label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <div className="mr-2 text-[#204C80]" >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99609 14.25H13.9961C16.89 14.25 19.2461 16.6061 19.2461 19.5C19.2461 20.7439 18.24 21.75 16.9961 21.75H6.99609C5.75224 21.75 4.74609 20.7439 4.74609 19.5C4.74609 16.6061 7.10224 14.25 9.99609 14.25ZM11.9961 3.25C14.34 3.25 16.2461 5.15614 16.2461 7.5C16.2461 9.84386 14.34 11.75 11.9961 11.75C9.65224 11.75 7.74609 9.84386 7.74609 7.5C7.74609 5.15614 9.65224 3.25 11.9961 3.25ZM11.9961 3.75C9.92995 3.75 8.24609 5.43386 8.24609 7.5C8.24609 9.56614 9.92995 11.25 11.9961 11.25C14.0622 11.25 15.7461 9.56614 15.7461 7.5C15.7461 5.43386 14.0622 3.75 11.9961 3.75ZM18.7461 19.499C18.7431 18.2405 18.2415 17.0345 17.3516 16.1445C16.4616 15.2546 15.2556 14.753 13.9971 14.75H9.99512C8.73656 14.753 7.53056 15.2546 6.64062 16.1445C5.75069 17.0345 5.24904 18.2405 5.24609 19.499V19.5C5.24609 20.4661 6.02995 21.25 6.99609 21.25H16.9961C17.9622 21.25 18.7461 20.4661 18.7461 19.5V19.499Z" fill="#255C9C" stroke="#204C80" />
                </svg>
              </div>

              <input {...register('companyName', {
                required: 'Startup name is required',
                minLength: { value: 1, message: 'Must be at least 1 character' },
                maxLength: { value: 100, message: 'Must be at most 100 characters' }
              })} placeholder="Enter your startup Name" className="w-full bg-transparent outline-none text-sm" />
            </div>
            {errors.companyName && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.companyName.message}</p>}

          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">Email *</label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <div className="text-gray-500 mr-2" >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6.5L8.913 10.417C11.462 11.861 12.538 11.861 15.087 10.417L22 6.5" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2.01679 13.976C2.08179 17.041 2.11479 18.574 3.24579 19.709C4.37679 20.845 5.95079 20.884 9.09979 20.963C11.0398 21.013 12.9618 21.013 14.9018 20.963C18.0508 20.884 19.6248 20.845 20.7558 19.709C21.8868 18.574 21.9198 17.041 21.9858 13.976C22.0058 12.99 22.0058 12.01 21.9858 11.024C21.9198 7.95896 21.8868 6.42596 20.7558 5.29096C19.6248 4.15496 18.0508 4.11596 14.9018 4.03696C12.9681 3.98817 11.0335 3.98817 9.09979 4.03696C5.95079 4.11596 4.37679 4.15496 3.24579 5.29096C2.11479 6.42596 2.08179 7.95896 2.01579 11.024C1.99474 12.0078 1.99574 12.9921 2.01679 13.976Z" stroke="#255C9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <input {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email'
                }
              })} type="email" placeholder="Enter Your Email" className="w-full bg-transparent outline-none" />
            </div>
            {errors.email && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.email.message}</p>}

          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">Phone Number *</label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <div className="text-gray-500 mr-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_967_3498)">
                    <g clip-path="url(#clip1_967_3498)">
                      <path d="M9.99992 0C6.03531 0 2.60969 2.30723 0.992188 5.65219H19.0076C17.3902 2.30723 13.9645 0 9.99992 0Z" fill="#FF9811" />
                      <path d="M9.99992 19.9995C13.9645 19.9995 17.3902 17.6923 19.0077 14.3473H0.992188C2.60969 17.6923 6.03531 19.9995 9.99992 19.9995Z" fill="#6DA544" />
                      <path d="M9.99973 13.4783C11.9207 13.4783 13.478 11.9211 13.478 10.0001C13.478 8.07911 11.9207 6.52185 9.99973 6.52185C8.07875 6.52185 6.52148 8.07911 6.52148 10.0001C6.52148 11.9211 8.07875 13.4783 9.99973 13.4783Z" fill="#0052B4" />
                      <path d="M10.0009 7.31775L10.6716 8.83876L12.3241 8.65904L11.3422 10.0003L12.3241 11.3416L10.6716 11.1619L10.0009 12.6829L9.33024 11.1619L7.67773 11.3416L8.65961 10.0003L7.67773 8.65904L9.33024 8.83876L10.0009 7.31775Z" fill="#0052B4" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_967_3498">
                      <path d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_967_3498">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <input {...register('phone', {
                required: 'Phone number is required',
                minLength: { value: 1, message: 'Phone number is too short' }
              })} type="tel" placeholder="Enter Phone Number" className="w-full bg-transparent outline-none" />
            </div>
            {errors.phone && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.phone.message}</p>}

          </div>

          {/* City */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">City *</label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <div className="text-gray-500 mr-2">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 11.5C15.5 11.9596 15.4095 12.4148 15.2336 12.8394C15.0577 13.264 14.7999 13.6499 14.4749 13.9749C14.1499 14.2999 13.764 14.5577 13.3394 14.7336C12.9148 14.9095 12.4596 15 12 15C11.5404 15 11.0852 14.9095 10.6606 14.7336C10.236 14.5577 9.85013 14.2999 9.52513 13.9749C9.20012 13.6499 8.94231 13.264 8.76642 12.8394C8.59053 12.4148 8.5 11.9596 8.5 11.5C8.5 10.5717 8.86875 9.6815 9.52513 9.02513C10.1815 8.36875 11.0717 8 12 8C12.9283 8 13.8185 8.36875 14.4749 9.02513C15.1313 9.6815 15.5 10.5717 15.5 11.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 2.5C16.87 2.5 21 6.533 21 11.426C21 16.396 16.803 19.885 12.927 22.256C12.644 22.4153 12.3247 22.499 12 22.499C11.6753 22.499 11.356 22.4153 11.073 22.256C7.203 19.863 3 16.415 3 11.427C3 6.533 7.13 2.5 12 2.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <input {...register('city', {
                required: 'City is required',
                minLength: { value: 1, message: 'Must be at least 1 character' },
                maxLength: { value: 50, message: 'Must be at most 50 characters' }
              })} type="text" placeholder="Enter City" className="w-full bg-transparent outline-none" />

            </div>
            {errors.city && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.city.message}</p>}

          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">Password *</label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <FaLock className="text-gray-500 mr-2" />
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                  maxLength: { value: 25, message: 'Maximum 25 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\:;'"<>,.?/~`-]).*$/,
                    message: 'Must include uppercase, lowercase, number, and special character'
                  }
                })}
                type="password" placeholder="Enter your Password" className="w-full bg-transparent outline-none"
              /></div>{errors.password && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">Confirm Password *</label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <FaLock className="text-gray-500 mr-2" />
              <input
                {...register('confirmPassword', {
                  required: 'Confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.confirmPassword.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">Address *</label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <div className="text-gray-500 mr-2" ><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 11.5C15.5 11.9596 15.4095 12.4148 15.2336 12.8394C15.0577 13.264 14.7999 13.6499 14.4749 13.9749C14.1499 14.2999 13.764 14.5577 13.3394 14.7336C12.9148 14.9095 12.4596 15 12 15C11.5404 15 11.0852 14.9095 10.6606 14.7336C10.236 14.5577 9.85013 14.2999 9.52513 13.9749C9.20012 13.6499 8.94231 13.264 8.76642 12.8394C8.59053 12.4148 8.5 11.9596 8.5 11.5C8.5 10.5717 8.86875 9.6815 9.52513 9.02513C10.1815 8.36875 11.0717 8 12 8C12.9283 8 13.8185 8.36875 14.4749 9.02513C15.1313 9.6815 15.5 10.5717 15.5 11.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 2.5C16.87 2.5 21 6.533 21 11.426C21 16.396 16.803 19.885 12.927 22.256C12.644 22.4153 12.3247 22.499 12 22.499C11.6753 22.499 11.356 22.4153 11.073 22.256C7.203 19.863 3 16.415 3 11.427C3 6.533 7.13 2.5 12 2.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg></div>
              <input type='text' placeholder="Enter Address"
                className="w-full bg-transparent outline-none"
                {...register('address', {
                  required: 'Address is required',
                  minLength: { value: 1, message: 'Minimum 1 character' },
                  maxLength: { value: 300, message: 'Maximum 300 characters' },
                })} />
            </div>
            {errors.address && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.address.message}</p>}
          </div>

          {/* Tax ID (optional) */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">
              Tax ID <span className='text-xs text-[#fcf1e5] pl-2'> (optional) </span>
            </label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <div className="text-gray-500 mr-2" ><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.644 4.5C18.5083 4.13353 18.2948 3.80087 18.018 3.525C16.984 2.5 15.322 2.5 12 2.5C8.678 2.5 7.015 2.5 5.982 3.525C5.70524 3.80087 5.49165 4.13353 5.356 4.5M5 18.5C5.087 19.92 5.326 20.823 5.982 21.475C7.015 22.5 8.677 22.5 12 22.5C15.323 22.5 16.985 22.5 18.017 21.475C18.674 20.823 18.913 19.919 19 18.5M6 10.5L8 12.5M8 10.5L6 12.5M11 10.5L13 12.5M13 10.5L11 12.5M16 10.5L18 12.5M18 10.5L16 12.5M12 19.5V19.51M17 7.5H7C5.114 7.5 4.172 7.5 3.586 8.086C3 8.672 3 9.614 3 11.5C3 13.386 3 14.328 3.586 14.914C4.172 15.5 5.114 15.5 7 15.5H17C18.886 15.5 19.828 15.5 20.414 14.914C21 14.328 21 13.386 21 11.5C21 9.614 21 8.672 20.414 8.086C19.828 7.5 18.886 7.5 17 7.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              </div>
              <input {...register('taxId', {
                maxLength: { value: 100, message: 'Maximum 100 characters' }
              })}
                placeholder="Enter Tax ID" className="w-full bg-transparent outline-none" />
            </div>
            {errors.taxId && <p className="text-xs text-red-500 flex items-center pr-3 flex"><IoAlertCircleSharp className='text-sm mr-1' />{errors.taxId.message}</p>}
          </div>

          {/* Website*/}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">
              Link Website *
            </label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <div className="text-gray-500 mr-2" ><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 17.5H17C18.3261 17.5 19.5979 16.9732 20.5355 16.0355C21.4732 15.0979 22 13.8261 22 12.5C22 11.1739 21.4732 9.90215 20.5355 8.96447C19.5979 8.02678 18.3261 7.5 17 7.5H13.5M10.5 17.5H7C5.67392 17.5 4.40215 16.9732 3.46447 16.0355C2.52678 15.0979 2 13.8261 2 12.5C2 11.1739 2.52678 9.90215 3.46447 8.96447C4.40215 8.02678 5.67392 7.5 7 7.5H10.5M9 12.5H15" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg></div>
              <input {...register('website', {
                required: 'link is required',
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/,
                  message: 'Enter a valid URL'
                }
              })} placeholder="Website Link" className="w-full bg-transparent outline-none" />
            </div>
            {errors.website && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.website.message}</p>}
          </div>

          {/* Business Category */}
          <div>
            <label className="block text-sm mb-1 text-[#102C57]">Business Category *</label>
            <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
              <div className="text-gray-500 mr-2" ><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99609 14.25H13.9961C16.89 14.25 19.2461 16.6061 19.2461 19.5C19.2461 20.7439 18.24 21.75 16.9961 21.75H6.99609C5.75224 21.75 4.74609 20.7439 4.74609 19.5C4.74609 16.6061 7.10224 14.25 9.99609 14.25ZM11.9961 3.25C14.34 3.25 16.2461 5.15614 16.2461 7.5C16.2461 9.84386 14.34 11.75 11.9961 11.75C9.65224 11.75 7.74609 9.84386 7.74609 7.5C7.74609 5.15614 9.65224 3.25 11.9961 3.25ZM11.9961 3.75C9.92995 3.75 8.24609 5.43386 8.24609 7.5C8.24609 9.56614 9.92995 11.25 11.9961 11.25C14.0622 11.25 15.7461 9.56614 15.7461 7.5C15.7461 5.43386 14.0622 3.75 11.9961 3.75ZM18.7461 19.499C18.7431 18.2405 18.2415 17.0345 17.3516 16.1445C16.4616 15.2546 15.2556 14.753 13.9971 14.75H9.99512C8.73656 14.753 7.53056 15.2546 6.64062 16.1445C5.75069 17.0345 5.24904 18.2405 5.24609 19.499V19.5C5.24609 20.4661 6.02995 21.25 6.99609 21.25H16.9961C17.9622 21.25 18.7461 20.4661 18.7461 19.5V19.499Z" fill="#255C9C" stroke="#204C80" />
              </svg>
              </div>
              <select {...register('businessCategory', {
                required: 'Please select a business category',
                minLength: { value: 1, message: 'Invalid category' },
                maxLength: { value: 100, message: 'Too long' }
              })} className="w-full bg-transparent outline-none">
                <option value="" disabled>Select Category</option>
                <option value="Logistics">Logistics</option>
                <option value="eCommerce">eCommerce</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>
            {errors.businessCategory && <p className="text-xs text-red-500 flex items-center pr-3 flex"><IoAlertCircleSharp className='text-sm mr-1' />{errors.businessCategory.message}</p>}

          </div>

          {/* Description (optional) */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 text-[#102C57] flex items-center">
              Description<span className='text-xs text-[#fcf1e5] pl-2'> (optional) </span>
            </label>
            <textarea {...register('description', {
              maxLength: { value: 500, message: 'Maximum 500 characters' }
            })}
              placeholder="Describe your company..." rows="4" className="w-full border bg-white rounded-lg px-3 py-2 outline-none resize-none"></textarea>
            {errors.description && <p className="text-xs text-red-500 flex items-center pr-3"><IoAlertCircleSharp className='text-sm mr-1' />{errors.description.message}</p>}
          </div>

          {/* Terms */}
          <div>
            <label className="cursor-pointer col-span-1 md:col-span-2 flex items-center gap-2 text-[#1447E6]">
              <input
                type="checkbox"
                {...register('acceptTerms', {
                  required: 'You must accept the terms'
                })}
                className="accent-[#1447E6]"
              />
              <span className="text-sm">
                I Accept all <a href="#" className="hover:text-[#204C80] underline">terms and Conditions</a>
              </span>
            </label>

            {errors.acceptTerms && (
              <p className="text-xs text-red-500 pt-2">{errors.acceptTerms.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg transition-colors duration-300 ${loading ? 'bg-[#204C80]/70 cursor-not-allowed' : 'bg-[#204C80] hover:bg-[#163b61]'
                }`}
            >
              {loading ? 'Registering...' : 'Register as Startup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

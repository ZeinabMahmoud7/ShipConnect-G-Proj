import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import LoginIllustration from '../../assets/Login.png';
import LogoShip from '../../assets/LogoShip.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // assign role
  const handleRegisterPath = (path, role) => {
    navigate(path, { state: { role } });
    setShowModal(false);
  };

  // submit data
  const onSubmit = async (data) => {
    setError('');
    try {
      setLoading(true);
      const res = await axios.post('/api/Account/Login', {
        email: data.email,
        password: data.password,
        rememberMe: true,
        
      });
      // success
      console.log("LOGIN RESPONSE:", res.data);
      localStorage.setItem("token", res.data.data); 
      localStorage.setItem("email", email);
      toast.success('Registered successfully');
      login(res.data);
      navigate('/dashboard');

    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[Object.keys(err.response.data.errors)[0]]?.[0] || 'Login failed. Please try again.';
      // error handler
      toast.error(errorMsg);
      setError(err.response?.data?.message || 'Login failed');
      console.log(error)

    } finally {
      setLoading(false);
    }
  };

  // display res, error msg
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Left Side Illustration */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-10">
        <img src={LoginIllustration} alt="Login Illustration" className="w-full max-w-md" />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 md:px-10 m-2 p-9 bg-[#7EADE7] rounded-2xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center px-4">
            <img src={LogoShip} alt="ShipConnect" className="h-10 w-10 object-contain" />
            <h3 className="text-white px-2 font-normal">ShipConnect</h3>
          </div>
          <div className="my-5">
            <h2 className="text-2xl font-semibold p-4">Sign In</h2>
            <p className="text-sm text-[#10233E99]">Welcome, you can sign in!</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <Field label="Email" icon=
            {
              <svg className='me-2' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99609 14.25H13.9961C16.89 14.25 19.2461 16.6061 19.2461 19.5C19.2461 20.7439 18.24 21.75 16.9961 21.75H6.99609C5.75224 21.75 4.74609 20.7439 4.74609 19.5C4.74609 16.6061 7.10224 14.25 9.99609 14.25ZM11.9961 3.25C14.34 3.25 16.2461 5.15614 16.2461 7.5C16.2461 9.84386 14.34 11.75 11.9961 11.75C9.65224 11.75 7.74609 9.84386 7.74609 7.5C7.74609 5.15614 9.65224 3.25 11.9961 3.25ZM11.9961 3.75C9.92995 3.75 8.24609 5.43386 8.24609 7.5C8.24609 9.56614 9.92995 11.25 11.9961 11.25C14.0622 11.25 15.7461 9.56614 15.7461 7.5C15.7461 5.43386 14.0622 3.75 11.9961 3.75ZM18.7461 19.499C18.7431 18.2405 18.2415 17.0345 17.3516 16.1445C16.4616 15.2546 15.2556 14.753 13.9971 14.75H9.99512C8.73656 14.753 7.53056 15.2546 6.64062 16.1445C5.75069 17.0345 5.24904 18.2405 5.24609 19.499V19.5C5.24609 20.4661 6.02995 21.25 6.99609 21.25H16.9961C17.9622 21.25 18.7461 20.4661 18.7461 19.5V19.499Z" fill="#255C9C" stroke="#204C80" />
              </svg>
            }
            placeholder="Enter your email" name="email" type="email" register={register} />

          {/* Password Field */}
          <PasswordField label="Password" placeholder="Enter your password" name="password" register={register} />

          {/* Remember checkbox + forget password */}
          <div className="flex justify-between items-center text-sm text-[#162456]">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#0A75C3]" />
              Remember me
            </label>
            <Link to="/forgot-password" className="hover:underline text-[#1447E6]">Forget Password?</Link>
          </div>

          {/* Submit btn */}
          <button disabled={loading}
            type="submit" className={`w-full text-white py-2 rounded-lg transition-colors duration-300 ${loading ? 'bg-[#204C80]/70 cursor-not-allowed' : 'bg-[#204C80] hover:bg-[#163b61]'
              }`}>
            {loading ? 'Logging...' : 'Login'}
          </button>
        </form>

        {/* Sign with Google */}
        <div>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-[#D1D5DC]" />
            <span className="px-3 text-sm text-[#808798]">Or Sign In With</span>
            <div className="flex-grow h-px bg-[#D1D5DC]" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
        </div>

        {/* Register */}
        <p className="text-sm text-center mt-6">
          Didn’t have an account?
          <button
            onClick={() => setShowModal(true)}
            className="text-[#1447E6] font-medium mx-1 hover:underline"
          >
            Register
          </button>
        </p>
      </div>

      {/* Register As Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4 text-[#10233E]">Register As</h3>

            <button
              onClick={() => handleRegisterPath('/register/startup', 'StartUp')}
              className="flex items-center justify-center w-full py-2 mb-3 bg-[#255C9C] text-white rounded-full hover:bg-[#163b61] transition"
            >
              <svg className="w-4 h-4 mr-2" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C7.031 2 3 6.031 3 11c0 1.75.57 3.36 1.53 4.68L3 22l6.32-1.53C10.64 20.43 12.25 21 14 21c4.97 0 9-4.03 9-9s-4.03-10-9-10z" />
              </svg>
              As Start Up
            </button>

            <button
              onClick={() => handleRegisterPath('/register/company', 'ShippingCompany')}
              className="flex items-center justify-center w-full py-2 border border-[#255C9C] text-[#255C9C] rounded-full hover:bg-[#f1f5ff] transition"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 15C18.5 15.663 18.2366 16.2989 17.7678 16.7678C17.2989 17.2366 16.663 17.5 16 17.5C15.337 17.5 14.7011 17.2366 14.2322 16.7678C13.7634 16.2989 13.5 15.663 13.5 15C13.5 14.337 13.7634 13.7011 14.2322 13.2322C14.7011 12.7634 15.337 12.5 16 12.5C16.663 12.5 17.2989 12.7634 17.7678 13.2322C18.2366 13.7011 18.5 14.337 18.5 15ZM8.5 15C8.5 15.663 8.23661 16.2989 7.76777 16.7678C7.29893 17.2366 6.66304 17.5 6 17.5C5.33696 17.5 4.70107 17.2366 4.23223 16.7678C3.76339 16.2989 3.5 15.663 3.5 15C3.5 14.337 3.76339 13.7011 4.23223 13.2322C4.70107 12.7634 5.33696 12.5 6 12.5C6.66304 12.5 7.29893 12.7634 7.76777 13.2322C8.23661 13.7011 8.5 14.337 8.5 15Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5 15H8.5M18.5 15H19.263C19.483 15 19.593 15 19.685 14.988C20.016 14.9468 20.3239 14.7964 20.5599 14.5606C20.7959 14.3248 20.9465 14.017 20.988 13.686C21 13.593 21 13.483 21 13.263V10.5C21 8.77609 20.3152 7.12279 19.0962 5.90381C17.8772 4.68482 16.2239 4 14.5 4M14 13V4.5C14 3.086 14 2.379 13.56 1.94C13.122 1.5 12.415 1.5 11 1.5H4C2.586 1.5 1.879 1.5 1.44 1.94C1 2.378 1 3.085 1 4.5V12.5C1 13.435 1 13.902 1.201 14.25C1.33265 14.478 1.52199 14.6674 1.75 14.799C2.098 15 2.565 15 3.5 15" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              As Shipping Company
            </button>

            <button onClick={() => setShowModal(false)} className="mt-4 text-sm text-[#1447E6] hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const Field = ({ label, icon, placeholder, type = 'text', name, register }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-[#204C80]">{label} *</label>
    <div className="flex items-center border border-[#204C80] rounded-xl bg-white px-3 py-2">
      {icon && <span className="mr-1 text-[#204C80]">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="outline-none w-full text-sm"
      />
    </div>
  </div>
);

const PasswordField = (props) => <Field {...props} type="password" />;
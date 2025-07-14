import React, { useState } from 'react';
import LoginIllustration from '../../assets/Signup.png';
import LogoShip from '../../assets/LogoShip.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');

  const [step, setStep] = useState(1);

  const [code, setCode] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  // Step 1: send email
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ResetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success('Verification code sent!');
        setStep(2);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to send code');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    }
    setLoading(false);
  };
  // Step 2: verify code
  const handleVerifyCode = async () => {
    if (!code) {
      toast.error('Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ResetPassword/verifyCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        toast.success('Code verified');
        setStep(3);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Invalid verification code');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    }
    setLoading(false);
  };
  // Step 3: reset password
  const handleResetPassword = async () => {
    // validation
    if (!NewPassword || !ConfirmPassword) {
      toast.error('Both password fields are required');
      return;
    }
    if (NewPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordPattern.test(NewPassword)) {
      toast.error('Password must contain uppercase, lowercase, number, and special character');
      return;
    }
    if (NewPassword !== ConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // reset handle
    setLoading(true);
    try {
      const res = await fetch('/api/ResetPassword/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, NewPassword, ConfirmPassword }),
      });

      if (res.ok) {
        toast.success('Password reset successfully');
        navigate('/login');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Left Side Illustration */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-10">
        <img src={LoginIllustration} alt="Forgot Password Illustration" className="w-full max-w-md" />
      </div>

      {/* Right Side Form */}
      <div className="h-[550px] w-full md:w-1/2 md:px-6 mx-5 bg-[#7EADE7] rounded-2xl shadow-lg flex items-center justify-center">
        <div className="w-full mx-4">
          <div className="text-center mb-6 text-3xl">
            {/* Logo */}
            <div className="flex items-center justify-center px-4">
              <img src={LogoShip} alt="ShipConnect" className="h-20 w-20 object-contain" />
              <h3 className="text-white px-2 font-normal">ShipConnect</h3>
            </div>
            {/* Form Header for each step */}
            <div className="my-5">
              <h2 className="text-2xl font-semibold p-4 text-[#162456]">
                {step === 1 && 'Enter Your Email'}
                {step === 2 && 'Verify Code'}
                {step === 3 && 'Reset Password'}
              </h2>
              <p className="text-sm text-[#10233E99]">
                {step === 1 && 'Enter your email and we will send a code.'}
                {step === 2 && 'Enter the code sent to your email.'}
                {step === 3 && 'Enter your new password.'}
              </p>
            </div>
          </div>
          {/* "Send Email" Form Body */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <Field
                label="Email"
                icon={
                  <svg className='me-2' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99609 14.25H13.9961C16.89 14.25 19.2461 16.6061 19.2461 19.5C19.2461 20.7439 18.24 21.75 16.9961 21.75H6.99609C5.75224 21.75 4.74609 20.7439 4.74609 19.5C4.74609 16.6061 7.10224 14.25 9.99609 14.25ZM11.9961 3.25C14.34 3.25 16.2461 5.15614 16.2461 7.5C16.2461 9.84386 14.34 11.75 11.9961 11.75C9.65224 11.75 7.74609 9.84386 7.74609 7.5C7.74609 5.15614 9.65224 3.25 11.9961 3.25ZM11.9961 3.75C9.92995 3.75 8.24609 5.43386 8.24609 7.5C8.24609 9.56614 9.92995 11.25 11.9961 11.25C14.0622 11.25 15.7461 9.56614 15.7461 7.5C15.7461 5.43386 14.0622 3.75 11.9961 3.75ZM18.7461 19.499C18.7431 18.2405 18.2415 17.0345 17.3516 16.1445C16.4616 15.2546 15.2556 14.753 13.9971 14.75H9.99512C8.73656 14.753 7.53056 15.2546 6.64062 16.1445C5.75069 17.0345 5.24904 18.2405 5.24609 19.499V19.5C5.24609 20.4661 6.02995 21.25 6.99609 21.25H16.9961C17.9622 21.25 18.7461 20.4661 18.7461 19.5V19.499Z" fill="#255C9C" stroke="#204C80" />
                  </svg>
                }
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#255C9C] text-white py-2 rounded-2xl hover:bg-[#163b61]"
              >
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </form>
          )}
          {/* "verify code" Form Body */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-[#204C80]">Verification Code *</label>
                <div className="flex items-center border text-[#1CA651] rounded-xl bg-white px-3 py-2" style={{ borderColor: '#21CF61' }}>
                  <span className="mr-1 text-[#1CA651]">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18.644 4.5C18.5083 4.13353 18.2948 3.80087 18.018 3.525C16.984 2.5 15.322 2.5 12 2.5C8.678 2.5 7.015 2.5 5.982 3.525C5.70524 3.80087 5.49165 4.13353 5.356 4.5M5 18.5C5.087 19.92 5.326 20.823 5.982 21.475C7.015 22.5 8.677 22.5 12 22.5C15.323 22.5 16.985 22.5 18.017 21.475C18.674 20.823 18.913 19.919 19 18.5M6 10.5L8 12.5M8 10.5L6 12.5M11 10.5L13 12.5M13 10.5L11 12.5M16 10.5L18 12.5M18 10.5L16 12.5M12 19.5V19.51M17 7.5H7C5.114 7.5 4.172 7.5 3.586 8.086C3 8.672 3 9.614 3 11.5C3 13.386 3 14.328 3.586 14.914C4.172 15.5 5.114 15.5 7 15.5H17C18.886 15.5 19.828 15.5 20.414 14.914C21 14.328 21 13.386 21 11.5C21 9.614 21 8.672 20.414 8.086C19.828 7.5 18.886 7.5 17 7.5Z"
                        stroke="#21CF61"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Verification Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="outline-none w-full text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={handleVerifyCode}
                className="w-full py-2 bg-[#255C9C] text-white rounded-2xl"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          )}
          {/* "reset password" Form Body */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-[#204C80]">Password *</label>
                <div className="flex items-center border border-[#255C9C] rounded-xl bg-white px-3 py-2">
                  <span className="mr-1">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18.644 4.5C18.5083 4.13353 18.2948 3.80087 18.018 3.525C16.984 2.5 15.322 2.5 12 2.5C8.678 2.5 7.015 2.5 5.982 3.525C5.70524 3.80087 5.49165 4.13353 5.356 4.5M5 18.5C5.087 19.92 5.326 20.823 5.982 21.475C7.015 22.5 8.677 22.5 12 22.5C15.323 22.5 16.985 22.5 18.017 21.475C18.674 20.823 18.913 19.919 19 18.5M6 10.5L8 12.5M8 10.5L6 12.5M11 10.5L13 12.5M13 10.5L11 12.5M16 10.5L18 12.5M18 10.5L16 12.5M12 19.5V19.51M17 7.5H7C5.114 7.5 4.172 7.5 3.586 8.086C3 8.672 3 9.614 3 11.5C3 13.386 3 14.328 3.586 14.914C4.172 15.5 5.114 15.5 7 15.5H17C18.886 15.5 19.828 15.5 20.414 14.914C21 14.328 21 13.386 21 11.5C21 9.614 21 8.672 20.414 8.086C19.828 7.5 18.886 7.5 17 7.5Z"
                        stroke="#204C80"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="outline-none w-full text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-[#204C80]">Confirm Password *</label>
                <div className="flex items-center border border-[#255C9C] rounded-xl bg-white px-3 py-2">
                  <span className="mr-1">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18.644 4.5C18.5083 4.13353 18.2948 3.80087 18.018 3.525C16.984 2.5 15.322 2.5 12 2.5C8.678 2.5 7.015 2.5 5.982 3.525C5.70524 3.80087 5.49165 4.13353 5.356 4.5M5 18.5C5.087 19.92 5.326 20.823 5.982 21.475C7.015 22.5 8.677 22.5 12 22.5C15.323 22.5 16.985 22.5 18.017 21.475C18.674 20.823 18.913 19.919 19 18.5M6 10.5L8 12.5M8 10.5L6 12.5M11 10.5L13 12.5M13 10.5L11 12.5M16 10.5L18 12.5M18 10.5L16 12.5M12 19.5V19.51M17 7.5H7C5.114 7.5 4.172 7.5 3.586 8.086C3 8.672 3 9.614 3 11.5C3 13.386 3 14.328 3.586 14.914C4.172 15.5 5.114 15.5 7 15.5H17C18.886 15.5 19.828 15.5 20.414 14.914C21 14.328 21 13.386 21 11.5C21 9.614 21 8.672 20.414 8.086C19.828 7.5 18.886 7.5 17 7.5Z"
                        stroke="#204C80"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="Confirm your Password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="outline-none w-full text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={handleResetPassword}
                className="w-full py-2 bg-[#255C9C] text-white rounded-2xl"
              >
                {loading ? 'Resetting...' : 'Confirm'}
              </button>
            </div>

          )}

          <div className="text-center pt-6">
            <Link to="/login" className="text-sm text-white underline hover:text-[#10233E]">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, icon, placeholder, type = 'text', value, onChange }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-[#204C80]">{label} *</label>
    <div className="flex items-center border border-[#204C80] rounded-xl bg-white px-3 py-2">
      <span className="mr-1 text-[#204C80]">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="outline-none w-full text-sm"
        required
      />
    </div>
  </div>
);

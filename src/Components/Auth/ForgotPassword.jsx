import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import LoginIllustration from '../../assets/Signup.png';
import LogoShip from '../../assets/LogoShip.png';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Email is required');
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
        setStep(2);
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to send code');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setError('');
    if (!code) {
      setError('Code is required');
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
        setStep(3);
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid code');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setError('');
    if (!password || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/ResetPassword/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        navigate('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to reset password');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-10">
        <img src={LoginIllustration} alt="Forgot Password Illustration" className="w-full max-w-md" />
      </div>

      <div className="h-[600px] w-full md:w-1/2 md:px-16 mr-12 bg-[#7EADE7] rounded-2xl shadow-lg flex items-center justify-center">
        <div className="w-full px-4">
          <div className="text-center mb-6 text-3xl">
            <div className="flex items-center justify-center px-4">
              <img src={LogoShip} alt="ShipConnect" className="h-20 w-20 object-contain" />
              <h3 className="text-white px-2 font-normal">ShipConnect</h3>
            </div>
            <div className="my-5">
              <h2 className="text-2xl font-semibold p-4">
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

          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

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

          {step === 2 && (
            <div className="space-y-4">
              <Field
                label="Verification Code"
                icon={<FaLock />}
                placeholder="Enter Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="button"
                disabled={loading}
                onClick={handleVerifyCode}
                className="w-full py-2 bg-blue-700 text-white rounded-2xl hover:bg-blue-800"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <PasswordInput
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                disabled={loading}
                onClick={handleResetPassword}
                className="w-full py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700"
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

const PasswordInput = ({ placeholder, value, onChange }) => (
  <div className="relative">
    <FaLock className="absolute left-3 top-3.5 text-gray-400" />
    <input
      type="password"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="pl-10 pr-4 py-2 w-full border rounded-2xl outline-none focus:ring-2 ring-blue-400"
      required
    />
  </div>
);

// validation 
// test functionality
// check design
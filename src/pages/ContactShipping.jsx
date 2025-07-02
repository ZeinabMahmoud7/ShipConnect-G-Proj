import React from 'react';
import { useForm } from 'react-hook-form';

function ContactShipping() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch('https://example.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert('Message sent!');
      console.log('Message Sent', data);
      reset();
    } else {
      alert('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#E4E6EC] border border-1 border-[#CACED8] p-8 rounded-2xl shadow-md w-full max-w-xl space-y-6"
      >
        <h2 className="text-center text-[28px] font-normal text-[#255C9C]">
          We’d Love to Hear From You!
        </h2>

        {/* Full Name */}
        <div>
          <label className="block mb-1 text-[16px] font-bold text-[#204C80]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-[#204C80] rounded-xl bg-white px-3 py-2">
            <svg className='me-2' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99609 14.25H13.9961C16.89 14.25 19.2461 16.6061 19.2461 19.5C19.2461 20.7439 18.24 21.75 16.9961 21.75H6.99609C5.75224 21.75 4.74609 20.7439 4.74609 19.5C4.74609 16.6061 7.10224 14.25 9.99609 14.25ZM11.9961 3.25C14.34 3.25 16.2461 5.15614 16.2461 7.5C16.2461 9.84386 14.34 11.75 11.9961 11.75C9.65224 11.75 7.74609 9.84386 7.74609 7.5C7.74609 5.15614 9.65224 3.25 11.9961 3.25ZM11.9961 3.75C9.92995 3.75 8.24609 5.43386 8.24609 7.5C8.24609 9.56614 9.92995 11.25 11.9961 11.25C14.0622 11.25 15.7461 9.56614 15.7461 7.5C15.7461 5.43386 14.0622 3.75 11.9961 3.75ZM18.7461 19.499C18.7431 18.2405 18.2415 17.0345 17.3516 16.1445C16.4616 15.2546 15.2556 14.753 13.9971 14.75H9.99512C8.73656 14.753 7.53056 15.2546 6.64062 16.1445C5.75069 17.0345 5.24904 18.2405 5.24609 19.499V19.5C5.24609 20.4661 6.02995 21.25 6.99609 21.25H16.9961C17.9622 21.25 18.7461 20.4661 18.7461 19.5V19.499Z" fill="#255C9C" stroke="#204C80"/>
</svg>

            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full text-sm outline-none"
              {...register('name', { required: 'Name is required' })}
            />
          </div>
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#204C80]">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-[#204C80] rounded-xl bg-white px-3 py-2">
          <svg className='me-2' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 6.5L8.913 10.417C11.462 11.861 12.538 11.861 15.087 10.417L22 6.5" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.01679 13.976C2.08179 17.041 2.11479 18.574 3.24579 19.709C4.37679 20.845 5.95079 20.884 9.09979 20.963C11.0398 21.013 12.9618 21.013 14.9018 20.963C18.0508 20.884 19.6248 20.845 20.7558 19.709C21.8868 18.574 21.9198 17.041 21.9858 13.976C22.0058 12.99 22.0058 12.01 21.9858 11.024C21.9198 7.95902 21.8868 6.42602 20.7558 5.29102C19.6248 4.15502 18.0508 4.11602 14.9018 4.03702C12.9681 3.98823 11.0335 3.98823 9.09979 4.03702C5.95079 4.11602 4.37679 4.15502 3.24579 5.29102C2.11479 6.42602 2.08179 7.95902 2.01579 11.024C1.99474 12.0079 1.99574 12.9921 2.01679 13.976Z" stroke="#255C9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full text-sm outline-none"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address',
                },
              })}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#204C80]">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter Your Message..."
            className="w-full border border-[#204C80] rounded-xl p-3 text-sm resize-none h-40 outline-none"
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#204C80] text-white font-medium py-2 px-6 rounded-full hover:bg-[#173a63] transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactShipping;

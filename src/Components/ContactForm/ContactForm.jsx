import React from 'react'
import { useForm } from 'react-hook-form'
import '../ContactForm/contact-form.css'

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    const res = await fetch('https://example.com/contact', { // for test
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      alert('Message sent!')
      console.log("Message Sent", data)
    } else {
      alert('Failed to send message')
    }

    reset()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: "var(--secondary-light)" }}
        className="p-8 rounded-lg shadow-md w-full max-w-lg space-y-6"
      >
        <h2 style={{ color: "var(--primary)" }} className="text-2xl font-normal text-center">
          We’d Love to Hear From You!
        </h2>

        {/* Full Name */}
        <div>
          <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
            Full Name <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
          </label>
          <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "var(--primary)" }}>
            <svg style={{ color: "var(--primary)" }} className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.221.802 5.879 2.121M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="custom-textarea w-full outline-none"
              {...register('name', { required: "Name is required" })}
            />
          </div>
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
            Email <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
          </label>
          <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "var(--primary)" }}>
            <svg style={{ color: "var(--primary)" }} className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 01-8 0m8 0a4 4 0 00-8 0M12 16v.01M12 20h.01M12 4v.01" />
            </svg>
            <input
              type="email"
              placeholder="Enter Your Email"
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
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-semibold text-base" style={{ color: "var(--hover)" }}>
            Message <span style={{ color: "var(--requied)" }} className="font-normal">*</span>
          </label>
          <textarea
            placeholder="Enter Your Message..."
            style={{ borderColor: "var(--primary)" }}
            className="custom-textarea w-full border rounded-2xl p-3 resize-none h-32 outline-none"
            {...register('message', { required: "Message is required" })}
          />
          {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn-primary w-xs">
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm

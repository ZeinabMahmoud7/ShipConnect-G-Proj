import React from 'react'
import { useForm } from 'react-hook-form'
import profilePic from '../../assets/Avatar.png';

function ProfileForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-6xl bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 md:p-10 shadow"
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <img src={profilePic} alt="profile" className="w-24 h-24 rounded-full object-cover mr-6" />
          <div>
            <h2 className="text-2xl font-bold text-[#10233E]">John Smith</h2>
            <p className="text-sm text-[#6B7280]">Shipping company Manager</p>
            <button
              type="button"
              className="mt-2 bg-[#F9751C] px-5 py-3 hover:bg-[#e5670f] text-white  rounded-[20px] text-sm font-semibold"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <Field label="Shipping company Name" icon={<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99609 14.25H13.9961C16.89 14.25 19.2461 16.6061 19.2461 19.5C19.2461 20.7439 18.24 21.75 16.9961 21.75H6.99609C5.75224 21.75 4.74609 20.7439 4.74609 19.5C4.74609 16.6061 7.10224 14.25 9.99609 14.25ZM11.9961 3.25C14.34 3.25 16.2461 5.15614 16.2461 7.5C16.2461 9.84386 14.34 11.75 11.9961 11.75C9.65224 11.75 7.74609 9.84386 7.74609 7.5C7.74609 5.15614 9.65224 3.25 11.9961 3.25ZM11.9961 3.75C9.92995 3.75 8.24609 5.43386 8.24609 7.5C8.24609 9.56614 9.92995 11.25 11.9961 11.25C14.0622 11.25 15.7461 9.56614 15.7461 7.5C15.7461 5.43386 14.0622 3.75 11.9961 3.75ZM18.7461 19.499C18.7431 18.2405 18.2415 17.0345 17.3516 16.1445C16.4616 15.2546 15.2556 14.753 13.9971 14.75H9.99512C8.73656 14.753 7.53056 15.2546 6.64062 16.1445C5.75069 17.0345 5.24904 18.2405 5.24609 19.499V19.5C5.24609 20.4661 6.02995 21.25 6.99609 21.25H16.9961C17.9622 21.25 18.7461 20.4661 18.7461 19.5V19.499Z" fill="#255C9C" stroke="#204C80" />
          </svg>

          } placeholder="Swift" name="company" register={register} />

          {/* Address */}
          <Field label="Address" icon={<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 11.5C15.5 11.9596 15.4095 12.4148 15.2336 12.8394C15.0577 13.264 14.7999 13.6499 14.4749 13.9749C14.1499 14.2999 13.764 14.5577 13.3394 14.7336C12.9148 14.9095 12.4596 15 12 15C11.5404 15 11.0852 14.9095 10.6606 14.7336C10.236 14.5577 9.85013 14.2999 9.52513 13.9749C9.20012 13.6499 8.94231 13.264 8.76642 12.8394C8.59053 12.4148 8.5 11.9596 8.5 11.5C8.5 10.5717 8.86875 9.6815 9.52513 9.02513C10.1815 8.36875 11.0717 8 12 8C12.9283 8 13.8185 8.36875 14.4749 9.02513C15.1313 9.6815 15.5 10.5717 15.5 11.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 2.5C16.87 2.5 21 6.533 21 11.426C21 16.396 16.803 19.885 12.927 22.256C12.644 22.4153 12.3247 22.499 12 22.499C11.6753 22.499 11.356 22.4153 11.073 22.256C7.203 19.863 3 16.415 3 11.427C3 6.533 7.13 2.5 12 2.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } placeholder="Cairo, maadi, 34 salah street" name="address" register={register} />

          {/* Email */}
          <Field label="Email" icon={<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6.5L8.913 10.417C11.462 11.861 12.538 11.861 15.087 10.417L22 6.5" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.01679 13.976C2.08179 17.041 2.11479 18.574 3.24579 19.709C4.37679 20.845 5.95079 20.884 9.09979 20.963C11.0398 21.013 12.9618 21.013 14.9018 20.963C18.0508 20.884 19.6248 20.845 20.7558 19.709C21.8868 18.574 21.9198 17.041 21.9858 13.976C22.0058 12.99 22.0058 12.01 21.9858 11.024C21.9198 7.95896 21.8868 6.42596 20.7558 5.29096C19.6248 4.15496 18.0508 4.11596 14.9018 4.03696C12.9681 3.98817 11.0335 3.98817 9.09979 4.03696C5.95079 4.11596 4.37679 4.15496 3.24579 5.29096C2.11479 6.42596 2.08179 7.95896 2.01579 11.024C1.99474 12.0078 1.99574 12.9921 2.01679 13.976Z" stroke="#255C9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } placeholder="info@gmail.com" type="email" name="email" register={register} />

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#204C80]">Phone Number *</label>
            <div className="flex border rounded-2xl px-3 py-2 items-center bg-white" style={{ borderColor: "#204C80" }}>
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

              <span className="text-sm text-gray-500 mr-2">+1</span>
              <input
                type="tel"
                placeholder="234567890"
                {...register("phone")}
                className="outline-none w-full text-sm"
              />
            </div>
          </div>

          {/* Shipping Scope */}
          <SelectField label="Shipping Scop" name="scope" options={["By Sea", "By Land", "By Air"]} icon={<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5.5H18M10 10.5L14.5 15M5 11.5V18.5" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.444 11.388C8.89835 11.388 10.888 9.39835 10.888 6.944C10.888 4.48965 8.89835 2.5 6.444 2.5C3.98965 2.5 2 4.48965 2 6.944C2 9.39835 3.98965 11.388 6.444 11.388Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5 22.5C6.10457 22.5 7 21.6046 7 20.5C7 19.3954 6.10457 18.5 5 18.5C3.89543 18.5 3 19.3954 3 20.5C3 21.6046 3.89543 22.5 5 22.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16 18.5C17.1046 18.5 18 17.6046 18 16.5C18 15.3954 17.1046 14.5 16 14.5C14.8954 14.5 14 15.3954 14 16.5C14 17.6046 14.8954 18.5 16 18.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20 7.5C21.1046 7.5 22 6.60457 22 5.5C22 4.39543 21.1046 3.5 20 3.5C18.8954 3.5 18 4.39543 18 5.5C18 6.60457 18.8954 7.5 20 7.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } register={register} />

          {/* Shipping Services Type */}
          <SelectField label="Shipping Services Type" name="serviceType" options={["International", "Domestic"]} icon={<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 15C18.5 15.663 18.2366 16.2989 17.7678 16.7678C17.2989 17.2366 16.663 17.5 16 17.5C15.337 17.5 14.7011 17.2366 14.2322 16.7678C13.7634 16.2989 13.5 15.663 13.5 15C13.5 14.337 13.7634 13.7011 14.2322 13.2322C14.7011 12.7634 15.337 12.5 16 12.5C16.663 12.5 17.2989 12.7634 17.7678 13.2322C18.2366 13.7011 18.5 14.337 18.5 15ZM8.5 15C8.5 15.663 8.23661 16.2989 7.76777 16.7678C7.29893 17.2366 6.66304 17.5 6 17.5C5.33696 17.5 4.70107 17.2366 4.23223 16.7678C3.76339 16.2989 3.5 15.663 3.5 15C3.5 14.337 3.76339 13.7011 4.23223 13.2322C4.70107 12.7634 5.33696 12.5 6 12.5C6.66304 12.5 7.29893 12.7634 7.76777 13.2322C8.23661 13.7011 8.5 14.337 8.5 15Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.5 15H8.5M18.5 15H19.263C19.483 15 19.593 15 19.685 14.988C20.016 14.9468 20.3239 14.7964 20.5599 14.5606C20.7959 14.3248 20.9465 14.017 20.988 13.686C21 13.593 21 13.483 21 13.263V10.5C21 8.77609 20.3152 7.12279 19.0962 5.90381C17.8772 4.68482 16.2239 4 14.5 4M14 13V4.5C14 3.086 14 2.379 13.56 1.94C13.122 1.5 12.415 1.5 11 1.5H4C2.586 1.5 1.879 1.5 1.44 1.94C1 2.378 1 3.085 1 4.5V12.5C1 13.435 1 13.902 1.201 14.25C1.33265 14.478 1.52199 14.6674 1.75 14.799C2.098 15 2.565 15 3.5 15" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } register={register} />

          {/* Link Website */}
          <Field label="Link Website" icon={<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 17.5H17C18.3261 17.5 19.5979 16.9732 20.5355 16.0355C21.4732 15.0979 22 13.8261 22 12.5C22 11.1739 21.4732 9.90215 20.5355 8.96447C19.5979 8.02678 18.3261 7.5 17 7.5H13.5M10.5 17.5H7C5.67392 17.5 4.40215 16.9732 3.46447 16.0355C2.52678 15.0979 2 13.8261 2 12.5C2 11.1739 2.52678 9.90215 3.46447 8.96447C4.40215 8.02678 5.67392 7.5 7 7.5H10.5M9 12.5H15" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } placeholder="Link" name="website" register={register} />

          {/* Tax ID */}
          <Field label="TaxID" icon={<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.644 4.5C18.5083 4.13353 18.2948 3.80087 18.018 3.525C16.984 2.5 15.322 2.5 12 2.5C8.678 2.5 7.015 2.5 5.982 3.525C5.70524 3.80087 5.49165 4.13353 5.356 4.5M5 18.5C5.087 19.92 5.326 20.823 5.982 21.475C7.015 22.5 8.677 22.5 12 22.5C15.323 22.5 16.985 22.5 18.017 21.475C18.674 20.823 18.913 19.919 19 18.5M6 10.5L8 12.5M8 10.5L6 12.5M11 10.5L13 12.5M13 10.5L11 12.5M16 10.5L18 12.5M18 10.5L16 12.5M12 19.5V19.51M17 7.5H7C5.114 7.5 4.172 7.5 3.586 8.086C3 8.672 3 9.614 3 11.5C3 13.386 3 14.328 3.586 14.914C4.172 15.5 5.114 15.5 7 15.5H17C18.886 15.5 19.828 15.5 20.414 14.914C21 14.328 21 13.386 21 11.5C21 9.614 21 8.672 20.414 8.086C19.828 7.5 18.886 7.5 17 7.5Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } placeholder="Enter TaxID" name="taxid" register={register} />

          {/* License Number */}
          <Field label="Licenses Number" icon={<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 6.5H21M11 12.5H21M11 18.5H21M3 15.5H4.5C4.779 15.5 4.918 15.5 5.034 15.523C5.26683 15.5693 5.4807 15.6836 5.64856 15.8514C5.81642 16.0193 5.93072 16.2332 5.977 16.466C6 16.582 6 16.72 6 17C6 17.28 6 17.418 5.977 17.534C5.93072 17.7668 5.81642 17.9807 5.64856 18.1486C5.4807 18.3164 5.26683 18.4307 5.034 18.477C4.918 18.5 4.78 18.5 4.5 18.5C4.22 18.5 4.082 18.5 3.966 18.523C3.73317 18.5693 3.5193 18.6836 3.35144 18.8514C3.18358 19.0193 3.06928 19.2332 3.023 19.466C3 19.582 3 19.72 3 20V20.9C3 21.183 3 21.324 3.088 21.412C3.176 21.5 3.318 21.5 3.6 21.5H6M3 3.5H4.2C4.27956 3.5 4.35587 3.53161 4.41213 3.58787C4.46839 3.64413 4.5 3.72044 4.5 3.8V9.5M4.5 9.5H3M4.5 9.5H6" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } placeholder="Licenses Number" name="license" register={register} />

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#204C80]">Description *</label>
            <textarea
              {...register("description")}
              placeholder="Write a short description..."
              className="w-full border rounded-2xl p-3 outline-none resize-none h-32 text-sm"
              style={{ borderColor: "#204C80" }}
            ></textarea>
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

const Field = ({ label, icon, placeholder, type = "text", name, register }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-[#204C80]">{label} *</label>
    <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
      <span className="mr-2 text-[#204C80]">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="outline-none w-full text-sm"
      />
    </div>
  </div>
);

const SelectField = ({ label, name, options, icon, register }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-[#204C80]">{label} *</label>
    <div className="flex items-center border rounded-2xl px-3 py-2 bg-white" style={{ borderColor: "#204C80" }}>
      <span className="mr-2 text-[#204C80]">{icon}</span>
      <select {...register(name)} className="outline-none w-full text-sm bg-white">
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

export default ProfileForm;

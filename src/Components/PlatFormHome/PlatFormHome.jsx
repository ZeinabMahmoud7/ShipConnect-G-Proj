import React from "react";

const PlatFormHome = () => {
  const icons = {
    user: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 22H7.08999C5.54499 22 4.31599 21.248 3.21299 20.197C0.952992 18.044 4.66299 16.324 6.07799 15.482C7.48862 14.648 9.07268 14.1507 10.7069 14.029C12.3411 13.9072 13.9813 14.1642 15.5 14.78M19 22V15M15.5 18.5H22.5M17 6.5C17 7.69347 16.5259 8.83807 15.682 9.68198C14.8381 10.5259 13.6935 11 12.5 11C11.3065 11 10.1619 10.5259 9.31801 9.68198C8.4741 8.83807 7.99999 7.69347 7.99999 6.5C7.99999 5.30653 8.4741 4.16193 9.31801 3.31802C10.1619 2.47411 11.3065 2 12.5 2C13.6935 2 14.8381 2.47411 15.682 3.31802C16.5259 4.16193 17 5.30653 17 6.5Z" stroke="#177D3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    package: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 22C10.682 22 9.9 21.67 8.337 21.01C4.446 19.366 2.5 18.543 2.5 17.16V7M11.5 22V11.355M11.5 22C12.225 22 12.793 21.74 14 21.223M20.5 7V11M15.5 17.5H22.5M19 21V14M5.5 12L7.5 13M16.5 4L6.5 9M7.826 9.691L4.905 8.278C3.302 7.502 2.5 7.114 2.5 6.5C2.5 5.886 3.302 5.498 4.905 4.722L7.825 3.309C9.63 2.436 10.53 2 11.5 2C12.47 2 13.371 2.436 15.174 3.309L18.095 4.722C19.698 5.498 20.5 5.886 20.5 6.5C20.5 7.114 19.698 7.502 18.095 8.278L15.175 9.691C13.37 10.564 12.47 11 11.5 11C10.53 11 9.629 10.564 7.826 9.691Z" stroke="#E4E6EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    chart: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 22.0001L19.353 19.8531M19.353 19.8531C19.9957 19.2101 20.3568 18.3382 20.357 17.4291C20.3571 16.6357 20.0821 15.8669 19.5788 15.2536C19.0756 14.6403 18.3752 14.2205 17.5971 14.0657C16.819 13.9109 16.0113 14.0307 15.3116 14.4046C14.6119 14.7786 14.0636 15.3836 13.76 16.1166C13.4564 16.8496 13.4164 17.6651 13.6467 18.4243C13.877 19.1835 14.3635 19.8393 15.0232 20.28C15.6829 20.7207 16.4749 20.9191 17.2645 20.8412C18.054 20.7634 18.7921 20.4142 19.353 19.8531Z" stroke="#FD0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5 22H11.227C7.967 22 6.335 22 5.203 21.202C4.88085 20.9761 4.5929 20.705 4.348 20.397C3.5 19.331 3.5 17.797 3.5 14.727V12.182C3.5 9.219 3.5 7.737 3.969 6.554C4.723 4.651 6.317 3.151 8.339 2.441C9.595 2 11.168 2 14.318 2C16.116 2 17.016 2 17.734 2.252C18.889 2.658 19.8 3.515 20.231 4.602C20.5 5.278 20.5 6.125 20.5 7.818V12" stroke="#FD0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.5 12C3.5 11.116 3.85115 10.2683 4.47621 9.64321C5.10127 9.01815 5.94903 8.667 6.833 8.667C7.499 8.667 8.284 8.783 8.931 8.61C9.21371 8.53392 9.47145 8.38485 9.67838 8.17774C9.88531 7.97064 10.0342 7.71277 10.11 7.43C10.283 6.783 10.167 5.998 10.167 5.332C10.1673 4.44821 10.5185 3.6007 11.1436 2.97586C11.7686 2.35102 12.6162 2 13.5 2" stroke="#FD0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    check: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 12C22.5 6.477 18.023 2 12.5 2C6.977 2 2.5 6.477 2.5 12C2.5 17.523 6.977 22 12.5 22C18.023 22 22.5 17.523 22.5 12Z" stroke="#21CF61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 12.75C8.5 12.75 10.1 13.662 10.9 15C10.9 15 13.3 9.75 16.5 8" stroke="#21CF61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    location: (<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 4.5001V18.5001M7.5 1.5001V15.5001M4.753 2.1961L3.526 2.9081C2.537 3.4811 2.043 3.7681 1.772 4.2451C1.5 4.7221 1.5 5.3021 1.5 6.4641V14.6281C1.5 16.1541 1.5 16.9181 1.842 17.3421C2.07 17.6241 2.389 17.8141 2.742 17.8771C3.272 17.9721 3.922 17.5951 5.22 16.8421C6.102 16.3311 6.95 15.7991 8.005 15.9441C8.485 16.0091 8.942 16.2371 9.858 16.6921L13.671 18.5881C14.496 18.9981 14.504 19.0001 15.421 19.0001H17.5C19.386 19.0001 20.328 19.0001 20.914 18.4011C21.5 17.8031 21.5 16.8391 21.5 14.9111V8.1711C21.5 6.2441 21.5 5.2811 20.914 4.6811C20.328 4.0831 19.386 4.0831 17.5 4.0831H15.421C14.504 4.0831 14.496 4.0811 13.671 3.6711L10.34 2.0151C8.949 1.3231 8.253 0.977099 7.512 1.0001C6.771 1.0231 6.1 1.4151 4.753 2.1961Z" stroke="#DF6109" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    star: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.228 3.44399L15.988 6.99299C16.228 7.48699 16.868 7.96099 17.408 8.05099L20.597 8.58599C22.637 8.92899 23.117 10.421 21.647 11.893L19.167 14.393C18.747 14.816 18.517 15.633 18.647 16.218L19.357 19.313C19.917 21.763 18.627 22.71 16.477 21.43L13.487 19.645C12.947 19.323 12.057 19.323 11.507 19.645L8.51901 21.43C6.37901 22.71 5.07901 21.752 5.63901 19.313L6.34901 16.218C6.47901 15.633 6.24901 14.816 5.82901 14.393L3.34901 11.893C1.89001 10.42 2.36001 8.92899 4.39901 8.58599L7.58901 8.05099C8.11901 7.96099 8.75901 7.48699 8.99901 6.99299L10.759 3.44399C11.719 1.51899 13.279 1.51899 14.229 3.44399" fill="#F7CF37"/>
</svg>
),
    building: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 22H21.5M15.5 2H9.5C6.19 2 5.5 2.69 5.5 6V22H19.5V6C19.5 2.69 18.81 2 15.5 2Z" stroke="#177D3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.5 22V19C15.5 17.345 15.155 17 13.5 17H11.5C9.845 17 9.5 17.345 9.5 19V22M14 6H11M14 9.5H11M14 13H11" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    search: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 22.0001L19.353 19.8531M19.353 19.8531C19.9957 19.2101 20.3568 18.3382 20.357 17.4291C20.3571 16.6357 20.0821 15.8669 19.5788 15.2536C19.0755 14.6403 18.3752 14.2205 17.5971 14.0657C16.819 13.9109 16.0113 14.0307 15.3116 14.4046C14.6119 14.7786 14.0636 15.3836 13.76 16.1166C13.4564 16.8496 13.4164 17.6651 13.6467 18.4243C13.877 19.1835 14.3635 19.8393 15.0232 20.28C15.6828 20.7207 16.4749 20.9191 17.2645 20.8412C18.054 20.7634 18.7921 20.4142 19.353 19.8531Z" stroke="#FD0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5 22H11.227C7.967 22 6.335 22 5.203 21.202C4.88085 20.9761 4.5929 20.705 4.348 20.397C3.5 19.331 3.5 17.797 3.5 14.727V12.182C3.5 9.219 3.5 7.737 3.969 6.554C4.723 4.651 6.317 3.151 8.339 2.441C9.595 2 11.168 2 14.318 2C16.116 2 17.016 2 17.734 2.252C18.889 2.658 19.8 3.515 20.231 4.602C20.5 5.278 20.5 6.125 20.5 7.818V12" stroke="#FD0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.5 12C3.5 11.116 3.85115 10.2683 4.47621 9.64321C5.10127 9.01815 5.94903 8.667 6.833 8.667C7.499 8.667 8.284 8.783 8.931 8.61C9.21371 8.53392 9.47145 8.38485 9.67838 8.17774C9.88531 7.97064 10.0342 7.71277 10.11 7.43C10.283 6.783 10.167 5.998 10.167 5.332C10.1673 4.44821 10.5185 3.6007 11.1436 2.97586C11.7686 2.35102 12.6162 2 13.5 2" stroke="#FD0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    award: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 12C22.5 6.477 18.023 2 12.5 2C6.977 2 2.5 6.477 2.5 12C2.5 17.523 6.977 22 12.5 22C18.023 22 22.5 17.523 22.5 12Z" stroke="#21CF61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 12.75C8.5 12.75 10.1 13.662 10.9 15C10.9 15 13.3 9.75 16.5 8" stroke="#21CF61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    target: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.768 4.328C6.454 3.028 9.073 2 12.5 2C15.927 2 18.546 3.027 20.232 4.328C20.469 4.51 20.588 4.602 20.685 4.764C20.767 4.9 20.825 5.106 20.828 5.264C20.83 5.453 20.768 5.621 20.641 5.956C20.331 6.786 20.175 7.2 20.112 7.61C20.033 8.128 20.032 8.255 20.105 8.773C20.163 9.185 20.48 10.06 21.112 11.81C21.3682 12.5118 21.4995 13.2529 21.5 14C21.5 17 19 19.375 16.5 20C14.308 20.548 13.167 21.333 12.5 22C11.833 21.333 10.692 20.548 8.5 20C6 19.375 3.5 17 3.5 14C3.5 13.18 3.656 12.452 3.888 11.81C4.521 10.06 4.837 9.185 4.895 8.773C4.968 8.255 4.967 8.128 4.888 7.61C4.825 7.2 4.67 6.785 4.358 5.956C4.233 5.621 4.17 5.453 4.173 5.264C4.17971 5.08838 4.2284 4.91693 4.315 4.764C4.412 4.602 4.531 4.51 4.768 4.328Z" fill="#FFFEFA" stroke="#F2C50E" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.191 7.57801L13.895 8.99801C13.9547 9.10441 14.0362 9.19705 14.134 9.26992C14.2319 9.3428 14.344 9.39427 14.463 9.42101L15.739 9.63401C16.555 9.77101 16.747 10.368 16.159 10.957L15.167 11.957C15.08 12.0555 15.0162 12.1721 14.9802 12.2984C14.9443 12.4248 14.937 12.5575 14.959 12.687L15.243 13.925C15.467 14.905 14.951 15.284 14.091 14.772L12.895 14.058C12.7726 13.9945 12.6368 13.9614 12.499 13.9614C12.3612 13.9614 12.2254 13.9945 12.103 14.058L10.907 14.772C10.051 15.284 9.531 14.901 9.755 13.925L10.039 12.687C10.061 12.5575 10.0537 12.4248 10.0178 12.2984C9.98176 12.1721 9.91795 12.0555 9.831 11.957L8.84 10.957C8.256 10.368 8.444 9.77101 9.26 9.63401L10.535 9.42101C10.6534 9.39365 10.7648 9.34178 10.8619 9.26876C10.9591 9.19573 11.0398 9.10316 11.099 8.99701L11.803 7.57701C12.187 6.80701 12.811 6.80801 13.191 7.57801Z" stroke="#F2C50E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
    truck: (<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 6.5001V20.5001M8.5 3.5001V17.5001M5.753 4.1961L4.526 4.9081C3.537 5.4811 3.043 5.7681 2.772 6.2451C2.5 6.7221 2.5 7.3021 2.5 8.4641V16.6281C2.5 18.1541 2.5 18.9181 2.842 19.3421C3.07 19.6241 3.389 19.8141 3.742 19.8771C4.272 19.9721 4.922 19.5951 6.22 18.8421C7.102 18.3311 7.95 17.7991 9.005 17.9441C9.485 18.0091 9.942 18.2371 10.858 18.6921L14.671 20.5881C15.496 20.9981 15.504 21.0001 16.421 21.0001H18.5C20.386 21.0001 21.328 21.0001 21.914 20.4011C22.5 19.8031 22.5 18.8391 22.5 16.9111V10.1711C22.5 8.2441 22.5 7.2811 21.914 6.6811C21.328 6.0831 20.386 6.0831 18.5 6.0831H16.421C15.504 6.0831 15.496 6.0811 14.671 5.6711L11.34 4.0151C9.949 3.3231 9.253 2.9771 8.512 3.0001C7.771 3.0231 7.1 3.4151 5.753 4.1961Z" stroke="#DF6109" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)
  };

  const Step = ({ icon, title, desc, bg ,colorTitle}) => (
    <div className="flex flex-col items-center text-center">
      <div className={`w-16 h-16 ${bg} rounded-full flex items-center justify-center text-2xl mb-2`}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg" style={{color:colorTitle}}>{title}</h3>
      <p className="text-sm text-[#10233E99] font-light">{desc}</p>
    </div>
  );

  const SvgLine = () => (
    <div className="hidden lg:flex items-center justify-center h-full">
      <svg width="100" height="24" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="12" x2="100" y2="12" stroke="#989EAE" strokeWidth="2" />
      </svg>
    </div>
  );
const Section = ({ title, steps }) => {
  const elements = [];

  steps.forEach((step, i) => {
    elements.push(
      <div key={`step-${i}`} className="lg:col-span-2 col-span-1 flex justify-center">
        <Step {...step} />
      </div>
    );
    if (i < steps.length - 1) {
      elements.push(
        <div key={`line-${i}`} className="lg:col-span-1 hidden lg:flex justify-center">
          <SvgLine />
        </div>
      );
    }
  });

  return (
    <div className="mb-20">
      <h2 className="text-2xl md:text-[28px] font-normal text-center text-primaryBlue mb-12">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(11,minmax(0,1fr))] gap-4 items-start">
        {elements}
      </div>
    </div>
  );
};


  const startupSteps = [
    { icon: icons.user, bg: "bg-[#B1F7CB]", title: "Sign Up", colorTitle:'#1CA651', desc: "Create your business account" },
    { icon: icons.package, bg: "bg-[#7EADE7]", title: "Post Shipment", colorTitle:'#10233E', desc: "Add pickup, delivery, and package info" },
    { icon: icons.chart, bg: "bg-[#FFF1F1]", title: "Compare Offers",colorTitle:'#FD0D0D', desc: "View prices, times & reviews" },
    { icon: icons.check, bg: "bg-[#DAFCE7]", title: "Choose Provider", colorTitle:'#21CF61', desc: "Select and confirm the best match" },
    { icon: icons.location, bg: "bg-[#FFE1CD]", title: "Track Shipment",colorTitle:'#F9751C',  desc: "Get live delivery updates" },
    { icon: icons.star, bg: "bg-[#FFF6D2]", title: "Rate Service",colorTitle:'#C5A30D', desc: "Leave feedback after delivery" }
  ];

  const shippingSteps = [
    { icon: icons.building, bg: "bg-[#B1F7CB]", title: "Sign Up", colorTitle:'#1CA651', desc: "Create your company account" },
    { icon: icons.search, bg: "bg-[#FFF1F1]", title: "Browse Requests", colorTitle:'#FD0D0D', desc: "See shipment needs from startups" },
    { icon: icons.check, bg: "bg-[#DAFCE7]", title: "Submit Offers", colorTitle:'#21CF61', desc: "Send pricing and delivery quotes" },
    { icon: icons.target, bg: "bg-[#FFF6D2]", title: "Get Chosen", colorTitle:'#C5A30D', desc: "Win deals based on your offer" },
    { icon: icons.truck, bg: "bg-[#FFE1CD]", title: "Deliver", colorTitle:'#F9751C', desc: "Pick up and ship on time" },
    { icon: icons.star, bg: "bg-[#FFF6D2]", title: "Get Rated", colorTitle:'#C5A30D', desc: "Earn reviews and grow" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-3xl text-center text-[#10233E]  font-bold mb-8"
  style={{ textShadow: '4px 4px 15px #00000040' }}>
            How the Platform Works for You
          </h1>
          <p className="text-[#10233E] text-[14px] max-w-2xl mx-auto">
            Seamless shipping starts here. Learn how to get connected, compare offers,<br/> and manage everything
          </p>
        </div>

        {/* Sections */}
        <Section title="Start up Path" steps={startupSteps} />
        <Section title="Shipping Company Path" steps={shippingSteps} />
      </div>
    </div>
  );
};

export default PlatFormHome;

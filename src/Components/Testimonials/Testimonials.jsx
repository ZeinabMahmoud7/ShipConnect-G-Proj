import React from "react";

const testimonials = [
  {
    name: "Nour",
    title: "Startup Founder",
    feedback:
      "ShipConnect helped us compare shipping offers in minutes. It saved us time and cut our costs!",
    image: "https://themify.me/demo/themes/ultra-lifestyle/files/2019/02/author-big.jpg",
  },
  {
    name: "Mahmoud",
    title: "Logistics Manager",
    feedback:
      "Finally, a platform that makes it easy to reach new clients and manage all shipments in one place.",
    image: "https://img.freepik.com/fotos-premium/jovem-fundo-branco-isolado_971759-106.jpg?w=360",
  },
  {
    name: "Lina, E-",
    title: "commerce Owner",
    feedback:
      "Reliable, fast, and clear. We now trust our shipping process more than ever.",
    image: "https://i.pravatar.cc/100?img=32",
  },
];

const Star = () => (
 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7276 2.44418L14.4874 5.99288C14.7274 6.48687 15.3673 6.9607 15.9073 7.05143L19.0969 7.58575C21.1367 7.92853 21.6167 9.4206 20.1468 10.8925L17.6671 13.3927C17.2471 13.8161 17.0172 14.6327 17.1471 15.2175L17.8571 18.3125C18.417 20.7623 17.1271 21.71 14.9774 20.4296L11.9877 18.6452C11.4478 18.3226 10.5579 18.3226 10.0079 18.6452L7.01824 20.4296C4.87847 21.71 3.57862 20.7522 4.13856 18.3125L4.84848 15.2175C4.97846 14.6327 4.74849 13.8161 4.32853 13.3927L1.84881 10.8925C0.388969 9.4206 0.858919 7.92853 2.89869 7.58575L6.08834 7.05143C6.61828 6.9607 7.25821 6.48687 7.49818 5.99288L9.25797 2.44418C10.2179 0.518607 11.7777 0.518607 12.7276 2.44418Z" fill="#FDC700" stroke="#FDC700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const Testimonials = () => {
  return (
    <section className=" py-12 px-6 sm:px-12 lg:px-20">
      {/* العنوان والوصف */}
      <div className="text-center mb-12">
        <h2 className="text-[#10233E] text-[32px] sm:text-3xl font-bold">
          What Our Users Say
        </h2>
        <p className="text-[#10233E99] font-normal mt-2 text-[20px] sm:text-base max-w-xl mx-auto">
          Real feedback from startups and shipping companies using ShipConnect
          to simplify their logistics.
        </p>
      </div>

      {/* الكروت */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-[#F3F4F6] px-[16px] py-[20px] rounded-xl shadow-sm p-6 flex flex-col justify-between"
          >
            <div>
              {/* النجوم */}
              <div className="flex gap-[2px] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              {/* النص */}
              <p className="text-[#101828BF] text-[20px] leading-relaxed">
                "{t.feedback}"
              </p>
            </div>

            {/* الشخص */}
            <div className="flex items-center mt-6">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-bold text-[#000000] text-[16px]">{t.name}</p>
                <p className="text-sm text-[#99A1AF]">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

import { motion } from "framer-motion";
import { FaWifi, FaBook, FaUniversity, FaHandshake, FaChalkboardTeacher, FaMicroscope, FaUsersCog, FaGlobe } from "react-icons/fa";
import React, { useState, useEffect } from "react";

// Why Us Data
const whyUsData = [
  { value: "250+", label: "Acres Wi-Fi Enabled Campus", icon: <FaWifi size={28} />, bg: "bg-emerald-100", color: "text-emerald-600" },
  { value: "120+", label: "Cutting-edge Programs Offered", icon: <FaBook size={28} />, bg: "bg-blue-100", color: "text-blue-600" },
  { value: "7+", label: "Specialised Schools", icon: <FaUniversity size={28} />, bg: "bg-orange-100", color: "text-orange-600" },
  { value: "150+", label: "Global Industry Partners", icon: <FaHandshake size={28} />, bg: "bg-purple-100", color: "text-purple-600" },
  { value: "", label: "Curriculum Enhanced with Value Addition Programs", icon: <FaChalkboardTeacher size={28} />, bg: "bg-teal-100", color: "text-teal-600" },
  { value: "200+", label: "Placement Partners", icon: <FaUsersCog size={28} />, bg: "bg-red-100", color: "text-red-600" },
  { value: "100%", label: "Placement Assistance", icon: <FaGlobe size={28} />, bg: "bg-yellow-100", color: "text-yellow-600" },
  { value: "10,000+", label: "International Alumni Network", icon: <FaUsersCog size={28} />, bg: "bg-pink-100", color: "text-pink-600" },
];

const sliderData = [...whyUsData, ...whyUsData];

export default function WhyUs() {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    setIsMobile(window.innerWidth < 768); // mobile breakpoint
  };

  checkScreen();
  window.addEventListener("resize", checkScreen);

  return () => window.removeEventListener("resize", checkScreen);
}, []);
  return (
    <section className="relative w-full bg-slate-50 py-12 overflow-hidden max-w-7xl mx-auto">

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-3xl font-semibold tracking-wide text-center text-slate-700 mb-12"
      >
        Why Choose Us?
      </motion.h2>

      {/* Slider */}
      <div className="overflow-hidden relative">
       <motion.div
  className="flex gap-8"
  animate={{ x: isMobile ? ["0%", "-100%"] : ["0%", "-50%"] }}
  transition={{
    duration: isMobile ? 6 : 22,   // ⚡ Faster on mobile
    repeat: Infinity,
    ease: "linear",
  }}
>

          {sliderData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="min-w-[260px] md:min-w-[300px] group relative p-8 bg-slate-800/90 shadow-lg 
                         rounded-2xl border border-slate-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">

                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                  {item.icon}
                </div>

                {/* Number */}
                {item.value && (
                  <h3 className="text-3xl font-extrabold text-white tracking-wide">
                    {item.value}
                  </h3>
                )}

                {/* Label */}
                <p className="text-gray-300 font-medium text-sm uppercase tracking-wide mt-2">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

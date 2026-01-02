import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const logos = [
  "/recruiters/10001.png",
  "/recruiters/10002.png",
  "/recruiters/10004.jpg",
  "/recruiters/10005.png",
  "/recruiters/10007.png",
  "/recruiters/10008.png",
 
];

const doubledLogos = [...logos, ...logos];

export default function RecruiterSlider() {
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
    <div className="relative w-full bg-white py-10  px-4 max-w-7xl mx-auto">
          <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-3xl font-semibold tracking-wide text-center text-slate-700 mb-8"
                >
        Our Recruiters
                </motion.h2>
      {/* 🔥 Background Blurred Shape */}
      <div className="absolute -bottom-10 left-[30%] w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>

      {/* (Optional) second blur for better design */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Slider Container */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
  animate={{ x: isMobile ? ["0%", "-100%"] : ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
    duration: isMobile ? 6 : 20,   // ⚡ Faster on mobile
            ease: "linear",
          }}
        >
          {doubledLogos.map((logo, index) => (
        <div
  key={index}
  className="min-w-[220px] h-[160px] flex items-center justify-center  cursor-pointer
             bg-slate-100 backdrop-blur-xl border border-slate-200 
             rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]
             hover:shadow-[0_6px_25px_rgba(0,0,0,0.1)]
             transition-all duration-300 px-6"
>
  <img
    src={logo}
    alt="recruiter logo"
    className="max-h-[80px] w-auto object-contain opacity-80 hover:opacity-100 transition"
  />
</div>

          ))}
        </motion.div>
      </div>
    </div>
  );
}

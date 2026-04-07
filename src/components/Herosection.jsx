import React, { useState } from "react";
import { motion } from "framer-motion";
import Form from "./Form";
import NoPaperFormWidget from "./NoPaperFormWidget";

export default function Herosection() {
 const [openApply, setOpenApply] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans flex flex-col justify-center items-center mt-[80px]">
        <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        // style={{ backgroundImage: "url('/herosection/bghero.png')" }}
                style={{ backgroundImage: "url('/herosection/banner.jpg')" }}

      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/50" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
        
        {/* LEFT TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 col-span-12 pt-4 2xl:scale-[1.15] 2xl:translate-x-6"
        >
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0 px-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug drop-shadow-xl text-white mb-2">
              Inspiring Your Scientific Potential at 
            </h1>

            <span className="text-3xl sm:text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent tracking-wide drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)] mb-1">
              Sandip University
            </span>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-2 mb-6"
            >
              <span className="text-4xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-white bg-clip-text text-transparent tracking-wide drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)]">
School of Science (SOS)<br/>

              </span>

              <div className="h-[2px] sm:h-[4px] w-[10rem] sm:w-[18rem] md:w-[32rem] mt-3 mx-auto lg:mx-0 bg-gradient-to-r from-blue-600 to-red-300 rounded-full shadow-lg" />
            </motion.div>

        <p className="text-lg sm:text-base md:text-2xl text-gray-200 mt-4 leading-relaxed drop-shadow-lg">
              <span className="font-semibold text-white">NAAC Accredited ‘A’ Grade with 3.11 CGPA (1st Cycle)<br/>
4th Top Ranking Private University in India 
</span> <br /> <br />
              <span className="text-base sm:text-base md:text-lg"><b>Approved by UGC | AIU</b></span>
            </p>
            <span className="text-3xl sm:text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent tracking-wide drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)] mb-1">
             Admissions Open 2026-27
            </span>


               <button
                onClick={() => setOpenApply(true)}

        className="mt-10 px-8 py-3 md:hidden bg-[#0E1B50] text-white rounded-full text-sm font-semibold hover:bg-[#183195] transition">
            Apply Now
          </button>
          </div>
        </motion.div>

        {/* right side form */}
<Form/>
       
      </div>
                  {/* APPLY POPUP */}
      {openApply && (
        <div style={overlay}>
          <div style={modal}>
            <button onClick={() => setOpenApply(false)} style={closeBtn}>
              ✖
            </button>
             <h2 className="text-xl font-semibold text-black text-center mb-4">Enquire Now</h2>
            <NoPaperFormWidget />
          </div>
        </div>
      )}
    </div>
  );
}
/* ---------- MODAL STYLES ---------- */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modal = {
  background: "#fff",
  padding: "20px",
  width: "90%",
  maxWidth: "600px",
  borderRadius: "10px",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "12px",
  cursor: "pointer",
  fontSize: "18px",
};

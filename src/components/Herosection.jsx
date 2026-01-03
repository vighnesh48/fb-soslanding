import React, { useState } from "react";
import { motion } from "framer-motion";
import Form from "./Form";
import EnquiryModal from "./EnquiryModal";

export default function Herosection() {
      const [openModal, setOpenModal] = useState(false);

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
              Start Your Creative Journey at
            </h1>

            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent tracking-wide drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)] mb-1">
              Sandip University
            </span>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-2 mb-6"
            >
              <span className="text-4xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-white bg-clip-text text-transparent tracking-wide drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)]">
               School of Sciences
              </span>

              <div className="h-[2px] sm:h-[4px] w-[10rem] sm:w-[18rem] md:w-[32rem] mt-3 mx-auto lg:mx-0 bg-gradient-to-r from-blue-600 to-red-300 rounded-full shadow-lg" />
            </motion.div>

           {/* <p className="text-lg sm:text-base md:text-2xl text-gray-200 mt-4 leading-relaxed drop-shadow-lg">
              Applications Invited for <span className="font-semibold text-white">SU-DAT 2026</span> <br />
              <span className="text-base sm:text-base md:text-lg">Entrance Exam Required for Bachelor of Design (B.Des.) Admissions.</span>
            </p>
            <div className="mt-5 flex items-center justify-center gap-6 sm:gap-10 bg-black/40 backdrop-blur-xl border border-white/10 px-4 sm:px-6 py-3 rounded-2xl shadow-xl text-white w-full max-w-xs sm:max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <p className="text-[10px] sm:text-[15px] text-gray-100">Last Date to Apply</p>
                <h3 className="text-sm sm:text-base font-bold">29 Jan 2026</h3>
              </div>

              <span className="text-gray-400 text-base sm:text-lg font-light">|</span>

              <div className="text-center">
                <p className="text-[10px] sm:text-[16px] text-gray-100">SU-DAT Exam</p>
                <h3 className="text-sm sm:text-base font-bold">31 Jan 2026</h3>
              </div>
            </div>*/}

               <button
                      onClick={() => setOpenModal(true)}

        className="mt-10 px-8 py-3 md:hidden bg-[#0E1B50] text-white rounded-full text-sm font-semibold hover:bg-[#183195] transition">
            Apply Now
          </button>
          </div>
        </motion.div>

        {/* right side form */}
<Form/>
       
      </div>
                  <EnquiryModal open={openModal} onClose={() => setOpenModal(false)} />
      
    </div>
  );
}

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faTools,
  faGlobe,
  faArrowRight,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import NoPaperFormWidget from "./NoPaperFormWidget";

import { faServicestack } from "@fortawesome/free-brands-svg-icons/faServicestack";
import { faIndustry } from "@fortawesome/free-solid-svg-icons/faIndustry";

export default function AboutSection() {
  const [openApply, setOpenApply] = useState(false);
  
  return (
    <section className="bg-gray-50 text-gray-800 py-5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-indigo-50 shadow-lg">

            <h4 className="section-heading text-sm">About Sandip University</h4>

            {/* Decorative Dots */}
            <div className=" flex items-center gap-3">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-teal-500"></span>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                A Global Hub of Innovation & Technology
              </p>
            </div>

            <p className="mt-3 text-gray-600 leading-relaxed text-sm">
Sandip University’s School of Science (SOS) is one of the top science colleges in Nashik, offering futuristic scientific programs at the undergraduate and postgraduate levels. The course curriculum of each program is designed in collaboration with top industry experts to ensure a research-based pedagogy. Students gain hands-on skill development opportunities in fully-equipped science labs on campus. Industry exposure is ensured through workshops, seminars, compulsory internships, and industry visits to help students develop technical and soft skills in the long run.          </p>

            <ul className="mt-4 space-y-4 text-gray-700">
            

              <li className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 bg-white shadow rounded-md">
                  <FontAwesomeIcon icon={faTools} className="text-indigo-600 text-lg" />
                </span>
                <span>Value addition and global certifications integrated in the curriculum</span>
              </li>

              <li className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 bg-white shadow rounded-md">
                  <FontAwesomeIcon icon={faGlobe} className="text-indigo-600 text-lg" />
                </span>
                <span>
                 One-on-one mentorship and counselling
                </span>
              </li>








 <li className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 bg-white shadow rounded-md">
                  <FontAwesomeIcon icon={faServicestack}className="text-indigo-600 text-lg" />
                </span>
                <span>
                 One-on-one mentorship and counselling
                </span>
              </li>

 <li className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 bg-white shadow rounded-md">
                  <FontAwesomeIcon icon={faHome} className="text-indigo-600 text-lg" />
                </span>
                <span>
                 Industry connect with top MNCs in the IT sector
                </span>
              </li>


 <li className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 bg-white shadow rounded-md">
                  <FontAwesomeIcon icon={faIndustry} className="text-indigo-600 text-lg" />
                </span>
                <span>
                	Compulsory internships
                </span>
              </li>




            </ul>

            {/* BUTTONS */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">

              <a href="#Course" className="px-5 py-1 rounded-lg bg-gradient-to-r from-sky-500 to-teal-400 text-white font-semibold shadow hover:scale-[1.02] transition flex items-center justify-center gap-2">
                Explore Programs
                <FontAwesomeIcon icon={faArrowRight} />
              </a>

              <button
              onClick={() => setOpenApply(true)}
              className="px-4 py-3 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2">
                Request Brochure
                <FontAwesomeIcon icon={faArrowRight} />
              </button>

            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">

            <img
              src="herosection/clgimage.webp"
              alt="sos"
              className="w-full h-80 sm:h-80 md:h-96 lg:h-[555px] object-cover"
            />

            {/* Footer Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 
                            bg-gradient-to-t from-black/50 to-transparent text-white">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                {/* <div>
                  <p className="text-sm uppercase tracking-wide">
                    Workshop: Textile Embroidery
                  </p>
                  <p className="text-xs opacity-80">
                    Mentor-led Studio Session · Pune Campus
                  </p>
                </div>

                <button className="px-3 py-2 bg-white/20 rounded hover:bg-white/30 transition text-sm flex items-center gap-2 w-fit">
                  View Gallery
                  <FontAwesomeIcon icon={faArrowRight} />
                </button> */}

              </div>
            </div>
          </div>
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
    </section>
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

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faTools,
  faGlobe,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import EnquiryModal from "./EnquiryModal";

export default function AboutSection() {
    const [openModal, setOpenModal] = useState(false);
  
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
Science is a vast and diverse field with newer discoveries being made even today. As one of the top science colleges in Maharashtra, Sandip School of Science aims at amplifying the fallible, alive and exciting parts of science through multiple means. One of the most important steps taken is to implement the right curriculum to help students gain a 3600 view of applied sciences.
Our undergraduate and postgraduate programs are designed to help students become global scientists in the field of their choice. The course structure is focused on balancing academic knowledge with hands-on skills through well-designed laboratories, research opportunities, and industry exposure. Our students gain ample exposure through well-structured activities such as workshops, seminars, expert guest lectures, webinars, field trips and industry visits.
            </p>

            <ul className="mt-4 space-y-4 text-gray-700">
            

              <li className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 bg-white shadow rounded-md">
                  <FontAwesomeIcon icon={faTools} className="text-indigo-600 text-lg" />
                </span>
                <span>State-of-the-art labs & expert-led workshops.</span>
              </li>

              <li className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 bg-white shadow rounded-md">
                  <FontAwesomeIcon icon={faGlobe} className="text-indigo-600 text-lg" />
                </span>
                <span>
                  Cross-disciplinary learning for global & local impact.
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
              onClick={() => setOpenModal(true)}
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
      <EnquiryModal open={openModal} onClose={() => setOpenModal(false)} />

      </div>
    </section>
  );
}

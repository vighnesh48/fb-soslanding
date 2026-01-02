import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faGraduationCap,
  faBriefcase,
  faFileLines
} from "@fortawesome/free-solid-svg-icons";
import EnquiryModal from "./EnquiryModal";

const courseData = {
  // ============================
  //        B.Des
  // ============================
 "B.Pharm": {
  title: "Bachelor of Pharmacy",
  duration: "4 Years | Full-Time",
  image: "/herosection/course1.png",

  specializations: {
    "B.Pharm": {
      summary:
        "B.Pharm program is an undergraduate program, which is taught for four years and eight semesters. In B.Pharm, various subjects are taught such as medicines and their uses, medicinal chemistry, drug formulation, and drug research. After learning these subjects, students can make a good career. As one of the best colleges for Bachelors in Pharmacy, Sandip University has dedicated labs for pharmaceutical students to help them hone their skills.",
      careers: [
        "Community Pharmacist",
        "Hospital Pharmacist",
        "Clinical Pharmacist",
        "Drug Information Officer"
      ]
    }
  },

  eligibility: [
    "The candidate should have passed 10+2 examination or its equivalent examination with English as one of the subjects and Physics, Chemistry, Mathematics or Biology as optional subjects individually."
  ]
},
  




"D.Pharm": {
  title: "Diploma in Pharmacy",
  duration: "2 Years | Full-Time",
  image: "/herosection/course1.png",

  specializations: {
    "D.Pharm": {
      summary:
        "Diploma in Pharmacy is a two-year course with a mix of theoretical knowledge and practical skills. This helps students become job-ready in the pharmaceutical industry.",
      careers: [
        "Community Pharmacist",
"Retail Pharmacist",
"Hospital Pharmacist",
"Medical Store Manager",
      ]
    }
  },

  eligibility: [
    "Passed 10+2 examination with Physics and Chemistry as compulsory subjects along with Mathematics/ Biology subject."
  ]
},

"M.Pharm": {
  title: "Master of Pharmacy",
  duration: "2 Years | Full-Time",
  image: "/herosection/course1.png",

  specializations: {
    "M.Pharm Industrial Pharmacy": {
      summary:
        "Sandip University is one of the best pharmacy schools in Nashik, Maharashtra. Recognised by the Pharmacy Council of India, Sandip School of Pharmaceutical Sciences offers state-of-the-art undergraduate and postgraduate courses. ",
      careers: [
        "Product Designer",
        "Industrial Designer",
        "UX Designer",
        "Design Strategist"
      ]
    },


"M.Pharm Pharmaceutical Quality Assurance": {
      summary:
        "Sandip University is one of the best pharmacy schools in Nashik, Maharashtra. Recognised by the Pharmacy Council of India, Sandip School of Pharmaceutical Sciences offers state-of-the-art undergraduate and postgraduate courses. ",
      careers: [
        "Product Designer",
        "Industrial Designer",
        "UX Designer",
        "Design Strategist"
      ]
    }
  },








  eligibility: [
    "B.Pharm passed from Indian university from an institution approved by Pharmacy Council of India and has scored not less than 55% of the maximum marks. (Aggregate of 4 years of B. Pharm.)"
  ]
},





  
};




export default function CourseTabs() {
  const [activeTab, setActiveTab] = useState("B.Pharm");
  const [activeSpec, setActiveSpec] = useState(
    Object.keys(courseData["B.Pharm"].specializations)[0]
  );
  const [openModal, setOpenModal] = useState(false);
  // PRELOAD ALL IMAGES (removes first-time lag)
  React.useEffect(() => {
    Object.values(courseData).forEach(item => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  return (
    <section className=" w-full py-5 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-3xl font-semibold tracking-wide text-center text-slate-700 mb-8"
        >
          Programs Offered
        </motion.h2>
        <div className="absolute -bottom-10 left-[30%] w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>

        {/* MAIN TABS (Sliding Pill Design) */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-200 inline-flex relative">
            {Object.keys(courseData).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveSpec(Object.keys(courseData[tab].specializations)[0]);
                }}
                className={`relative px-4 py-1 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 z-10  ${activeTab === tab ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-[#0E1B50] rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* LEFT COLUMN: Image (constant, no blink) */}
          <div className="lg:col-span-6 relative flex flex-col">
            <motion.div
              key={`image-${activeTab}`}   // ✅ changes only when tab changes
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl w-full h-full min-h-[460px]"
            >
              <img
                src={courseData[activeTab].image}
                alt={courseData[activeTab].title}
                className="w-full h-full object-cover"
              />
            </motion.div>


            {/* Decorative Border */}
            <div className="absolute -z-10 top-6 -left-6 w-full h-full rounded-3xl border-2 border-[#0E1B50]/10 hidden md:block"></div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpenModal(true)}
              className="mt-4 w-full sm:w-auto px-8 py-3 bg-[#0E1B50] text-white rounded-xl font-semibold shadow-lg
            shadow-blue-900/20 hover:shadow-blue-900/40 transition-all flex items-center justify-center gap-2"
            >
              Download Brochure
              <FontAwesomeIcon icon={faArrowRight} className="text-sky-400" />
            </motion.button>
          </div>

          {/* RIGHT COLUMN (equal height, no overlap) */}
          <div className="lg:col-span-6 flex flex-col h-full">

            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col h-full"
            >


              {/* Header */}
              <div className="mb-3">
                <h3 className=" text-2xl md:text-3xl font-bold text-[#0E1B50] mb-1">
                  {courseData[activeTab].title}
                </h3>

                <div className="flex items-center gap-4 text-slate-500 font-medium">
                  <FontAwesomeIcon icon={faBriefcase} className="text-sky-500" />
                  {courseData[activeTab].duration}

                {/*}  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Choose Specialization
                  </h4>*/}
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                  {Object.keys(courseData[activeTab].specializations).map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setActiveSpec(spec)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${activeSpec === spec
                        ? "bg-sky-50 border-sky-200 text-[#0E1B50] shadow-sm ring-1 ring-sky-200"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stable Height Content Box */}
              <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex-grow 
        min-h-[350px]">

                <motion.div
                  key={activeSpec}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* SUMMARY SECTION */}
                  <div className="bg-sky-50 p-4 rounded-xl border border-rose-100 mb-3 md:h-[170px]">
                    <h4 className="font-bold text-[#0E1B50] flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-yellow-600">
                        <FontAwesomeIcon icon={faFileLines} size="sm" />
                      </span>
                      Summary
                    </h4>

                    <p className="text-slate-600 text-sm ml-1">
                      {courseData[activeTab].specializations[activeSpec].summary}
                    </p>
                  </div>

                  <div className="h-px w-full bg-slate-100 mb-3"></div>

                  {/* CAREER OPPORTUNITIES */}
                  <div className="mb-3 bg-sky-50 p-4 rounded-xl border border-sky-100 md:h-[140px]">
                    <h4 className="font-bold text-[#0E1B50] flex items-center gap-2 mb-2 ">
                      <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <FontAwesomeIcon icon={faBriefcase} size="sm" />
                      </span>
                      Career Opportunities
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {courseData[activeTab].specializations[activeSpec].careers.map((career, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400" />
                          {career}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-full bg-slate-100 mb-3"></div>

                  {/* ELIGIBILITY */}
                  <div className="bg-sky-50 p-4 rounded-xl border border-rose-100 md:h-[130px]">
                    <h4 className="font-bold text-[#0E1B50] flex items-center gap-2 mb-4">
                      <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                        <FontAwesomeIcon icon={faGraduationCap} size="sm" />
                      </span>
                      Eligibility
                    </h4>

                    <ul className="space-y-1">
                      {courseData[activeTab].eligibility.map((e, i) => (
                        <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>



              </div>
            </motion.div>
          </div>
        </div>


      </div>
      <EnquiryModal open={openModal} onClose={() => setOpenModal(false)} />

    </section>
  );
}
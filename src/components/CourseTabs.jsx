import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoPaperFormWidget from "./NoPaperFormWidget";
import {
  faArrowRight,
  faCheckCircle,
  faGraduationCap,
  faBriefcase,
  faFileLines
} from "@fortawesome/free-solid-svg-icons";


const courseData = {
  // ============================
  //        B.Des
  // ============================
  "B.sc": {
    title: "Bachelor of Science (B.Sc)",
    duration: "3 Years | Full-Time",
    image: "/herosection/course1.png",

    specializations: {
      "Microbiology": {
        summary:
          "Sandip University offers a Bachelor of Science degree with a specialisation in Microbiology. The program runs for three years and six semesters. Students who choose this program acquire in-depth knowledge of a variety of microbiology topics.Students graduating from Sandip University's Bachelor of Science in Microbiology are taught genetics, cell remodeling, ",
        careers: [
          "Clinical Microbiologist",
  "Lab Technician / Lab Manager",
  "Infection Control Officer",
  "Diagnostic Labs (Pathology, Hospitals)"
        ]
      },

      " Forensic Science": {
        summary:
          "One of the top B.Sc forensic science colleges in Nashik, Sandip University offers a Bachelor of Science degree with a specialisation in Forensic Science. The program runs for three years and her six semesters. Students who choose this program acquire in-depth knowledge of a variety of forensic topics.",
        careers: [
          "Forensic Expert",
          "Crime Laboratory Analyst",
          "Drug Analyst",
          "Forensic Toxicologist",
          "Crime Scene Investigator"
        ]
      },

      "Physics": {
        summary:
          "B.Sc. in Physics is one of the most popular undergraduate science degrees, spanning three years and six semesters. This program focuses on the fundamentals of physics and includes relevant topics like quantum mechanics, optics, theory of relativity, nuclear physics, and thermodynamics.",
        careers: [
          "Radiologist Assistant",
          "Radiation Oncologist",
          "Senior Physicist",
          "Consulting Physicist"
        ]
      },

 "Computational Mathematics & Data Science": {
        summary:
          "Sandip University’s B.Sc. in Computational Mathematics and Data Science program is a comprehensive three-year undergraduate program spread across six semesters. Each semester combines the practical applications of computational mathematics with the fundamentals of data science",
        careers: [
          "Data Operations Scientist",
          "Statistician",
          "Quantitative Mathematician",
          "AI Consultant  "
        ]
      },



 "Wine Technology": {
        summary:
          "Sandip University’s B.Sc. in Wine Technology program is a dynamic industry-led undergraduate degree program spanning three years and six semesters. This program aims to provide students with a comprehensive understanding of the process, principles, science, and artistic vision behind winemaking.",
        careers: [
          "Winemaker ",
          "Wine Lab Technician",
          "Vineyard Manager ",
          "Quality Control Specialist "
        ]
      },




 "Nanoscience and Nanotechnology": {
        summary:
          "B.Sc. in Nanoscience and Nanotechnology is a comprehensive undergraduate degree program divided into six semesters across three years. This is a highly specialised program designed to train students in the manipulation of matter at the nanoscale.",
        careers: [
          "Medical Nanotechnologist",
          "Pharmaceutical Scientist",
          "Development Engineer",
          "Research Scientist"
        ]
      },














      "Chemistry": {
        summary:
          "B.Sc. in Chemistry is an advanced undergraduate degree program spread across three years and further divided into six semesters. This is one of the best B.Sc. in Chemistry degrees in Nashik, as its course curriculum is designed to provide students with detailed academic knowledge about the various aspects of chemistry such as organic and inorganic chemistry.",
        careers: [
          "Biomedical Chemist",
          "Lab Chemist",
          "Forensic Chemist",
          "Chemical Associate"
        ]
      }
    },

       eligibility: [
      "Passed 10+2 science or equivalent course from any recognized Board with minimum 45% marks ",
      "Three years Diploma from any recognised Board of Technical Education"
    ]
  },

  

  // ============================
  //        M.Sc
  // ============================
  "M.Sc": {
    title: "Master of Science (M.Sc)",
    duration: "2 Years | Full-Time",
    image: "/herosection/course2.jpg",

    specializations: {
      "Life Science": {
        summary:
          "Sandip University offers a two-year, four-semester Master of Science in Life Sciences course. This program concentrates on research on microorganisms such as viruses, fungi, and various algae, as well as plant, animal, and human life processes. ",
        careers: [
          "Food Scientist",
          "Nutritionist",
          "Product Manager",
          "Project Manager"
        ]
      },
 "Physics": {
        summary:
          "Blessed with beautiful nature and as one of the top M.Sc in Physics colleges in Nashik, Sandip University offers the best learning environment with the spacious classroom and laboratory facilities for the learners. ",
        careers: [
          "Radiologist Assistant",
          "Radiation Oncologist",
          "Senior Physicist",
          "Consulting Physicist"
        ]
      },


"Chemistry (organic / Analytical)": {
        summary:
          "The Sandip University Graduate MSc Organic / Analytical Chemistry Program focuses on the study of various constituents of various organic compounds, including their organic properties, structures, and reactions. ",
        careers: [
           "Biomedical Chemist",
          "Lab Chemist",
          "Forensic Chemist",
          "Chemical Associate"
        ]
      },


"Mathematics": {
        summary:
          "The Department of Mathematics was established at the Sandip School of Science in 2016 with the aim of training individuals towards research and teaching in advanced fields of mathematics.",
        careers: [
           "Mathematician",
          "Data Scientist",
          "Statistician",
          "Investment Analyst"
        ]
      },

"Microbiology": {
        summary:
          "Sandip University offers her a two-year full-time Master's degree in Microbiology divided into her four semesters. Each semester lasts six months, followed by semester tests.  ",
        careers: [
          "Clinical Microbiologist",
  "Lab Technician / Lab Manager",
  "Infection Control Officer",
  "Diagnostic Labs (Pathology, Hospitals)"
        ]
      },















      "Forensic Science": {
        summary:
          "Sandip University has diverse faculties in different areas of science to guide students and direct projects through the complexities of this important field. Sandip University is one of the best universities in Maharashtra.",
        careers: [
          "Analytical Chemist",
          "Biomedical Scientist",
          "Crime Scene Investigator",
          "Detective",
          "Crime Scene Investigator"
        ]
      }
    },

    eligibility: [
      "BSc (any branch) or BE/BTech with Physics and Mathematics courses with aggregate 50% for general category or & 45 % for SC / ST / OBC"
    ]
  }
};




export default function CourseTabs() {
  const [activeTab, setActiveTab] = useState("B.sc");
  const [activeSpec, setActiveSpec] = useState(
    Object.keys(courseData["B.sc"].specializations)[0]
  );
  const [openApply, setOpenApply] = useState(false);
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
                     onClick={() => setOpenApply(true)}
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

                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Choose Specialization
                  </h4>
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

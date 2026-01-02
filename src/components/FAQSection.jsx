import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is the eligibility criteria for B.Pharm. admission at Sandip University’s School of Pharmaceutical Science?",
    a: "The candidate should have passed 10+2 examination or its equivalent examination with English as one of the subjects and Physics, Chemistry, Mathematics or Biology as optional subjects individually.",
  },
  {
    q: "Do I need to appear for any entrance exam or portfolio evaluation for Sandip University’s Pharm. program?",
    a: "Sandip University – School Of Pharmaceutical Science conducts its own entrance examination, SU-DAT, for admission to the B.Des. program. We also accept valid scores from NID, UCEED, and NIFT entrance exams.",
  },
  {
    q: "Do I need to have prior drawing or art skills to apply at Sandip University’s School of Pharmaceutical Science?",
    a: "No, it is not compulsory. Creativity and design thinking ability are more important.",
  },
  {
    q: "Are internships included in the curriculum at Sandip University’s School of Pharmaceutical Science?",
    a: "Yes, the curriculum includes an internship component during the semester.",
  },
  {
    q: "Can I switch my specialization after taking admission at Sandip University’s School of Pharmaceutical Science?",
    a: "Yes, since the 1st year in Design is a foundation year, students can change their specialization depending on seat availability.",
  },
  {
    q: "What is the course duration of the B.Pharm. program at Sandip University?",
    a: "The B. Pharm program is a 4-year course.",
  },
  {
    q: "What is the average salary package for design graduates from Sandip University?",
    a: "Industries offer average salary packages ranging from ₹4 LPA to ₹12 LPA, depending on skills and portfolio.",
  },
  {
    q: "Is hostel accommodation available on the Sandip University campus?",
    a: "Yes, Sandip University provides hostel facilities within the campus.",
  },
];


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-10 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">

  <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-3xl font-semibold tracking-wide text-center text-slate-700 mb-8"
                >
          FAQ's
                </motion.h2>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="w-full">
              
              {/* FAQ HEADER */}
              <button
                className="w-full bg-[#f5f7fa] px-5 py-2 rounded-md flex justify-between items-center"
                onClick={() => toggle(index)}
              >
                <span className="text-lg font-medium text-[#1f2c40]">
                  {item.q}
                </span>

                <span className="text-[#1f3b5f]">
                  {openIndex === index ? (
                    <FaMinus size={18} />
                  ) : (
                    <FaPlus size={18} />
                  )}
                </span>
              </button>

              {/* ANSWER */}
              {openIndex === index && (
                <div className="px-6 py-4 bg-white text-[#34445c] text-base leading-relaxed">
                  {item.a}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

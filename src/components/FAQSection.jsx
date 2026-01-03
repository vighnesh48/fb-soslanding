import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is the eligibility criteria for B.SC. admission at Sandip University’s school of sciences?",
    a: "10 + 2 with Chemistry as compulsory subject and 40 % & 45% aggregate percentage for reserved category and general category respectively",
  },
  {
    q: "What is the eligibility criteria for M.SC. admission at Sandip University’s school of sciences?",
    a: "Graduation from respective stream or equivalent course with minimum 50% marks for open and 45% marks forreserved category students",
  },
  {
    q: " What are the eligibility criteria for UG and PG courses at Sandip University?",
    a: "Eligibility for most UG programs is 10+2 from a reputed educational institution with minimum 50% aggregate marks in the qualifying exam, and the eligibility for most PG programs is an undergraduate degree in the relevant field from a UGC-recognised university with minimum 50% aggregate marks in the qualifying exam. For more information, choose the specific program you prefer to check the eligibility.",
  },
  {
    q: "Are internships included in the curriculum at Sandip University’s school of sciences?",
    a: "Yes, the curriculum includes an internship component during the semester.",
  },
  {
    q: "What is the course duration of the M.sc. program at Sandip University?",
    a: "The M.sc program is a 2-years course.",
  },
  {
    q: "What is the course duration of the B.sc. program at Sandip University?",
    a: "The B. sc program is a 3-years course.",
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

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, ClipboardCheck, Award } from "lucide-react";

const steps = [
  {
    title: "Registration Process",
    description: ["Fill the Online Application Form", "Pay the Application Form Fees"],
    icon: <FileText className="w-8 h-8" />,
     color: "text-emerald-600",
    bg: "bg-emerald-100"
  },
  {
    title: "Selection Process",
    description: ["Round 1 : SU-DAT Exam (Online)", "Round 2 : Portfolio Evaluation & Personal Interview"],
    icon: <ClipboardCheck className="w-8 h-8" />,
    color: "text-purple-600",
    bg: "bg-purple-100"
  },
  {
    title: "Admission Confirmation",
    description: ["Merit List Announcement", "Confirm the Seat by Paying 1st Installment"],
    icon: <Award className="w-8 h-8" />,
     color: "text-orange-600",
    bg: "bg-orange-100"
  },
];

export default function AdmissionsFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 bg-gradient-to-br from-purple-100 via-white to-green-50 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-3xl font-semibold tracking-wide text-center text-slate-700 mb-12"
      >
        Admission Process
      </motion.h2>

      <div className="max-w-6xl mx-auto px-6">
        {/* Responsive Steps Container */}
        <div className="flex flex-wrap md:flex-nowrap justify-center items-start mt-10 gap-10 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-full md:w-1/3 relative">

              {/* Card */}
              <motion.div
                animate={
                  active >= index
                    ? { opacity: 1, scale: index === active ? 1.04 : 1 }
                    : { opacity: 0.4, scale: 1 }
                }
                transition={{ duration: 0.6 }}
                className={`w-full p-3 rounded-2xl shadow-xl border min-h-[220px]
                  ${active >= index ? "bg-white border-indigo-400 shadow-indigo-200" : "bg-white border-gray-200"}`}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className={`p-4 rounded-full ${
                      active >= index ? `${step.bg} ${step.color}` : `${step.bg} ${step.color}`
                    }`}
                  >
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>

                  <ul className="text-sm text-gray-600 space-y-1">
                    {step.description.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Progress Circle */}
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mt-6
                  ${active >= index ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-300 text-gray-700"}`}
                animate={{ scale: index === active ? 1.15 : 1 }}
                transition={{ duration: 0.4 }}
              >
                {index + 1}
              </motion.div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { FaAward, FaTrophy, FaChartLine } from "react-icons/fa";

const achievements = [
  {
    icon: <FaAward size={28} />,
    number: 3.11,
    suffix: " CGPA",
    label: "NAAC Accredited A Grade",
    color: "text-emerald-600",
    bg: "bg-emerald-100"
  },
  {
    icon: <FaTrophy size={28} />,
    number: 4,
    suffix: "th",
    label: "Top Ranking Private University in India",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    icon: <FaChartLine size={28} />,
    number: 1,
    suffix: " Rank",
    label: "Times Engg. Survey 2024 - Research Capability",
    color: "text-orange-600",
    bg: "bg-orange-100"
  },
  {
    icon: <FaChartLine size={28} />,
    number: 4,
    suffix: " Rank",
    label: "Times B-School Ranking Survey 2023",
    color: "text-purple-600",
    bg: "bg-purple-100"
  },
];

export default function Achievements() {
  return (
    <section className="py-12 bg-slate-50 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply opacity-20 blur-3xl translate-x-1/2 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-3xl font-semibold tracking-wide text-center text-slate-700 mb-12"
        >
          Our Achievements
        </motion.h2>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 bg-white shadow-lg rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center">

                {/* Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                  {item.icon}
                </div>

                {/* STATIC Number + Suffix */}
                <h3 className="text-3xl font-extrabold text-slate-700 mb-2 flex items-center justify-center">
                  {item.number}
                  <span className="ml-1 text-slate-700 font-bold">{item.suffix}</span>
                </h3>

                {/* Label */}
                <p className="text-slate-500 font-semibold text-sm md:text-xs uppercase tracking-wide leading-tight">
                  {item.label}
                </p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

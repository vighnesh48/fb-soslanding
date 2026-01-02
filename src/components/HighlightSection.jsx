import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUserTie, FaGlobe, FaCalendarCheck } from "react-icons/fa";

export default function HighlightSection() {
  const stats = [
    {
      icon: <FaUserTie size={28} />, value: 100, suffix: "%", label: "Placement Assistance", color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: <FaGlobe size={28} />, value: 100, suffix: "+", label: "Global Recruitment Partners", color: "text-emerald-600",
      bg: "bg-emerald-100"
    },
    {
      icon: <FaCalendarCheck size={28} />, value: 10, suffix: "+", label: "Annual Campus Placement Drives", color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ];

  const [count, setCount] = useState(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((item, i) =>
      setInterval(() => {
        setCount(prev => {
          const newVal = [...prev];
          if (newVal[i] < item.value) newVal[i] += 1;
          return newVal;
        });
      }, 20)
    );
    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <div className="py-10 bg-white overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-5 px-6 items-center">

        {/* ---------------- LEFT SIDE ---------------- */}
        <div>
          <div className="grid sm:grid-cols-3 gap-8">
            {stats.map((item, i) => (
              <motion.div
  key={i}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="p-6 bg-white rounded-xl shadow-md border border-gray-200 
             flex flex-col items-center justify-between text-center
             min-h-[230px]"   // <-- Fix height alignment
>
  <div className={`${item.bg} ${item.color} w-14 h-14 flex items-center justify-center rounded-full mb-4`}>
    {item.icon}
  </div>

  <h3 className="text-3xl font-extrabold text-gray-900">
    {count[i]}{item.suffix}
  </h3>

  <p className="text-gray-600 mt-2 font-semibold leading-tight">
    {item.label}
  </p>
</motion.div>

            ))}
          </div>
        </div>

        {/* ---------------- RIGHT SIDE IMAGE ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center items-center md:pl-10"
        >
          <img
            src="/herosection/packageimg.webp"
            alt="Placement Highlight"
            className="rounded-2xl shadow-xl w-full object-cover lg:w-[500px]"
          />
        </motion.div>

      </div>
    </div>
  );
}

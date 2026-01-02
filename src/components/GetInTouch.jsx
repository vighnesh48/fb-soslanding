import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

export default function GetInTouch() {
      const [openModal, setOpenModal] = useState(false);

  return (
    <section className="w-full py-5 bg-gradient-to-br from-purple-100 via-white to-green-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <button
                      onClick={() => setOpenModal(true)}

        className="mt-5 px-8 py-3 bg-[#0E1B50] text-white rounded-full text-sm font-semibold hover:bg-[#183195] transition">
            Get In Touch
          </button>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-sm rounded-xl p-4 flex flex-col items-center gap-2 border hover:shadow-md transition"
          >
            <div className="bg-orange-100 p-2 rounded-full">
              <Mail className="w-7 h-7 text-orange-600  " />
              </div>
            <h3 className="font-medium text-gray-800 text-sm">Email</h3>
             <a
          href="mailto:info@sandipuniversity.edu.in"
className="text-sm text-gray-600">        
          info@sandipuniversity.edu.in
        </a>
          </motion.div>

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-sm rounded-xl p-4 flex flex-col items-center gap-2 border hover:shadow-md transition"
          >
                       <div className="bg-emerald-100 p-2 rounded-full">
 <MapPin className="w-7 h-7 text-emerald-600" />
 </div>
            <h3 className="font-medium text-gray-800 text-sm">Address</h3>
            <p className="text-xs text-gray-600 text-center">Trimbak Road, Nashik, Maharashtra, India</p>
          </motion.div>

          {/* Call Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-sm rounded-xl p-4 flex flex-col items-center gap-2 border hover:shadow-md transition"
          >
                                   <div className="bg-purple-100  p-2 rounded-full">

            <Phone className="w-7 h-7 text-purple-600 " />
            </div>
            <h3 className="font-medium text-gray-800 text-sm">Call</h3>
             <a
             className="text-sm text-gray-600"
          href="tel:+919545453092"
        >
          +91 9545453092
        </a>
          </motion.div>
        </div>
      </div>
            <EnquiryModal open={openModal} onClose={() => setOpenModal(false)} />
      
    </section>
  );
}

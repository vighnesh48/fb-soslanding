import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/918956374111?text=Can%20I%20get%20details%20of%20SOS%20Courses?%20"  // replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-4 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
    >
      <FaWhatsapp className="text-white" size={28} />
    </a>
  );
}

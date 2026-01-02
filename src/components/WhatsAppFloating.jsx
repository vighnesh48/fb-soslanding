import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/919545453092"  // replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-4 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
    >
      <FaWhatsapp className="text-white" size={28} />
    </a>
  );
}

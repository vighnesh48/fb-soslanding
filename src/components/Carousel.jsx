import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons

const items = [
  {
    id: 1,
    img: "herosection/campus-1.jpg",
    title: "Vibrant Campus Atmosphere",
    desc: "Experience an energetic campus filled with learning, culture",
  },
  {
    id: 2,
    img: "herosection/classroom-1.jpg",
    title: "Modern Classrooms",
    desc: "Well-equipped digital classrooms designed for interactive learning.",
  },
  {
    id: 3,
    img: "herosection/labimg.jpg",
    title: "Advanced Labs",
    desc: "State-of-the-art laboratories for hands-on experiments and innovation.",
  },
  {
    id: 4,
    img: "herosection/studentActivities.jpg",
    title: "Student Activities",
    desc: "Cultural festivals, sports, clubs, and various student-led initiatives.",
  },
  {
    id: 5,
    img: "herosection/library.jpg",
    title: "Library & Research Center",
    desc: "A huge digital + physical library supporting academic and research needs.",
  },
  {
    id: 6,
    img: "herosection/hostel.jpg",
    title: "Hostel & Accommodation",
    desc: "Comfortable, secure hostel facilities that feel like a second home.",
  },
  {
  id: 7,
  img: "herosection/securityimg.webp",
  title: "24×7 Security",
  desc: "Round-the-clock surveillance with advanced monitoring systems.",
},
{
  id: 8,
  img: "herosection/gym.webp",
  title: "Gymnasium",
  desc: "Modern fitness center with advanced workout machines.",
},
{
  id: 9,
  img: "herosection/canteen.webp",
  title: "Hygienic Canteens",
  desc: "Clean and well-maintained canteens offering healthy food options.",
},
{
  id: 10,
  img: "herosection/salon.webp",
  title: "Salon",
  desc: "Professional grooming and beauty services available on campus.",
},
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const timerRef = useRef(null);

  const cardsToShow = 2; // Number of cards displayed at once

  // Function to reset the auto-scroll timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 4000); // 3 seconds interval
  };

  const nextSlide = () => {
    setDirection("next");
    // Move index forward by cardsToShow, looping back to the start
    setIndex((prev) => (prev + cardsToShow) % items.length);
    resetTimer();
  };

  const prevSlide = () => {
    setDirection("prev");
    // Move index backward by cardsToShow, handling negative results by adding items.length
    setIndex((prev) => (prev - cardsToShow + items.length) % items.length);
    resetTimer();
  };

  // Setup and cleanup for the auto-scroll timer
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  // Determine which cards should be visible based on the current index
  const visibleCards = [
    items[index],
    items[(index + 1) % items.length], // The card immediately following the start index
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 pt-2">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-3xl font-semibold tracking-wide text-center text-slate-700 mb-8"
      >
        Campus Life
      </motion.h2>

      <div className="overflow-hidden relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 md:top-[37%] -translate-y-1/2 z-10 p-3 bg-white/70 hover:bg-white rounded-full shadow-lg transition-colors duration-300 ml-2"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-6 w-6 text-slate-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 md:top-[37%] -translate-y-1/2 z-10 p-3 bg-white/70 hover:bg-white rounded-full shadow-lg transition-colors duration-300 mr-2"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-6 w-6 text-slate-700" />
        </button>

        {/* Card Container for Smooth Animation */}
        <div
          // Grid setup remains the same
          className={`
            grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4
            transition-transform duration-500 ease-out
          `}
          // The inline style for transform is simplified since the animation
          // is primarily handled by the Tailwind utility classes applied to the individual cards.
          // Note: The original 'translate-x-0' classes and inline styles were redundant/ineffective 
          // without a container for the *full* set of cards or a keyframe animation utility. 
          // The Tailwind classes below assume you have defined `animate-slideNext` and 
          // `animate-slidePrev` in your CSS (e.g., in a `tailwind.config.js` file).
        >
          {visibleCards.map((item, i) => (
            <div
              key={item.id}
              className={`
                bg-white rounded-2xl shadow-xl overflow-hidden 
                transition-all duration-500 
                // Apply the animation class based on direction
                ${direction === "next" ? "animate-slideNext" : "animate-slidePrev"}
              `}
            >
              <img
                src={item.img}
                className="h-80 w-full object-cover rounded-2xl"
                alt={item.title}
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// **Important:** This solution requires the `lucide-react` package for icons.
// You can install it with: `npm install lucide-react` or `yarn add lucide-react`
// Also, ensure your Tailwind CSS is configured with the keyframe animations 
// (e.g., `animate-slideNext` and `animate-slidePrev`) for the smooth transition effect.

import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    content: "Switching to an EV for my daily commute has cut my travel expenses by 60%. I no longer worry about rising fuel costs, and the 'Green Stride' community keeps me motivated.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 2,
    name: "Rahul Varma",
    role: "Marketing Professional",
    content: "I started carpooling with my colleagues through this initiative. Not only am I saving money, but the reduced stress of navigating Bengaluru traffic is a game-changer!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Healthcare Worker",
    content: "As someone with asthma, I've noticed the air quality improving in our neighborhood as more people join this movement. My early morning hospital commute is now something I look forward to.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 4,
    name: "Vikram Choudhary",
    role: "IT Manager",
    content: "The gamification aspect makes it fun to track my environmental impact. My kids love seeing how many 'virtual trees' we've planted through my eco-friendly commuting choices.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        handleNext();
      }, 6000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [activeIndex, isPaused]);

  return (
    <section id="stories" className="py-16 bg-eco-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real <span className="eco-text-gradient">Commuter Stories</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Hear from Bengaluru residents who have embraced eco-friendly 
            commuting options and are experiencing the benefits.
          </p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-eco-light">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-grow text-center md:text-left">
                        <Quote className="h-8 w-8 text-eco-secondary opacity-30 mb-2 mx-auto md:mx-0" />
                        <p className="text-gray-700 italic mb-4">
                          "{testimonial.content}"
                        </p>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-eco-primary focus:outline-none focus:ring-2 focus:ring-eco-primary"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-eco-primary focus:outline-none focus:ring-2 focus:ring-eco-primary"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  activeIndex === index
                    ? "bg-eco-primary w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

import React, { useEffect, useState } from "react";
import { ArrowDown, Bike, Car, Leaf, TreeDeciduous, Info, BadgeCheck, Wind, CloudRain, Sparkles } from "lucide-react";
import CTAButton from "./CTAButton";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showFactCard, setShowFactCard] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const isMobile = useIsMobile();

  const ecoFacts = [
    "The average Bengaluru commuter spends 243 hours in traffic each year",
    "EVs reduce emissions by up to 70% compared to petrol vehicles in Bengaluru",
    "Choosing public transport saves around 2.5 tons of CO₂ per person annually",
    "Air pollution causes 1.2 million premature deaths in India each year",
    "Switching to EVs can improve local air quality by up to 30%"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    const timer = setTimeout(() => {
      setShowFactCard(true);
    }, 1000);
    
    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % ecoFacts.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearInterval(factInterval);
    };
  }, [ecoFacts.length]);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  const stats = [
    { icon: <Bike className="h-8 w-8 text-eco-primary" />, label: "Eco-Friendly" },
    { icon: <TreeDeciduous className="h-8 w-8 text-eco-primary" />, label: "50K+ Trees Saved" },
    { icon: <Car className="h-8 w-8 text-eco-primary" />, label: "10K+ EV Rides" },
    { icon: <BadgeCheck className="h-8 w-8 text-eco-primary" />, label: "Healthier Air" }
  ];

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-eco-light via-white to-eco-light/30"></div>
      <div className="absolute inset-0 -z-5 bg-[url('/lovable-uploads/20762f01-3c5c-45fb-b976-5d7207e9bc0a.png')] bg-cover bg-center opacity-10"></div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 -z-5 bg-[url('/lovable-uploads/20762f01-3c5c-45fb-b976-5d7207e9bc0a.png')] bg-repeat-x bg-bottom opacity-15"></div>
      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(isMobile ? 6 : 12)].map((_, i) => (
          <Leaf
            key={i}
            className="absolute text-eco-primary/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 5}s`
            }}
          />
        ))}
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <Sparkles
            key={i + 'sparkle'}
            className="absolute text-amber-400/30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 8}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
      
      <div className={`fixed z-50 ${isMobile 
        ? 'bottom-4 left-4 right-4 max-w-md mx-auto' 
        : 'right-10 top-32 max-w-xs'
      } bg-white/95 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-700 transform ${
        showFactCard && infoVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}>
        <div className="p-4 bg-gradient-to-br from-eco-light to-white rounded-xl border border-eco-primary/20">
          <div className="flex items-start gap-3">
            <button 
              onClick={toggleInfo}
              className="bg-eco-primary rounded-full p-2 shrink-0 transition-transform hover:scale-105 active:scale-95"
            >
              <Info className="h-5 w-5 text-white" />
            </button>
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">Did you know?</h4>
              <p className="text-sm text-gray-600 min-h-[3rem] animate-fade-in">
                {ecoFacts[currentFact]}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-3 gap-1.5">
            {ecoFacts.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  currentFact === index ? "bg-eco-primary w-3" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <span className="eco-text-gradient inline-block">Breathe Better</span>
            <span className="text-bengaluru-skyline block md:inline"> Bengaluru</span>
          </h1>
          
          <p className={`text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            Turn your daily commute into a green statement
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-4 mb-12 transition-all duration-1000 delay-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <CTAButton 
              withPulse 
              variant="primary" 
              size="lg"
              onClick={() => {
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Calculate Your Impact
            </CTAButton>
            <CTAButton 
              variant="secondary" 
              size="lg"
              onClick={() => {
                document.getElementById('pledge')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Join the Movement
            </CTAButton>
          </div>
          
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 transition-all duration-1000 delay-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center transform transition-all hover:scale-110 duration-300"
              >
                <div className="bg-eco-light p-4 rounded-full mb-3 shadow-md">
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`flex justify-center mt-8 md:mt-12 transition-all duration-1000 delay-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <a 
            href="#calculator" 
            className="flex flex-col items-center text-gray-500 hover:text-eco-primary transition-colors animate-bounce"
          >
            <span className="text-sm mb-2">Discover More</span>
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

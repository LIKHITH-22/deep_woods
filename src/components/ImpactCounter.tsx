
import React, { useState, useEffect, useRef } from "react";
import { Car, Leaf, TreeDeciduous, BadgeCheck, Wind, Droplets } from "lucide-react";

const ImpactCounter = () => {
  // In a real app, these would come from an API
  const [statistics, setStatistics] = useState({
    co2Saved: 0,
    evRides: 0,
    participants: 0,
    treesEquivalent: 0,
    airQualityImprovement: 0,
    healthImpactScore: 0,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if element is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only start animation when component is visible
    if (!isVisible) return;
    
    // Simulate loading data
    const simulatedData = {
      co2Saved: 57800, // kg
      evRides: 15420, 
      participants: 3250,
      treesEquivalent: 2627,
      airQualityImprovement: 8.4, // percent improvement
      healthImpactScore: 4350, // arbitrary score
    };

    // Animate counting up
    const animateCounting = () => {
      const duration = 2000; // ms
      const steps = 50;
      const stepTime = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep += 1;
        const progress = currentStep / steps;
        
        setStatistics({
          co2Saved: Math.floor(simulatedData.co2Saved * progress),
          evRides: Math.floor(simulatedData.evRides * progress),
          participants: Math.floor(simulatedData.participants * progress),
          treesEquivalent: Math.floor(simulatedData.treesEquivalent * progress),
          airQualityImprovement: parseFloat((simulatedData.airQualityImprovement * progress).toFixed(1)),
          healthImpactScore: Math.floor(simulatedData.healthImpactScore * progress),
        });
        
        if (currentStep === steps) {
          clearInterval(timer);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    };
    
    const timeoutId = setTimeout(animateCounting, 500);
    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  const stats = [
    {
      name: "CO₂ Emissions Saved",
      value: statistics.co2Saved.toLocaleString(),
      unit: "kg",
      icon: <Leaf className="h-8 w-8 text-eco-primary" />,
    },
    {
      name: "EV Rides Taken",
      value: statistics.evRides.toLocaleString(),
      unit: "",
      icon: <Car className="h-8 w-8 text-eco-primary" />,
    },
    {
      name: "Active Participants",
      value: statistics.participants.toLocaleString(),
      unit: "",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-eco-primary">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>,
    },
    {
      name: "Trees Equivalent",
      value: statistics.treesEquivalent.toLocaleString(),
      unit: "",
      icon: <TreeDeciduous className="h-8 w-8 text-eco-primary" />,
    },
    {
      name: "Air Quality Improved",
      value: statistics.airQualityImprovement.toString(),
      unit: "%",
      icon: <Wind className="h-8 w-8 text-eco-primary" />,
    },
    {
      name: "Health Impact Score",
      value: statistics.healthImpactScore.toLocaleString(),
      unit: "",
      icon: <BadgeCheck className="h-8 w-8 text-eco-primary" />,
    },
  ];

  return (
    <section id="impact" className="py-16 relative overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-eco-light opacity-70"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float opacity-10">
        <Leaf className="h-24 w-24 text-eco-secondary" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float opacity-10" style={{ animationDelay: "1.5s" }}>
        <TreeDeciduous className="h-32 w-32 text-eco-primary" />
      </div>
      
      {/* Animated air particles */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-eco-primary opacity-5 animate-float"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4" ref={counterRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Collective <span className="eco-text-gradient">Impact</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Together, Bengaluru's eco-commuters are making a significant difference. 
            Watch our impact grow in real-time as more people join the movement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`eco-card p-6 flex flex-col items-center text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 transform transition-transform hover:scale-110 duration-300">
                {stat.icon}
              </div>
              <div className="flex items-baseline justify-center">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.value}
                </span>
                <span className="ml-1 text-xl text-gray-600">{stat.unit}</span>
              </div>
              <p className="mt-2 text-gray-600">{stat.name}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block rounded-full bg-eco-light px-4 py-2 text-sm text-gray-700 mb-3 animate-pulse-green">
            Updated in real-time
          </div>
          <p className="text-gray-600">
            Every green commute choice adds to our collective impact. 
            Join us and see these numbers grow!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactCounter;

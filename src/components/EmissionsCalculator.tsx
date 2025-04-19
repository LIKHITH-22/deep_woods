import React, { useState, useEffect } from "react";
import { Icon } from "lucide-react";
import CTAButton from "./CTAButton";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { CustomSlider } from "./ui/custom-slider";
import { vehicleOptions, type VehicleType } from "@/utils/emissions";
import { Leaf, AlertTriangle, Droplets, Wind, CloudRain, Sparkles, BarChart3, Info } from "lucide-react";

const EmissionsCalculator = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>("petrol");
  const [distance, setDistance] = useState<number>(10);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [savings, setSavings] = useState<{
    co2: number;
    trees: number;
    petrolImpact: number;
    petrolEmissions: {
      co2: number;
      particulates: number;
      nox: number;
    }
  }>({
    co2: 0,
    trees: 0,
    petrolImpact: 0,
    petrolEmissions: {
      co2: 0,
      particulates: 0,
      nox: 0
    }
  });
  const [animateResults, setAnimateResults] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
      observer.observe(calculatorElement);
    }
    
    return () => observer.disconnect();
  }, []);

  const calculateEmissions = () => {
    const selectedOption = vehicleOptions.find(
      (option) => option.id === selectedVehicle
    );
    const petrolOption = vehicleOptions.find((option) => option.id === "petrol");

    if (!selectedOption || !petrolOption) return;

    const annualDistance = distance * daysPerWeek * 2 * 52; // km per year (round trips)
    const co2Savings = (petrolOption.co2PerKm - selectedOption.co2PerKm) * annualDistance / 1000;
    const treeEquivalent = Math.round(co2Savings / 22); // Each tree absorbs ~22kg CO2 per year

    const selectedEmissions = {
      co2: Math.round(selectedOption.co2PerKm * annualDistance / 1000),
      particulates: parseFloat((selectedOption.particulates * annualDistance / 1000).toFixed(3)),
      nox: parseFloat((selectedOption.nox * annualDistance / 1000).toFixed(3))
    };

    const healthImpact = Math.round(
      (selectedEmissions.co2 * 0.001) + 
      (selectedEmissions.particulates * 100) + 
      (selectedEmissions.nox * 10)
    );

    setSavings({
      co2: Math.round(co2Savings),
      trees: treeEquivalent,
      petrolImpact: healthImpact,
      petrolEmissions: selectedEmissions // Now we use the selected vehicle's emissions
    });

    setShowResults(true);
    setAnimateResults(false);
    setTimeout(() => setAnimateResults(true), 100);
  };

  return (
    <section id="calculator" className="py-16 bg-gradient-to-b from-eco-light to-white overflow-hidden relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(isMobile ? 5 : 10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-eco-primary opacity-5 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="inline-flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-eco-primary mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Calculate Your <span className="eco-text-gradient">Green Impact</span>
              </h2>
            </div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              See how much CO₂ you can save by choosing eco-friendly commuting options and the impact 
              your current transportation has on the environment
            </p>
          </div>

          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 transform ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`} style={{ transitionDelay: "200ms" }}>
            <div className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-eco-primary to-eco-secondary"></div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-eco-light/50 p-5 rounded-xl">
                      <label className="block text-gray-700 font-medium mb-3">
                        Your Commute Vehicle
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {vehicleOptions.map((option) => {
                          const IconComponent = option.icon === "car" ? 
                             option.id === "petrol" || option.id === "diesel" ? 
                               ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                               : null
                             : option.icon === "bus" ? 
                               ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
                             : option.icon === "bike" ? 
                               ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                             : option.icon === "car-taxi-front" ? 
                               ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2h4"/><path d="M14 8v2.4a2 2 0 0 1-.6 1.4L12 13.2a2 2 0 0 1-1.4.6H8"/><path d="M16 8h1.5a2 2 0 0 1 2 2v1l-1.8 1.2a2 2 0 0 0-.7 2.8l.7 1"/><path d="M8 8H6.5a2 2 0 0 0-2 2v1l1.8 1.2a2 2 0 0 1 .7 2.8l-.7 1"/><path d="M7 17h10v3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3Z"/><path d="M5 11h14"/></svg>
                             : option.icon === "zap" ? 
                               ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 20h1.2a2 2 0 0 0 2-2v-1.8A2 2 0 0 0 18 14h-3.8"/><path d="M12 18.5V18a2 2 0 0 1 2-2h3.879a2 2 0 0 0 1.636-3.15l-1.438-1.725a2 2 0 0 0-1.685-.729c-.244.02-.481.098-.693.224L14 12"/><path d="m6 16 1.5-2a2 2 0 0 1 1.17-.87"/><path d="M4 16a2 2 0 0 0 2 2h.5"/><path d="M10 23a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2"/><path d="M8 15h1.5a2 2 0 0 0 1.5-.67l.243-.333a2 2 0 0 1 1.5-.67h.4"/><path d="M15 4V2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2l-4 2v3h14V6Z"/><path d="M10 4.5V6"/><path d="M14 4.5V6"/></svg>
                             : null;
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => setSelectedVehicle(option.id)}
                              className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all",
                                selectedVehicle === option.id
                                  ? "border-eco-primary bg-eco-light text-eco-primary shadow-md scale-105"
                                  : "border-gray-200 hover:border-eco-secondary bg-white"
                              )}
                            >
                              <div className={cn(
                                "p-2 rounded-full",
                                selectedVehicle === option.id ? "bg-eco-primary/10" : "bg-gray-100"
                              )}>
                                {IconComponent && <IconComponent className="h-6 w-6" />}
                              </div>
                              <span className="mt-2 text-sm font-medium text-center">
                                {option.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-eco-light/50 p-5 rounded-xl">
                      <label className="block text-gray-700 font-medium mb-3">
                        One-way Distance (km)
                      </label>
                      <CustomSlider
                        value={distance}
                        min={1}
                        max={50}
                        onChange={(value) => setDistance(value)}
                        className="w-11/12 mx-auto"
                        markers={[
                          { value: 1, label: "1 km" },
                          { value: 25, label: "25 km" },
                          { value: 50, label: "50 km" }
                        ]}
                        valueSuffix=" km"
                      />
                    </div>

                    <div className="bg-eco-light/50 p-5 rounded-xl">
                      <label className="block text-gray-700 font-medium mb-3">
                        Commute Days per Week
                      </label>
                      <div className="flex justify-between items-center">
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                          <button
                            key={day}
                            onClick={() => setDaysPerWeek(day)}
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                              daysPerWeek === day
                                ? "bg-eco-primary text-white shadow-md scale-110"
                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            )}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    <CTAButton 
                      onClick={calculateEmissions} 
                      className="w-full"
                      size="lg"
                      withPulse
                    >
                      Calculate My Impact
                    </CTAButton>
                  </div>

                  <div className={cn(
                    "bg-gradient-to-br from-eco-light/80 to-eco-light/30 rounded-xl p-6 transition-all duration-500",
                    showResults ? "opacity-100" : "opacity-60"
                  )}>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Leaf className="mr-2 h-5 w-5 text-eco-primary" />
                      Your Annual Impact
                    </h3>

                    {showResults ? (
                      <div className="space-y-6">
                        <div className={cn(
                          "bg-white rounded-lg p-4 shadow-sm transition-all duration-700 relative overflow-hidden",
                          animateResults ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        )} style={{ transitionDelay: "0ms" }}>
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eco-primary to-eco-secondary"></div>
                          <div className="text-sm text-gray-500 mb-1">By choosing {vehicleOptions.find(v => v.id === selectedVehicle)?.name}</div>
                          <div className="text-3xl font-bold text-eco-primary">
                            {savings.co2.toLocaleString()} kg CO₂
                          </div>
                          <div className="text-sm text-gray-500 mt-1">saved per year compared to petrol car</div>
                        </div>

                        <div className={cn(
                          "flex items-center justify-center py-4 transition-all duration-700",
                          animateResults ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        )} style={{ transitionDelay: "150ms" }}>
                          <div className="text-center relative">
                            <div className="absolute -inset-1 opacity-30 bg-eco-primary rounded-full blur-lg animate-pulse-green"></div>
                            <div className="text-6xl font-bold eco-text-gradient mb-2 relative">
                              {savings.trees}
                            </div>
                            <div className="text-gray-700">
                              Equivalent trees planted per year
                            </div>
                          </div>
                        </div>

                        <div className={cn(
                          "bg-amber-50 rounded-lg p-4 shadow-sm border-l-4 border-amber-500 transition-all duration-700",
                          animateResults ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        )} style={{ transitionDelay: "300ms" }}>
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                            Petrol Car Impact
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 flex items-center">
                                <Leaf className="h-4 w-4 mr-1 text-eco-primary" /> CO₂ Emissions
                              </span>
                              <span className="font-bold text-gray-800">{savings.petrolEmissions.co2.toLocaleString()} kg/year</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 flex items-center">
                                <Droplets className="h-4 w-4 mr-1 text-blue-500" /> Particulate Matter
                              </span>
                              <span className="font-bold text-gray-800">{savings.petrolEmissions.particulates} kg/year</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 flex items-center">
                                <Wind className="h-4 w-4 mr-1 text-gray-500" /> Nitrogen Oxides
                              </span>
                              <span className="font-bold text-gray-800">{savings.petrolEmissions.nox} kg/year</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-amber-200">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">Health Impact Score</span>
                                <div className="flex items-center">
                                  <span className="font-bold text-amber-600">{savings.petrolImpact}</span>
                                  <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"
                                      style={{ width: `${Math.min(100, savings.petrolImpact / 10)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Higher score indicates greater potential for negative health effects
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className={cn(
                          "bg-white rounded-lg p-4 shadow-sm flex items-center transition-all duration-700",
                          animateResults ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        )} style={{ transitionDelay: "450ms" }}>
                          <CloudRain className="h-10 w-10 text-eco-primary/80 mr-4" />
                          <div>
                            <div className="font-medium">If everyone in your office did this:</div>
                            <div className="text-eco-primary font-bold">
                              {(savings.co2 * 50).toLocaleString()} kg CO₂ saved annually
                            </div>
                            <div className="text-xs text-gray-500">That's like taking {Math.round((savings.co2 * 50) / 4600)} cars off the road!</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-4">
                        <div className="bg-white/80 p-6 rounded-xl shadow-sm">
                          <Info className="h-12 w-12 mb-4 opacity-30 mx-auto" />
                          <p>Select your commute details and calculate to see your environmental impact.</p>
                          <p className="text-xs mt-2 text-eco-primary">We'll compare your choice with petrol cars to show the difference you can make!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {showResults && (
            <div className="mt-8 text-center animate-fade-in">
              <p className="text-gray-600 mb-2">Proud of your impact? Share it with your friends!</p>
              <div className="flex justify-center gap-3">
                <button className="bg-[#25D366] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </button>
                <button className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </button>
                <button className="bg-[#0e76a8] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmissionsCalculator;

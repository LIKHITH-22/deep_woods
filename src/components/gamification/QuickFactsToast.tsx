import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Sparkles, Info, Leaf, Bike, Car, TreeDeciduous, Wind } from 'lucide-react';

// Environmental facts about Bengaluru and EVs
const facts = [
  {
    text: "EVs reduce emissions by up to 70% compared to petrol vehicles in Bengaluru",
    icon: <Car className="text-eco-primary" />,
  },
  {
    text: "The average Bengaluru commuter spends 243 hours in traffic each year",
    icon: <Info className="text-bengaluru-purple" />,
  },
  {
    text: "Electric scooters can help you navigate Bengaluru traffic 30% faster",
    icon: <Bike className="text-bengaluru-blue" />,
  },
  {
    text: "Choosing public transport saves around 2.5 tons of CO₂ per person annually",
    icon: <Leaf className="text-eco-primary" />,
  },
  {
    text: "Air pollution causes 1.2 million premature deaths in India each year",
    icon: <Wind className="text-red-500" />,
  },
  {
    text: "Bengaluru has over 10,000 public EV charging points within the city",
    icon: <Sparkles className="text-yellow-500" />,
  },
  {
    text: "One tree absorbs about 22kg of CO₂ per year - equivalent to a 150km EV ride",
    icon: <TreeDeciduous className="text-green-600" />,
  },
];

export const QuickFactsToast = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  
  // Show a random fact initially
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setCurrentFactIndex(randomIndex);
    
    showFact(randomIndex);
    
    // Show a new fact every 45 seconds
    const interval = setInterval(() => {
      const newIndex = (currentFactIndex + 1) % facts.length;
      setCurrentFactIndex(newIndex);
      showFact(newIndex);
    }, 45000);
    
    return () => clearInterval(interval);
  }, []);
  
  const showFact = (index: number) => {
    const fact = facts[index];
    
    const toastId = toast.custom((t: any) => (
      <div 
        className={`${
          t?.visible 
            ? 'animate-in fade-in slide-in-from-bottom-3' 
            : 'animate-out fade-out slide-out-to-bottom-3'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col overflow-hidden border border-eco-primary/20`}
      >
        <div className="flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="h-10 w-10 rounded-full bg-eco-light flex items-center justify-center">
                {fact.icon}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Did you know?
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {fact.text}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between">
          <button
            type="button"
            className="text-xs text-gray-700 hover:text-gray-500"
            onClick={() => {
              if (t?.id) {
                toast.dismiss(t.id);
              }
            }}
          >
            Dismiss
          </button>
          <span className="text-xs text-eco-primary flex items-center">
            <Sparkles className="h-3 w-3 mr-1" /> Eco Facts
          </span>
        </div>
      </div>
    ), { duration: 8000 });
    
    return toastId;
  };
  
  return null;
};


import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type EmojiOption = {
  emoji: string;
  label: string;
  value: string;
  color: string;
};

const emojiOptions: EmojiOption[] = [
  { emoji: "😍", label: "Absolutely!", value: "absolutely", color: "bg-green-500" },
  { emoji: "🙂", label: "Probably", value: "probably", color: "bg-green-400" },
  { emoji: "🤔", label: "Maybe", value: "maybe", color: "bg-yellow-400" },
  { emoji: "😕", label: "Unlikely", value: "unlikely", color: "bg-orange-400" },
  { emoji: "😞", label: "No way", value: "no", color: "bg-red-500" },
];

export const FeedbackPoll = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({
    absolutely: 68,
    probably: 23,
    maybe: 7,
    unlikely: 1,
    no: 1,
  });
  const { toast } = useToast();
  
  const handleVote = (value: string) => {
    if (selected === value) return;
    
    setSelected(value);
    
    // Update results (in a real app, this would be sent to a backend)
    setResults(prev => ({
      ...prev,
      [value]: prev[value] + 1
    }));
    
    // Show thank you toast
    toast({
      title: "Thanks for your feedback!",
      description: "Your response helps us understand EV adoption better."
    });
    
    // Show results after a small delay
    setTimeout(() => {
      setShowResults(true);
    }, 500);
  };
  
  const getTotalVotes = () => {
    return Object.values(results).reduce((sum, count) => sum + count, 0);
  };
  
  const getPercentage = (value: string) => {
    const total = getTotalVotes();
    return total > 0 ? Math.round((results[value] / total) * 100) : 0;
  };
  
  return (
    <section className="py-10 px-4 bg-eco-primary/5">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-eco-primary text-white py-3 px-4 text-center">
          <h3 className="text-lg font-medium">Quick Poll</h3>
        </div>
        
        <div className="p-6">
          <h4 className="text-xl text-center font-medium text-gray-800 mb-6">
            Will you choose an EV for your next ride?
          </h4>
          
          <div className="grid grid-cols-5 gap-2 mb-8">
            {emojiOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleVote(option.value)}
                className={cn(
                  "flex flex-col items-center transition-all p-2 rounded-lg",
                  selected === option.value 
                    ? "bg-eco-light scale-110 shadow-md" 
                    : "hover:bg-gray-50"
                )}
              >
                <span className="text-3xl mb-1">{option.emoji}</span>
                <span className="text-xs text-gray-700">{option.label}</span>
              </button>
            ))}
          </div>
          
          {showResults && (
            <div className="mt-6 bg-eco-light/50 rounded-lg p-4 animate-fade-in">
              <h5 className="text-center text-sm font-medium text-gray-700 mb-4">
                Community Results ({getTotalVotes()} votes)
              </h5>
              
              <div className="space-y-3">
                {emojiOptions.map((option) => (
                  <div key={option.value} className="relative">
                    <div className="flex justify-between text-xs text-gray-700 mb-1">
                      <span className="flex items-center">
                        <span className="mr-1">{option.emoji}</span> 
                        {option.label}
                      </span>
                      <span>{getPercentage(option.value)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={cn("h-full transition-all duration-1000", option.color)} 
                        style={{ width: `${getPercentage(option.value)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                Thanks for participating! Your feedback helps us improve.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

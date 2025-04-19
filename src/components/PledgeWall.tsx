
import React, { useState } from "react";
import { CheckCircle2, Heart, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CTAButton from "./CTAButton";

interface Pledge {
  id: number;
  name: string;
  message: string;
  date: string;
}

// Sample pledges - in a real app, these would come from a database
const initialPledges: Pledge[] = [
  {
    id: 1,
    name: "Kiran M.",
    message: "I pledge to use BMTC buses twice a week instead of my car.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Deepa S.",
    message: "Committed to carpooling with my team for all office commutes!",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Ajay R.",
    message: "Just bought an electric scooter. No more petrol for me!",
    date: "3 days ago",
  },
  {
    id: 4,
    name: "Meera J.",
    message: "Will walk for all trips under 1km. Small change, big impact!",
    date: "5 days ago",
  },
  {
    id: 5,
    name: "Rohan P.",
    message: "Taking the metro daily and enjoying reading time during commute.",
    date: "1 day ago",
  },
];

const PledgeWall = () => {
  const [pledges, setPledges] = useState<Pledge[]>(initialPledges);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === "" || message.trim() === "") {
      toast({
        title: "Error",
        description: "Please fill in both name and message",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPledge: Pledge = {
        id: Date.now(),
        name: name.trim(),
        message: message.trim(),
        date: "Just now",
      };
      
      setPledges([newPledge, ...pledges]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
      
      toast({
        title: "Pledge Added",
        description: "Thank you for joining the green movement!",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <section id="pledge" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join The <span className="eco-text-gradient">Green Pledge</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Make a public commitment to eco-friendly commuting and inspire others. 
              Your small changes add up to a big difference for Bengaluru's air quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <Heart className="text-eco-primary mr-2 h-5 w-5" />
                  Make Your Pledge
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="How should we call you?"
                      className="eco-input w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={30}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Green Pledge
                    </label>
                    <textarea
                      id="message"
                      placeholder="I pledge to..."
                      className="eco-input w-full min-h-[100px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={150}
                    />
                    <p className="text-xs text-right text-gray-500 mt-1">
                      {message.length}/150 characters
                    </p>
                  </div>
                  
                  <CTAButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      "Adding your pledge..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit My Pledge
                      </>
                    )}
                  </CTAButton>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-eco-light rounded-xl p-6">
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <CheckCircle2 className="text-eco-primary mr-2 h-5 w-5" />
                  Green Pledge Wall
                </h3>
                
                <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  <div className="space-y-3">
                    {pledges.map((pledge) => (
                      <div
                        key={pledge.id}
                        className="bg-white rounded-lg p-4 shadow-sm"
                      >
                        <p className="text-gray-800 mb-2">{pledge.message}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-eco-primary">
                            {pledge.name}
                          </span>
                          <span className="text-gray-500">{pledge.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">
              Each pledge represents a personal commitment to improving 
              Bengaluru's air quality. Join hundreds of fellow citizens 
              making a difference, one commute at a time.
            </p>
            <CTAButton 
              variant="secondary" 
              size="lg"
              onClick={() => {
                toast({
                  title: "Coming Soon!",
                  description: "The mobile app is under development. We'll notify you when it launches!",
                });
              }}
            >
              Download Our Mobile App
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PledgeWall;

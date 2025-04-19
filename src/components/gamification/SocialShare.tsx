
import React, { useState } from 'react';
import { Share2, Camera, MessageCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const SocialShare = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const handleShare = (platform: string) => {
    // In a real app, this would use the Web Share API or platform-specific sharing
    toast({
      title: `Share to ${platform}`,
      description: "Your eco-impact has been prepared for sharing!",
    });
    
    setIsExpanded(false);
  };
  
  return (
    <div className="py-8 px-4">
      <div className="max-w-md mx-auto bg-gradient-to-br from-eco-secondary/10 to-white rounded-xl p-6 shadow-lg text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-eco-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-xl" />
        
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
          <Share2 className="h-5 w-5 text-eco-secondary" />
          Share Your Green Impact
        </h3>
        
        <p className="text-gray-700 mb-6">
          Let your friends know how you're helping Bengaluru breathe better! 
          Create a custom share card showing your environmental impact.
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-inner mb-6 mx-auto max-w-xs">
          <div className="aspect-[4/3] bg-eco-light rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/lovable-uploads/20762f01-3c5c-45fb-b976-5d7207e9bc0a.png')] bg-cover bg-center opacity-10" />
            <div className="relative z-10 text-center p-4">
              <div className="text-eco-primary font-bold text-2xl mb-1">124 kg</div>
              <div className="text-gray-700 text-sm mb-3">CO₂ saved this month</div>
              <div className="bg-eco-primary/10 p-2 rounded-lg inline-block">
                <span className="text-xs text-eco-primary font-medium">= 5.6 trees planted</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-eco-secondary hover:bg-eco-primary text-white font-medium py-3 px-6 rounded-full transition-all duration-300 mb-4 flex items-center gap-2 mx-auto"
          >
            <Share2 className="h-5 w-5" />
            Share My Impact
          </button>
          
          {/* Share platform options */}
          <div className={cn(
            "flex items-center justify-center gap-3 transition-all duration-300",
            isExpanded ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
          )}>
            <button 
              onClick={() => handleShare("WhatsApp")}
              className="bg-[#25D366] text-white p-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <button 
              onClick={() => handleShare("Instagram")}
              className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <Camera className="h-6 w-6" />
            </button>
            <button 
              onClick={() => handleShare("Twitter")}
              className="bg-[#1DA1F2] text-white p-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

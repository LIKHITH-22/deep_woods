import React from 'react';
import { Leaf, Award, Sparkles, Zap, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const GreenPointsCard = () => {
  const { toast } = useToast();
  const [points, setPoints] = React.useState(125);
  const [lastScanned, setLastScanned] = React.useState<string>("2 hours ago");
  const [scanAnimation, setScanAnimation] = React.useState(false);
  
  const handleQRScan = () => {
    setScanAnimation(true);
    
    setTimeout(() => {
      const newPoints = Math.floor(Math.random() * 15) + 5; // Random points between 5-20
      setPoints(prev => prev + newPoints);
      
      toast({
        title: "QR Code Scanned Successfully!",
        description: `You earned +${newPoints} Green Points for your eco-friendly ride.`,
      });
      
      setLastScanned("just now");
      
      setTimeout(() => setScanAnimation(false), 500);
    }, 1000);
  };
  
  return (
    <div className="GreenPointsCard bg-gradient-to-br from-eco-primary/10 to-eco-light rounded-xl p-5 shadow-lg mb-6 relative overflow-hidden">
      <div className="absolute -right-16 -top-16 w-32 h-32 bg-eco-primary/10 rounded-full blur-xl" />
      <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-eco-primary/10 rounded-full blur-xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-eco-primary text-white p-2 rounded-full">
              <Leaf className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">Green Points</h3>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-500">Last scan: {lastScanned}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold text-eco-primary">{points}</span>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
          
          <Button 
            className={cn("bg-eco-primary hover:bg-eco-dark rounded-full px-4 flex items-center gap-2 group transition-all", 
              scanAnimation && "animate-pulse"
            )}
            onClick={handleQRScan}
          >
            <div className="relative">
              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="5" height="5" x="3" y="3" rx="1" />
                <rect width="5" height="5" x="16" y="3" rx="1" />
                <rect width="5" height="5" x="3" y="16" rx="1" />
                <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                <path d="M21 21v.01" />
                <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                <path d="M3 12h.01" />
                <path d="M12 3h.01" />
                <path d="M12 16v.01" />
                <path d="M16 12h1" />
                <path d="M21 12v.01" />
                <path d="M12 21v-1" />
              </svg>
              {scanAnimation && (
                <span className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></span>
              )}
            </div>
            <span>Scan QR Code</span>
          </Button>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg text-center">
            <Award className="h-5 w-5 text-eco-primary mx-auto mb-1" />
            <span className="text-xs block">3 Badges</span>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg text-center">
            <Sparkles className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
            <span className="text-xs block">Level 2</span>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg text-center">
            <Zap className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <span className="text-xs block">45 kWh saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from "react";
import { Home, QrCode, Users, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MobileFooterNav = () => {
  const { toast } = useToast();
  
  const handleQRScan = () => {
    // Add points
    const points = Math.floor(Math.random() * 15) + 5; // Random points between 5-20
    
    toast({
      title: "QR Code Scanned Successfully!",
      description: `You earned +${points} Green Points!`,
    });
    
    // Scroll to green points section
    const greenPointsSection = document.querySelector('.GreenPointsCard');
    if (greenPointsSection) {
      greenPointsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const navItems = [
    { name: "Home", href: "#home", icon: <Home className="h-5 w-5" /> },
    { 
      name: "Scan QR",
      onClick: handleQRScan,
      icon: <QrCode className="h-5 w-5" />
    },
    { 
      name: "Calculator",
      href: "#calculator",
      icon: <Calculator className="h-5 w-5" />
    },
    { 
      name: "Join Us",
      href: "#pledge",
      icon: <Users className="h-5 w-5" />
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <ul className="flex items-center justify-around p-2">
        {navItems.map((item) => (
          <li key={item.name}>
            {item.href ? (
              <a
                href={item.href}
                className="flex flex-col items-center gap-1 text-gray-600 hover:text-eco-primary"
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </a>
            ) : (
              <button
                onClick={item.onClick}
                className="flex flex-col items-center gap-1 text-gray-600 hover:text-eco-primary"
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileFooterNav;

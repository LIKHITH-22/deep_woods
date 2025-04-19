
import { TreeDeciduous } from "lucide-react";
import React from "react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <TreeDeciduous className="h-8 w-8 text-eco-primary" />
        <div className="absolute -inset-1 bg-eco-primary/20 rounded-full blur-sm -z-10"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-sans font-bold text-xl tracking-tight text-gray-800">Deepwoods</span>
        <span className="text-xs text-gray-500 -mt-1">Initiatives on Environment Trust</span>
      </div>
    </div>
  );
};

export default Logo;

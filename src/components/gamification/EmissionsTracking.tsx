
import React from 'react';
import { BarChart3, ArrowUp, Calendar, Leaf } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export const EmissionsTracking = () => {
  // This would come from your state/database in a real app
  const weeklyData = [
    { day: 'Mon', value: 15 },
    { day: 'Tue', value: 22 },
    { day: 'Wed', value: 17 },
    { day: 'Thu', value: 35 },
    { day: 'Fri', value: 28 },
    { day: 'Sat', value: 12 },
    { day: 'Sun', value: 5 },
  ];
  
  const totalSavedThisWeek = weeklyData.reduce((acc, day) => acc + day.value, 0);
  const highestValue = Math.max(...weeklyData.map(d => d.value));
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-eco-primary/10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-eco-light p-2 rounded-full">
            <BarChart3 className="h-5 w-5 text-eco-primary" />
          </div>
          <h3 className="font-bold text-lg text-gray-800">Your Impact Tracker</h3>
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-1">
          <Calendar className="h-4 w-4" />
          <span>This Week</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="text-3xl font-bold text-eco-primary">{totalSavedThisWeek}</div>
        <div className="flex flex-col">
          <div className="flex items-center text-green-600 text-xs">
            <ArrowUp className="h-3 w-3 mr-1" />
            <span>25% vs last week</span>
          </div>
          <span className="text-gray-600 text-sm">kg CO₂ saved</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 h-32 mb-2">
        {weeklyData.map((day, idx) => {
          const percentage = (day.value / highestValue) * 100;
          return (
            <div key={idx} className="flex flex-col items-center justify-end h-full">
              <div className="relative w-full flex justify-center items-end h-[80%]">
                <div 
                  className="w-6 sm:w-8 bg-eco-primary/20 hover:bg-eco-primary/30 rounded-t-md transition-all duration-300 cursor-pointer group relative"
                  style={{ height: `${percentage}%` }}
                >
                  <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {day.value} kg CO₂
                  </div>
                  
                  {/* Animated green leaf if day has high impact */}
                  {day.value > 20 && (
                    <div className="absolute -top-2 -right-1 animate-bounce">
                      <Leaf className="h-4 w-4 text-eco-primary" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-eco-primary rounded-t-md" style={{ opacity: day.value / 100 }}></div>
                </div>
              </div>
              <span className="text-xs text-gray-600 mt-1">{day.day}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 bg-eco-light/50 p-4 rounded-lg">
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span>Monthly Goal: 500 kg CO₂</span>
          <span className="font-medium">{Math.round((totalSavedThisWeek / 500) * 100)}%</span>
        </div>
        <Progress value={(totalSavedThisWeek / 500) * 100} className="h-2 bg-eco-light" />
        
        <div className="mt-3 text-xs text-center text-gray-600">
          You're on track to reach your monthly impact goal!
        </div>
      </div>
    </div>
  );
};


import React from "react";
import { Trophy, Star, Award, Medal, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Level {
  name: string;
  minPoints: number;
  icon: React.ReactNode;
}

const levels: Level[] = [
  { name: "Eco Rookie", minPoints: 0, icon: <Star className="h-5 w-5 text-yellow-400" /> },
  { name: "Green Guardian", minPoints: 100, icon: <Medal className="h-5 w-5 text-blue-500" /> },
  { name: "Climate Champion", minPoints: 250, icon: <Trophy className="h-5 w-5 text-purple-500" /> },
  { name: "Earth Savior", minPoints: 500, icon: <Award className="h-5 w-5 text-eco-primary" /> },
];

export const UserProgress = () => {
  // This would come from your state management system in a real app
  const userPoints = 120;
  const { toast } = useToast();

  const getCurrentLevel = (points: number) => {
    return levels.reduce((acc, level) => {
      if (points >= level.minPoints) return level;
      return acc;
    }, levels[0]);
  };

  const currentLevel = getCurrentLevel(userPoints);
  const nextLevel = levels.find(level => level.minPoints > userPoints) || levels[levels.length - 1];
  const progress = ((userPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100;

  return (
    <div className="bg-gradient-to-br from-white to-eco-light rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-all duration-300 border border-eco-primary/10">
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {currentLevel.icon}
            <div>
              <h3 className="font-bold text-lg text-eco-primary">{currentLevel.name}</h3>
              <p className="text-sm text-gray-600">Level {levels.indexOf(currentLevel) + 1}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-eco-primary font-bold text-xl">{userPoints}</span>
            <span className="text-sm text-gray-600">points</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Progress value={progress} className="h-3 bg-eco-light" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{currentLevel.name}</span>
            <span className="text-eco-primary font-medium">{nextLevel.name}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            className="group relative overflow-hidden bg-gradient-to-br from-white to-yellow-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-yellow-200/50"
            onClick={() => {
              toast({
                title: "Daily Streak!",
                description: "You've logged in for 3 days in a row! +10 points",
              });
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-medium text-gray-700">3 Day Streak!</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/0 via-yellow-100/30 to-yellow-100/0 group-hover:translate-x-full transition-transform duration-1000" />
          </button>
          
          <button
            className="group relative overflow-hidden bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200/50"
            onClick={() => {
              toast({
                title: "New Achievement!",
                description: "First EV Ride Logged! +50 points",
              });
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium text-gray-700">New Badge!</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-100/30 to-purple-100/0 group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>
      </div>
    </div>
  );
};

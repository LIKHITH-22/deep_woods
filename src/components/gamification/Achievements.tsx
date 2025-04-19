import React from "react";
import { Trophy, Bike, Car, Bus, Heart, TreeDeciduous, Sparkles } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Log your first eco-friendly ride",
    icon: <Bike className="h-6 w-6 text-eco-primary" />,
    points: 50,
    unlocked: true,
  },
  {
    id: 2,
    title: "EV Explorer",
    description: "Complete 5 EV rides",
    icon: <Car className="h-6 w-6 text-blue-500" />,
    points: 100,
    unlocked: false,
  },
  {
    id: 3,
    title: "Public Transit Pro",
    description: "Use public transport 10 times",
    icon: <Bus className="h-6 w-6 text-yellow-500" />,
    points: 150,
    unlocked: false,
  },
  {
    id: 4,
    title: "Green Guardian",
    description: "Save 100kg of CO2 emissions",
    icon: <TreeDeciduous className="h-6 w-6 text-green-500" />,
    points: 200,
    unlocked: false,
  },
  {
    id: 5,
    title: "Community Champion",
    description: "Make 3 pledges on the wall",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    points: 250,
    unlocked: false,
  },
];

export const Achievements = () => {
  return (
    <div className="bg-gradient-to-br from-white to-eco-light rounded-xl shadow-lg p-6 border border-eco-primary/10">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-6 w-6 text-purple-500" />
        <div>
          <h3 className="font-bold text-xl text-eco-primary">Achievements</h3>
          <p className="text-sm text-gray-600">Complete tasks to earn rewards</p>
        </div>
      </div>
      
      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`group relative overflow-hidden p-4 rounded-lg transition-all duration-300 ${
              achievement.unlocked
                ? "bg-gradient-to-r from-eco-light to-white border-2 border-eco-primary/20 shadow-md hover:shadow-lg"
                : "bg-gray-50 border-2 border-gray-200 opacity-75"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                achievement.unlocked ? "bg-eco-primary/10" : "bg-gray-100"
              }`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className={`h-4 w-4 ${
                  achievement.unlocked ? "text-yellow-400" : "text-gray-400"
                }`} />
                <span className={`font-bold ${
                  achievement.unlocked ? "text-eco-primary" : "text-gray-400"
                }`}>+{achievement.points}</span>
              </div>
            </div>
            {achievement.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-r from-eco-light/0 via-white/30 to-eco-light/0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-1000" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

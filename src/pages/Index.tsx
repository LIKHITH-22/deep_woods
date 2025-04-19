import React from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import EmissionsCalculator from "@/components/EmissionsCalculator";
import ImpactCounter from "@/components/ImpactCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import PledgeWall from "@/components/PledgeWall";
import Footer from "@/components/Footer";
import { UserProgress } from "@/components/gamification/UserProgress";
import { Achievements } from "@/components/gamification/Achievements";
import { MobileViewportHandler } from "@/hooks/use-mobile";
import { GreenPointsCard } from "@/components/gamification/GreenPointsCard";
import { SocialShare } from "@/components/gamification/SocialShare";
import { EmissionsTracking } from "@/components/gamification/EmissionsTracking";
import { QuickFactsToast } from "@/components/gamification/QuickFactsToast";
import { FeedbackPoll } from "@/components/gamification/FeedbackPoll";
import MobileFooterNav from "@/components/MobileFooterNav";

const Index = () => {
  const [showFact, setShowFact] = React.useState(false);
  
  React.useEffect(() => {
    // Show facts toast after 3 seconds
    const timer = setTimeout(() => {
      setShowFact(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-eco-light/50 to-white pb-[60px] md:pb-0">
      <MobileViewportHandler />
      <NavBar />
      <main className="flex-1">
        <Hero />
        <section className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <GreenPointsCard />
            <UserProgress />
            <EmissionsTracking />
            <Achievements />
          </div>
        </section>
        <EmissionsCalculator />
        <FeedbackPoll />
        <ImpactCounter />
        <TestimonialCarousel />
        <SocialShare />
        <PledgeWall />
      </main>
      <Footer />
      <MobileFooterNav />
      {showFact && <QuickFactsToast />}
    </div>
  );
};

export default Index;

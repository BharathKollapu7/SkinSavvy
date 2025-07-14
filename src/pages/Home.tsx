
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSection from './home/components/HeroSection';
import FeaturedSection from './home/components/FeaturedSection';
import BrandSection from './home/components/BrandSection';
import CTASection from './home/components/CTASection';
import FooterNavigation from './home/components/FooterNavigation';
import FloatingChatBubble from '@/components/chatbot/FloatingChatBubble';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <BrandSection />
      <CTASection />
      <FooterNavigation />
      <FloatingChatBubble />
    </div>
  );
};

export default Home;

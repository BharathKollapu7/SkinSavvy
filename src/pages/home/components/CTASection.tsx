
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/animated-card';

const CTASection = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <AnimatedCard className="max-w-5xl mx-auto bg-skin-cream/30 rounded-lg p-8 md:p-12 text-center border-0 shadow-none">
        <h2 className="text-3xl font-playfair text-skin-darkgreen mb-4">
          Start Your Skincare Journey Today
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Take our quick skin type assessment and receive personalized product recommendations tailored to your unique skin needs.
        </p>
        <Button 
          asChild
          size="lg" 
          className="bg-skin-beige text-skin-darkgreen hover:bg-skin-beige/90 group"
        >
          <Link to="/skin-type" className="flex items-center">
            Take the Skin Quiz
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </Button>
      </AnimatedCard>
    </section>
  );
};

export default CTASection;

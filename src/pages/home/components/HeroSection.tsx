
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl mx-auto text-center animate-on-scroll">
        <div className="card-floating mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-playfair mb-6 text-deep-umber text-shadow animate-float">
            Your Path to Healthier Skin
          </h1>
          <p className="text-lg md:text-xl mb-8 font-lato text-sage-grey leading-relaxed">
            Discover personalized skincare recommendations based on your unique skin type and concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-primary group">
              <Link to="/skin-type" className="flex items-center">
                Find Your Skin Type
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" className="btn-secondary">
              <Link to="/recommendations">
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

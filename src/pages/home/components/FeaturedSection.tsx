
import React from 'react';

const FeaturedSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl font-playfair text-deep-umber mb-4 text-shadow">
            How SkinSavvy Helps Your Skin
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            number="01" 
            title="Personalized Recommendations" 
            description="Get skincare product recommendations tailored to your unique skin type and concerns."
            delay="0.1s"
          />
          <FeatureCard 
            number="02" 
            title="Skin Type Analysis" 
            description="Discover your skin type through our interactive questionnaire for better product choices."
            delay="0.3s"
          />
          <FeatureCard 
            number="03" 
            title="Expert Skincare Knowledge" 
            description="Learn from our comprehensive educational resources about skincare ingredients and routines."
            delay="0.5s"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard = ({ number, title, description, delay }: FeatureCardProps) => (
  <div 
    className="card-floating text-center hover:scale-105 transition-all duration-500 animate-on-scroll"
    style={{ animationDelay: delay }}
  >
    <div className="w-16 h-16 bg-olive-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <span className="text-2xl text-olive-gold font-bold">{number}</span>
    </div>
    <h3 className="text-xl font-bold mb-4 text-deep-umber font-playfair">{title}</h3>
    <p className="text-sage-grey leading-relaxed">{description}</p>
  </div>
);

export default FeaturedSection;

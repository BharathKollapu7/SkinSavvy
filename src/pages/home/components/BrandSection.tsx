import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const NAVBAR_HEIGHT = 64; // px, matches h-16 in Tailwind

const BrandSection = () => {
  const [showAbout, setShowAbout] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (showAbout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAbout]);

  const brands = [
    "Mama Earth",
    "Aqualogica", 
    "Pilgrim",
    "Cetaphil",
    "The Ordinary.",
    "The Derma Co",
    "Dot and Key",
    "Minimalist",
    "Plum"
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-playfair mb-4 text-skin-darkgreen">
          Brands We Recommend
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          We recommend products from India’s top skincare brands each approved by government authorities and recognized for safety, quality, and consumer trust.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className={cn(
                "px-6 py-3 border border-gray-200 rounded-md hover:border-skin-beige transition-colors font-semibold text-lg bg-white shadow hover:shadow-md",
                "hover-scale"
              )}
            >
              {brand}
            </div>
          ))}
        </div>

        {/* About Us Button */}
        <button
          onClick={() => setShowAbout(true)}
          className="mt-4 mb-8 px-7 py-3 rounded-xl bg-gradient-to-r from-olive-gold to-moss-green text-white font-bold text-lg shadow-lg hover:from-moss-green hover:to-olive-gold transition-all"
        >
          About Us
        </button>

        {/* About Us Modal */}
        {showAbout && (
          <div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-2 sm:px-0"
            style={{
              paddingTop: `calc(${NAVBAR_HEIGHT}px + env(safe-area-inset-top, 0px))`
            }}
            onClick={() => setShowAbout(false)}
            aria-modal="true"
            tabIndex={-1}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] sm:max-w-lg md:max-w-xl border-2 border-olive-gold flex flex-col"
              style={{
                maxHeight: `calc(90vh - ${NAVBAR_HEIGHT}px - env(safe-area-inset-top, 0px))`,
                marginBottom: '6.5rem'
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-white rounded-t-2xl flex items-center justify-between px-4 sm:px-6 pt-4 pb-3 border-b border-gray-100">
                <h2 className="text-xl sm:text-2xl font-extrabold text-olive-gold font-playfair tracking-tight text-center w-full">
                  About Us
                </h2>
                <button
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={() => setShowAbout(false)}
                  aria-label="Close"
                  style={{ lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
              {/* Scrollable Content */}
              <div
                className="overflow-y-auto px-5 sm:px-8 pb-10 pt-6"
                style={{
                  maxHeight: `calc(90vh - ${NAVBAR_HEIGHT}px - env(safe-area-inset-top, 0px) - 56px)`
                }}
              >
                <div className="space-y-8 text-left">
                  <section>
                    <h3 className="text-lg sm:text-xl font-semibold text-moss-green mb-2">
                      Our Commitment
                    </h3>
                    <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-2">
                      We recommend only brands that meet the highest benchmarks for safety, transparency, and quality. Each product is selected for its proven track record and compliance with Indian government standards.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-lg sm:text-xl font-semibold text-moss-green mb-2">
                      How We Select
                    </h3>
                    <ul className="list-disc list-inside text-gray-800 text-base sm:text-lg leading-relaxed space-y-2 pl-4">
                      <li>
                        <span className="font-semibold text-olive-gold">Regulatory Compliance:</span> Every brand is registered and adheres to national safety regulations.
                      </li>
                      <li>
                        <span className="font-semibold text-olive-gold">Industry Reputation:</span> We feature only established leaders recognized for research and customer care.
                      </li>
                      <li>
                        <span className="font-semibold text-olive-gold">Ingredient Integrity:</span> All products use rigorously tested, high-standard ingredients.
                      </li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-lg sm:text-xl font-semibold text-moss-green mb-2">
                      Skincare Guidance
                    </h3>
                    <ul className="list-disc list-inside text-gray-800 text-base sm:text-lg leading-relaxed space-y-2 pl-4">
                      <li>Always patch test new products, especially if you have sensitive or allergy-prone skin.</li>
                      <li>Consult a dermatologist for ongoing skin concerns before starting any new regimen.</li>
                      <li>Discontinue use if irritation occurs and follow all product instructions for best results.</li>
                    </ul>
                  </section>
                  <section>
                    <div className="border-t pt-5 border-olive-gold">
                      <h4 className="text-base sm:text-lg font-semibold text-moss-green mb-2">Why Trust Us?</h4>
                      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        Our recommendations are based on a commitment to quality, safety, and your skin’s wellbeing. All featured brands are registered, approved, and have a proven record of customer satisfaction.
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandSection;

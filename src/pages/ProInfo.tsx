import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const productGuides = [
  {
    name: "Facewash",
    description: "A cleanser that removes dirt, oil, and impurities from your skin",
    usage: "Use twice daily (morning and evening). Wet face, apply cleanser, gently massage for 30-60 seconds, rinse with lukewarm water.",
    tips: "Choose based on skin type: gel for oily skin, cream for dry skin, foam for combination skin. Avoid over-cleansing.",
  },
  {
    name: "Toner",
    description: "A liquid treatment that balances skin pH and prepares skin for other products",
    usage: "Apply after cleansing. Use a cotton pad or pat directly onto clean skin. Follow with serum or moisturizer.",
    tips: "Avoid alcohol-based toners if you have sensitive skin. Look for hydrating or exfoliating toners based on your needs.",
  },
  {
    name: "Serum",
    description: "A concentrated treatment with active ingredients targeting specific skin concerns",
    usage: "Apply after toner but before moisturizer. Use 2-3 drops, gently pat into skin. Start slowly with active ingredients.",
    tips: "Use vitamin C serums in the morning, retinol at night. Always patch test new serums first.",
  },
  {
    name: "Sunscreen",
    description: "A protective barrier that shields skin from harmful UV rays",
    usage: "Apply generously 15-30 minutes before sun exposure. Reapply every 2 hours or after swimming/sweating.",
    tips: "Use broad-spectrum SPF 30 or higher daily. Don't forget neck, ears, and hands. Reapplication is key.",
  },
  {
    name: "Moisturizer",
    description: "A hydrating product that maintains skin's moisture barrier and prevents water loss",
    usage: "Apply twice daily after serum. Use upward motions, don't forget neck. Day and night formulas may differ.",
    tips: "Gel moisturizers for oily skin, cream for dry skin. Look for ingredients like hyaluronic acid and ceramides.",
  }
];

const ingredients = [
  {
    name: "Glycolic Acid",
    benefits: "Exfoliates dead skin cells, improves skin texture, fades dark spots, promotes cell turnover",
    uses: "Chemical exfoliation, brightening, anti-aging treatments",
    precautions: "Can cause irritation and sensitivity, avoid excessive sun exposure, start with low concentration"
  },
  {
    name: "Lactic Acid",
    benefits: "Gentle exfoliation, hydrates skin, improves skin tone and texture",
    uses: "Mild chemical exfoliant, suitable for sensitive skin, brightening",
    precautions: "May cause mild irritation, increase sun sensitivity, use sunscreen"
  },
  {
    name: "Vitamin C (Ascorbic Acid)",
    benefits: "Powerful antioxidant, brightens skin, boosts collagen production, fades pigmentation",
    uses: "Anti-aging, skin brightening, protection against environmental damage",
    precautions: "Can cause irritation in sensitive skin, store in dark/air-tight containers"
  },
  {
    name: "Hyaluronic Acid",
    benefits: "Hydrates and plumps skin by retaining moisture, reduces fine lines",
    uses: "Moisturizers, serums for hydration and skin barrier support",
    precautions: "Generally safe, rare allergic reactions possible"
  },
  {
    name: "Salicylic Acid",
    benefits: "Exfoliates dead skin cells, unclogs pores, reduces blackheads and whiteheads, anti-inflammatory properties",
    uses: "Acne treatment, pore cleansing, oil control, gentle exfoliation for sensitive skin",
    precautions: "Start slowly, can cause dryness/irritation, increase sun sensitivity, avoid with aspirin allergy"
  },
  {
    name: "Benzoyl Peroxide",
    benefits: "Kills acne-causing bacteria, reduces inflammation, helps clear pimples",
    uses: "Acne spot treatment and prevention",
    precautions: "Can cause dryness, redness, bleaching of fabrics, start with low concentration"
  },
  {
    name: "Retinoid",
    benefits: "Increases cell turnover, unclogs pores, fades pigmentation, stimulates collagen",
    uses: "Anti-aging, acne treatment, skin texture improvement",
    precautions: "Can cause irritation and photosensitivity, use sunscreen, avoid during pregnancy"
  },
  {
    name: "Retinol",
    benefits: "A form of vitamin A that accelerates skin renewal, boosts collagen, smooths fine lines, and improves skin tone",
    uses: "Anti-aging, acne treatment, improving skin texture and pigmentation",
    precautions: "Start with low concentration, use at night, can cause irritation and dryness, always use sunscreen, avoid during pregnancy"
  },
  {
    name: "Niacinamide",
    benefits: "Strengthens skin barrier, reduces redness and pigmentation, minimizes pores, regulates oil",
    uses: "Redness reduction, anti-aging, acne-prone skin, skin barrier repair",
    precautions: "Generally well-tolerated, rare irritation possible"
  },
  {
    name: "Alpha Arbutin",
    benefits: "Inhibits melanin production, fades dark spots, brightens skin tone",
    uses: "Hyperpigmentation treatment, skin brightening",
    precautions: "Generally safe, avoid combining with strong acids without guidance"
  },
  {
    name: "Ceramides",
    benefits: "Restore and reinforce skin barrier, lock in moisture, protect against irritants",
    uses: "Moisturizers, barrier repair formulations",
    precautions: "Generally safe and well-tolerated"
  },
  {
    name: "Peptides",
    benefits: "Stimulate collagen and elastin production, improve skin firmness and elasticity",
    uses: "Anti-aging serums and creams",
    precautions: "Generally safe, patch test recommended"
  },
  {
    name: "Vitamin E",
    benefits: "Antioxidant protection, supports skin healing, moisturizes",
    uses: "Moisturizers, anti-aging products",
    precautions: "Rare allergic reactions possible"
  },
  {
    name: "Kojic Acid",
    benefits: "Inhibits melanin production, lightens hyperpigmentation and age spots",
    uses: "Skin brightening, pigmentation treatment",
    precautions: "May increase sun sensitivity, avoid overuse to prevent irritation"
  },
  {
    name: "Azelaic Acid",
    benefits: "Anti-inflammatory and antibacterial, treats acne, rosacea, and hyperpigmentation",
    uses: "Acne and rosacea treatment, skin brightening",
    precautions: "May cause mild irritation, start with low concentration"
  },
];

const spfInfoList = [
  {
    name: 'SPF 20',
    details: [
      "Blocks about 95% of UVB rays; suitable for short outdoor activities, overcast days, or daily use for darker skin tones.",
      "Lightweight, often preferred for layering under makeup or for those who dislike heavy sunscreens.",
      "Best for people with phototype V/VI (dark to black skin) or for brief sun exposure."
    ]
  },
  {
    name: 'SPF 35 PA+++',
    details: [
      "Blocks about 97% of UVB rays and offers strong UVA protection (PA+++).",
      "Good for everyday use, especially if you have oily or acne-prone skin.",
      "Suitable for moderate sun exposure or those who spend most time indoors but want solid protection."
    ]
  },
  {
    name: 'SPF 40 PA++',
    details: [
      "High UVB protection (about 97%) and moderate UVA protection (PA++).",
      "Ideal for sensitive skin or those seeking a balance between strong protection and daily comfort.",
      "Reapply every 2 hours, especially during prolonged outdoor activities."
    ]
  },
  {
    name: 'SPF 45 PA+++',
    details: [
      "Blocks up to 98% of UVB rays and provides high UVA defense.",
      "Lightweight, non-greasy, and often formulated for all skin types.",
      "Good for daily urban exposure, preventing tanning, pigmentation, and sun damage."
    ]
  },
  {
    name: 'SPF 50 PA+++',
    details: [
      "Blocks over 98% of UVB rays and offers high UVA protection.",
      "Recommended for extended outdoor activities, travel, or if you have pigmentation concerns.",
      "Suitable for oily and combination skin types; helps prevent tanning and premature aging."
    ]
  },
  {
    name: 'SPF 50 PA++++',
    details: [
      "Highest UVA protection (PA++++), blocks over 98% of UVB rays.",
      "Best for intense sun exposure (beach, sports, mountains) or for those with very fair, sensitive, or pigmentation-prone skin.",
      "Essential for long outdoor hours, tropical climates, or if you’re highly sun-sensitive."
    ]
  },
  {
    name: 'SPF 50+',
    details: [
      "Indicates protection above SPF 50, usually blocks slightly more than 98% of UVB rays.",
      "Chosen for maximum defense in extreme conditions or for those with photosensitive skin.",
      "Still requires reapplication every 2 hours for continued protection."
    ]
  },
  {
    name: 'SPF 50+ PA++++',
    details: [
      "Combines the highest available UVB and UVA protection.",
      "Ideal for people with a history of pigmentation, melasma, or those at high risk of sun-induced skin damage.",
      "Recommended for prolonged sun exposure, outdoor sports, or post-procedure skin."
    ]
  },
  {
    name: 'SPF 60 PA++++',
    details: [
      "Offers maximal UVB and UVA protection for very high-risk situations (mountains, water sports, medical conditions).",
      "Suitable for very fair, sensitive, or photo-allergic skin, or for those on medications increasing sun sensitivity.",
      "Should be reapplied frequently, especially after swimming or sweating."
    ]
  }
];

const spfGeneralTips = [
  {
    title: "When to Choose Lower vs Higher SPF",
    points: [
      <span key="low"><b>Lower SPF (20–35):</b> For deeper skin tones, minimal sun exposure, or mostly indoor lifestyles.</span>,
      <span key="high"><b>Higher SPF (40–60+):</b> For fair/sensitive skin, outdoor activities, tropical climates, or if you have pigmentation/aging concerns.</span>,
      <span key="pa"><b>PA+++ or PA++++:</b> Always opt for higher PA if you’re concerned about aging, pigmentation, or spend long hours outdoors.</span>,
    ]
  }
];

const uvaUvbBullets = [
  <span key="uva"><b>UVA rays:</b> B for Burning, UVB rays are the main cause of sunburn.</span>,
  <span key="uvb"><b>UVB rays:</b> A for Aging, UVA rays penetrate deeper into the skin, causing premature aging.</span>,
  <span key="spf"><b>SPF:</b> measures protection against UVB.</span>,
  <span key="pa rating"><b>PA Rating:</b> measures protection against UVA.</span>
];

const ProInfo = () => {
  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card-style Header */}
        <div className="card-bright mx-auto max-w-4xl p-8 sm:p-10 lg:p-12 mb-10 sm:mb-14 lg:mb-16 text-center">
          <h1 className="font-bold font-playfair mb-4 
            text-xl sm:text-3xl lg:text-5xl text-deep-umber">
            Products & Ingredients Information
          </h1>
          <span className="block font-normal mb-6 
            text-base sm:text-lg lg:text-xl text-skin-sage">
            Your comprehensive guide to skincare products and ingredients
          </span>
        </div>
  
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 h-auto sm:h-12 mb-8 p-1">
            <TabsTrigger value="products" className="text-base sm:text-lg lg:text-xl py-3 sm:py-2">
              Product Guides
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="text-base sm:text-lg lg:text-xl py-3 sm:py-2">
              Ingredients Encyclopedia
            </TabsTrigger>
            <TabsTrigger value="spfinfo" className="text-base sm:text-lg lg:text-xl py-3 sm:py-2">
              SPF Info
            </TabsTrigger>
          </TabsList>

          {/* Product Guides Section */}
          <TabsContent value="products" className="flex justify-center">
            <div className="w-full" style={{ maxWidth: '85%' }}>
              <div className="text-center mb-6">
                <h2 className="text-lg sm:text-2xl font-semibold text-skin-darkgreen mb-2">Product Usage Guides</h2>
                <p className="text-base sm:text-lg text-skin-olive">Learn how to use essential skincare products effectively</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {productGuides.map((product, index) => (
                  <AnimatedCard key={index} className="border-skin-beige hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-skin-cream">
                      <CardTitle className="text-skin-darkgreen text-base sm:text-xl">{product.name}</CardTitle>
                      <CardDescription className="text-skin-olive text-base sm:text-lg">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-skin-darkgreen mb-2 text-base sm:text-lg">How to Use:</h4>
                          <p className="text-base sm:text-lg text-gray-700">{product.usage}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-skin-darkgreen mb-2 text-base sm:text-lg">Tips:</h4>
                          <p className="text-base sm:text-lg text-gray-700">{product.tips}</p>
                        </div>
                      </div>
                    </CardContent>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Ingredients Encyclopedia Section */}
          <TabsContent value="ingredients" className="flex justify-center">
            <div className="w-full" style={{ maxWidth: '85%' }}>
              <div className="text-center mb-6">
                <h2 className="text-lg sm:text-2xl font-semibold text-skin-darkgreen mb-2">Ingredients Encyclopedia</h2>
                <p className="text-base sm:text-lg text-skin-olive">Discover the benefits and uses of key skincare ingredients</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {ingredients.map((ingredient, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-skin-beige rounded-lg px-6">
                    <AccordionTrigger className="text-base sm:text-xl font-semibold text-skin-darkgreen hover:text-skin-brown">
                      {ingredient.name}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-semibold text-skin-darkgreen mb-2 text-base sm:text-lg">Benefits:</h4>
                        <p className="text-base sm:text-lg text-gray-700">{ingredient.benefits}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-skin-darkgreen mb-2 text-base sm:text-lg">Uses:</h4>
                        <p className="text-base sm:text-lg text-gray-700">{ingredient.uses}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-skin-darkgreen mb-2 text-base sm:text-lg">Precautions:</h4>
                        <p className="text-base sm:text-lg text-gray-700">{ingredient.precautions}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* SPF Info Section */}
          <TabsContent value="spfinfo" className="flex justify-center">
            <div className="w-full" style={{ maxWidth: '85%' }}>
              <div className="text-center mb-6">
                <h2 className="text-lg sm:text-2xl font-semibold text-skin-darkgreen mb-2">SPF Information</h2>
                <p className="text-base sm:text-lg text-skin-olive">Understand SPF and PA ratings for optimal sun protection</p>
              </div>
              {/* General SPF Tips */}
              <div className="mb-6 bg-skin-cream border border-skin-beige rounded-lg p-5">
                <h4 className="font-semibold text-skin-darkgreen mb-3 text-base sm:text-lg">When to Choose Lower vs. Higher SPF</h4>
                <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg text-gray-700">
                  {spfGeneralTips[0].points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
              {/* UVA/UVB concise info */}
              <div className="mb-6 bg-skin-cream border border-skin-beige rounded-lg p-5">
                <h4 className="font-semibold text-skin-darkgreen mb-3 text-base sm:text-lg">What do UVA and UVB mean?</h4>
                <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg text-gray-700">
                  {uvaUvbBullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* SPF Accordions */}
              <Accordion type="single" collapsible className="w-full space-y-4">
                {spfInfoList.map((spf, idx) => (
                  <AccordionItem key={idx} value={`spf-${idx}`} className="border border-skin-beige rounded-lg px-6">
                    <AccordionTrigger className="text-base sm:text-xl font-semibold text-skin-darkgreen hover:text-skin-brown">
                      {spf.name}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg text-gray-700">
                        {spf.details.map((detail, dIdx) => (
                          <li key={dIdx}>{detail}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProInfo;

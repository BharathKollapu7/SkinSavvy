
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, RefreshCw, CheckCircle } from 'lucide-react';

// Define types
type Product = {
  product_name: string;
  product_type: string;
  brand: string | null;
  price: string;
  notable_effects: string | null;
  product_link: string | null;
  [key: string]: string | number | null;
};

type SkinType = 'Dry' | 'Oily' | 'Combination' | 'Normal' | 'Sensitive';

const ProductFinder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Steps state
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Data states
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | ''>('');
  const [availableEffects, setAvailableEffects] = useState<string[]>([]);
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch product types on mount
  useEffect(() => {
    fetchProductTypes();
  }, []);
  
  // Fetch product types
  const fetchProductTypes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('product_type')
        .order('product_type');
        
      if (error) throw error;
      
      if (data) {
        // Extract unique product types
        const uniqueTypes = [...new Set(data.map(item => item.product_type))];
        setProductTypes(uniqueTypes);
      }
    } catch (error: any) {
      console.error('Error fetching product types:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to load product categories',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // When product type is selected, move to step 2
  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
    setCurrentStep(2);
  };
  
  // When skin type is selected, fetch matching effects and move to step 3
  const handleSkinTypeSelect = async (value: SkinType) => {
    setSelectedSkinType(value);
    try {
      setLoading(true);
      
      // Build query based on skin type
      let query = supabase
        .from('products')
        .select('notable_effects')
        .eq('product_type', selectedType);
      
      // Add skin type filter based on column data type (text vs number)
      if (value === 'Dry' || value === 'Normal' || value === 'Sensitive') {
        // These are stored as text fields
        query = query.eq(value, 'yes');
      } else if (value === 'Oily' || value === 'Combination') {
        // These are stored as integer fields
        query = query.eq(value, 1);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        // Extract and flatten all effects
        const allEffects = data
          .filter(item => item.notable_effects) // Filter out null values
          .flatMap(item => item.notable_effects!.split(',').map(e => e.trim()))
          .filter(effect => effect); // Filter out empty strings
          
        // Remove duplicates
        const uniqueEffects = [...new Set(allEffects)];
        setAvailableEffects(uniqueEffects.sort());
        
        setCurrentStep(3);
      }
    } catch (error: any) {
      console.error('Error fetching effects:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to load effects for the selected criteria',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle checkbox changes for effects
  const handleEffectToggle = (effect: string, checked: boolean) => {
    if (checked) {
      setSelectedEffects(prev => [...prev, effect]);
    } else {
      setSelectedEffects(prev => prev.filter(e => e !== effect));
    }
  };
  
  // Get final recommendations
  const getRecommendations = async () => {
    try {
      setLoading(true);
      
      // Build query based on selected criteria
      let query = supabase
        .from('products')
        .select('*')
        .eq('product_type', selectedType);
      
      // Add skin type filter based on column data type
      if (selectedSkinType === 'Dry' || selectedSkinType === 'Normal' || selectedSkinType === 'Sensitive') {
        query = query.eq(selectedSkinType, 'yes');
      } else if (selectedSkinType === 'Oily' || selectedSkinType === 'Combination') {
        query = query.eq(selectedSkinType, 1);
      }
      
      // Execute query
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        // Filter products based on selected effects if any are selected
        let filteredProducts = data;
        
        if (selectedEffects.length > 0) {
          filteredProducts = data.filter(product => {
            if (!product.notable_effects) return false;
            
            const productEffects = product.notable_effects.toLowerCase().split(',').map(e => e.trim());
            // Check if any of the selected effects are in this product's effects
            return selectedEffects.some(effect => 
              productEffects.includes(effect.toLowerCase())
            );
          });
        }
        
        setRecommendedProducts(filteredProducts);
        setCurrentStep(4);
      }
    } catch (error: any) {
      console.error('Error fetching recommendations:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to get product recommendations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setSelectedType('');
    setSelectedSkinType('');
    setAvailableEffects([]);
    setSelectedEffects([]);
    setRecommendedProducts([]);
    setCurrentStep(1);
  };
  
  // Function to view all recommendations
  const viewAllRecommendations = () => {
    navigate('/recommendations');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-skin-darkgreen mb-6">
          Find Your Perfect Skincare Products
        </h1>
        
        <div className="mb-8">
          <div className="flex items-center mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= currentStep ? 'bg-skin-darkgreen text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div 
                    className={`h-1 w-16 ${
                      step < currentStep ? 'bg-skin-darkgreen' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <AnimatedCard className="mb-6">
          <CardContent className="p-6">
            {/* Step 1: Product Category */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-medium text-skin-darkgreen mb-4">
                  Step 1: Choose a Product Category
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-type">Select Product Type</Label>
                    <Select 
                      value={selectedType} 
                      onValueChange={handleTypeSelect}
                    >
                      <SelectTrigger id="product-type" className="w-full">
                        <SelectValue placeholder="Select a product type" />
                      </SelectTrigger>
                      <SelectContent>
                        {productTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Skin Type */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-medium text-skin-darkgreen mb-4">
                  Step 2: Select Your Skin Type
                </h2>
                <p className="text-skin-olive mb-4">
                  We'll recommend products specifically formulated for your skin type.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="skin-type">Your Skin Type</Label>
                    <Select 
                      value={selectedSkinType} 
                      onValueChange={(value) => handleSkinTypeSelect(value as SkinType)}
                    >
                      <SelectTrigger id="skin-type" className="w-full">
                        <SelectValue placeholder="Select your skin type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Dry">Dry</SelectItem>
                        <SelectItem value="Oily">Oily</SelectItem>
                        <SelectItem value="Combination">Combination</SelectItem>
                        <SelectItem value="Sensitive">Sensitive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Notable Effects */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-medium text-skin-darkgreen mb-4">
                  Step 3: Select Desired Effects
                </h2>
                <p className="text-skin-olive mb-4">
                  Choose one or more effects you want from your {selectedType.toLowerCase()} products.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {availableEffects.map((effect) => (
                    <div key={effect} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`effect-${effect}`} 
                        checked={selectedEffects.includes(effect)}
                        onCheckedChange={(checked) => 
                          handleEffectToggle(effect, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`effect-${effect}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {effect}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline" 
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={getRecommendations}
                    disabled={loading}
                    className="bg-skin-beige text-skin-darkgreen hover:bg-skin-beige/90"
                  >
                    Get Recommendations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Recommendations */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-medium text-skin-darkgreen mb-4">
                  Your Personalized Recommendations
                </h2>
                
                {recommendedProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-skin-olive mb-4">
                      We couldn't find any products matching your specific criteria.
                    </p>
                    <Button 
                      onClick={resetForm}
                      className="bg-skin-beige text-skin-darkgreen hover:bg-skin-beige/90"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Different Options
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-skin-olive mb-4">
                      We found {recommendedProducts.length} product{recommendedProducts.length !== 1 ? 's' : ''} matching your criteria.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {recommendedProducts.map((product) => (
                        <AnimatedCard key={product.product_name} className="overflow-hidden">
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg text-skin-darkgreen mb-1">
                              {product.product_name}
                            </h3>
                            {product.brand && (
                              <p className="text-skin-olive text-sm mb-1">
                                {product.brand}
                              </p>
                            )}
                            <p className="font-medium text-skin-darkgreen mb-2">
                              {product.price}
                            </p>
                            {product.notable_effects && (
                              <p className="text-xs text-skin-olive mb-3">
                                <span className="font-medium">Effects:</span> {product.notable_effects}
                              </p>
                            )}
                            {product.product_link && (
                              <Button 
                                variant="outline" 
                                className="w-full border-skin-beige/30 mt-2"
                                asChild
                              >
                                <a href={product.product_link} target="_blank" rel="noopener noreferrer">
                                  View Product
                                </a>
                              </Button>
                            )}
                          </CardContent>
                        </AnimatedCard>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        variant="outline" 
                        onClick={resetForm}
                      >
                        Start Over
                      </Button>
                      <Button 
                        onClick={viewAllRecommendations}
                        className="bg-skin-beige text-skin-darkgreen hover:bg-skin-beige/90"
                      >
                        View All Products
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default ProductFinder;

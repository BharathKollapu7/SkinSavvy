import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product, FilterState } from '@/types/recommendations';
import { filterProducts } from '@/utils/recommendations';
import { useToast } from '@/hooks/use-toast';

export const useRecommendations = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [filters, setFilters] = useState<FilterState>({
    category: 'Face Wash',
    skinType: 'Normal',
    effects: [],
    brand: 'All Brands'
  });

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*');

      if (fetchError) {
        throw fetchError;
      }

      const productsArray = Array.isArray(data) ? data : [];
      setProducts(productsArray);

      setRecommendations([]);
    } catch (err) {
      setError('Failed to load products. Please refresh the page.');
      setProducts([]);
      setRecommendations([]);
      toast({
        title: 'Error Loading Products',
        description: 'Failed to load products. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Find recommendations based on filters or use provided results
  const findRecommendations = (searchResults?: Product[]) => {
    let filtered: Product[] = [];

    try {
      if (searchResults && Array.isArray(searchResults)) {
        filtered = searchResults;
      } else {
        if (!Array.isArray(products)) {
          filtered = [];
        } else {
          filtered = filterProducts(
            products,
            filters.category,
            filters.skinType,
            filters.effects,
            filters.brand
          );
        }
      }

      const safeFiltered = Array.isArray(filtered) ? filtered : [];
      setRecommendations(safeFiltered);

    } catch (err) {
      setRecommendations([]);
      toast({
        title: 'Error',
        description: 'Something went wrong while filtering products.',
        variant: 'destructive',
      });
    }
  };

  // Update filters and automatically find recommendations
  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);

    if (products.length > 0) {
      const filtered = filterProducts(
        products,
        newFilters.category,
        newFilters.skinType,
        newFilters.effects,
        newFilters.brand
      );
      setRecommendations(Array.isArray(filtered) ? filtered : []);
    }
  };

  // Reset filters and clear recommendations
  const resetFilters = () => {
    const defaultFilters = {
      category: 'Face Wash',
      skinType: 'Normal',
      effects: [],
      brand: 'All Brands'
    };
    setFilters(defaultFilters);
    setRecommendations([]);
    toast({
      title: 'Filters Reset',
      description: 'All filters have been cleared. Apply new filters to see recommendations.',
      variant: 'default',
    });
  };

  // Reset effects when category changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, effects: [] }));
  }, [filters.category]);

  // Fetch products on mount and reset state for new session
  useEffect(() => {
    setRecommendations([]);
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return {
    products: Array.isArray(products) ? products : [],
    recommendations: Array.isArray(recommendations) ? recommendations : [],
    loading,
    error,
    filters,
    updateFilters,
    findRecommendations,
    resetFilters,
    refetch: fetchProducts
  };
};

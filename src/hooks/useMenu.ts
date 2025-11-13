import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product, ProductVariation } from '../types';

export function useMenu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();

    // Set up real-time subscription for product changes with unique channel name
    const channelId = `products-realtime-${Date.now()}`;
    const productsChannel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('✅ Product changed:', payload);
          fetchProducts(); // Refetch all products when any change occurs
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'product_variations'
        },
        (payload) => {
          console.log('✅ Variation changed:', payload);
          fetchProducts(); // Refetch all products when variations change
        }
      )
      .subscribe((status) => {
        console.log('📡 Real-time subscription status:', status);
      });

    // Refetch data when window regains focus (user switches back from admin)
    const handleFocus = () => {
      console.log('👁️ Window focused - refreshing products...');
      fetchProducts();
    };

    // Also add visibility change handler for better cross-tab updates
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Tab became visible - refreshing products...');
        fetchProducts();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(productsChannel);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching products from database...');
      
      // Force fresh data by clearing any potential cache
      const timestamp = Date.now();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('available', true)
        .order('featured', { ascending: false })
        .order('name', { ascending: true });

      if (error) throw error;
      
      console.log(`📦 Found ${data?.length || 0} products`);
      
      // Fetch variations for each product
      const productsWithVariations = await Promise.all(
        (data || []).map(async (product) => {
          const { data: variations } = await supabase
            .from('product_variations')
            .select('*')
            .eq('product_id', product.id)
            .order('quantity_mg', { ascending: true });
          
          if (variations && variations.length > 0) {
            console.log(`  └─ ${product.name}: ${variations.length} variations, prices:`, variations.map(v => `${v.name}:₱${v.price}`));
          }
          
          return {
            ...product,
            variations: variations || []
          };
        })
      );

      console.log('✅ Products updated successfully at', new Date().toLocaleTimeString());
      setProducts(productsWithVariations);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('❌ Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setProducts([...products, data]);
      }
      return { success: true, data };
    } catch (err) {
      console.error('Error adding product:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add product' };
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setProducts(products.map(p => p.id === id ? data : p));
      }
      return { success: true, data };
    } catch (err) {
      console.error('Error updating product:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update product' };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting product:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete product' };
    }
  };

  const addVariation = async (variation: Omit<ProductVariation, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('product_variations')
        .insert([variation])
        .select()
        .single();

      if (error) throw error;
      
      // Refresh products to include new variation
      await fetchProducts();
      return { success: true, data };
    } catch (err) {
      console.error('Error adding variation:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add variation' };
    }
  };

  const updateVariation = async (id: string, updates: Partial<ProductVariation>) => {
    try {
      const { data, error } = await supabase
        .from('product_variations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh products to include updated variation
      await fetchProducts();
      return { success: true, data };
    } catch (err) {
      console.error('Error updating variation:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update variation' };
    }
  };

  const deleteVariation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('product_variations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Refresh products to remove variation
      await fetchProducts();
      return { success: true };
    } catch (err) {
      console.error('Error deleting variation:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete variation' };
    }
  };

  return {
    menuItems: products, // Keep the same name for backward compatibility
    products,
    loading,
    error,
    refreshProducts: fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    addVariation,
    updateVariation,
    deleteVariation
  };
}

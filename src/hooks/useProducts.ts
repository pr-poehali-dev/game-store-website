import { useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'robux' | 'accounts' | 'items';
  image: string;
  description?: string;
  original?: number;
  discount?: number;
  badges?: string[];
  rarity?: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  { id: 1, name: '800 Робаксов', price: 299, category: 'robux', image: '💎', original: 399, discount: 25 },
  { id: 2, name: '1700 Робаксов', price: 599, category: 'robux', image: '💎', original: 799, discount: 25 },
  { id: 3, name: '4500 Робаксов', price: 1499, category: 'robux', image: '💎', original: 1999, discount: 25 },
  { id: 4, name: 'Премиум аккаунт 2022', price: 1299, category: 'accounts', image: '👤', badges: ['Премиум', 'Редкие вещи'] },
  { id: 5, name: 'Старый аккаунт 2018', price: 2499, category: 'accounts', image: '👤', badges: ['Раритет', 'Лимитки'] },
  { id: 6, name: 'Dominus Empyreus', price: 5999, category: 'items', image: '🎩', rarity: 'Легендарный' },
  { id: 7, name: 'Valkyrie Helm', price: 3499, category: 'items', image: '⚔️', rarity: 'Эпический' },
];

const STORAGE_KEY = 'robloxshop_products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : DEFAULT_PRODUCTS;
      }
      return DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Failed to save products to localStorage:', error);
    }
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now() + Math.random(),
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addBulkProducts = (productsData: Array<Omit<Product, 'id'>>) => {
    const newProducts: Product[] = productsData.map(product => ({
      ...product,
      id: Date.now() + Math.random(),
    }));
    setProducts(prev => [...prev, ...newProducts]);
    return newProducts;
  };

  const getProductsByCategory = (category: 'robux' | 'accounts' | 'items') => {
    return products.filter(p => p.category === category);
  };

  const resetToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    addBulkProducts,
    getProductsByCategory,
    resetToDefaults,
  };
};
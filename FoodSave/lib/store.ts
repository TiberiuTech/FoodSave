import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserType = 'user' | 'business';
export type Language = 'ro' | 'en' | 'de' | 'fr';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
];

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  validUntil: string;
  location: string;
  distance: string;
  businessId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface AppState {
  // User Type
  userType: UserType;
  setUserType: (type: UserType) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Favorites
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Settings
  settings: {
    notifications: boolean;
    darkMode: boolean;
    language: Language;
  };
  updateSettings: (settings: Partial<AppState['settings']>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // User Type
      userType: 'user',
      setUserType: (type) => set({ userType: type }),
      
      // Cart
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id
          );
          
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      
      // Favorites
      favorites: [],
      toggleFavorite: (product) =>
        set((state) => {
          const isFavorite = state.favorites.some((p) => p.id === product.id);
          return {
            favorites: isFavorite
              ? state.favorites.filter((p) => p.id !== product.id)
              : [...state.favorites, product],
          };
        }),
      
      // Orders
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
          cart: [], // Clear cart after order
        })),
      
      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Settings
      settings: {
        notifications: true,
        darkMode: false,
        language: 'en',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'foodsave-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
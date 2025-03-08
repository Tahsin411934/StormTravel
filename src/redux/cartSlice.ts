// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  imgUrl: string;
  discount?: number; // Make discount optional
  available: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

// Helper function to load state from local storage
const loadState = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return { cart: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Could not load state from local storage", err);
    return { cart: [] };
  }
};

// Helper function to save state to local storage
const saveState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.warn("Could not save state to local storage", err);
  }
};

const initialState: CartState = loadState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity; // Increment quantity if item exists
      } else {
        state.cart.push({ ...action.payload }); // Add new item with quantity
      }
      saveState(state); // Save to local storage
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemInCart = state.cart.find((item) => item._id === id);
      if (itemInCart) {
        itemInCart.quantity = quantity; // Update quantity
      }
      saveState(state); // Save to local storage
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload); // Remove item by ID
      saveState(state); // Save to local storage
    },
    clearCart: (state) => {
      state.cart = []; // Clear the entire cart
      saveState(state); // Save to local storage
    },
  },
});

// Export actions
export const { addToCart, updateQuantity, removeItem, clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
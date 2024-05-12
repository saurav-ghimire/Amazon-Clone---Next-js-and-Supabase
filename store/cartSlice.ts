import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from 'redux-persist';
import { RootState } from './index';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
} 

const initialState: CartState = {
  cart: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingProductIndex = state.cart.findIndex(item => item.id === id);

      if (existingProductIndex !== -1) {
        // Product already exists in cart, increase quantity
        state.cart[existingProductIndex].quantity += 1;
      } else {
        // Product not in cart, add as new item
        state.cart.push({ id, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      if (isRehydrateAction(action) && action.payload?.cart?.cart) {
        // Rehydrate cart state from persisted state
        state.cart = action.payload.cart.cart;
      }
    });
    
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const getCart = (state: RootState) => state.cart.cart;
export default cartSlice.reducer;

// Type guard function to check if the action is of type REHYDRATE
function isRehydrateAction(action: any): action is { type: string; payload: any } {
  return action.type === REHYDRATE;
}

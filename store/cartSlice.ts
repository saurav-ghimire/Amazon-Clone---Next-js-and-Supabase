import { createSlice } from "@reduxjs/toolkit";
import {RootState} from './index'
interface CartState{
  cart:any
}
const initialState:CartState = {
  cart:[]
}
const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    addToCart:(state, action)=>{
      const { id } = action.payload;
      const existingProductIndex = state.cart.findIndex((item: { id: number }) => item.id === id);

      if (existingProductIndex !== -1) {
        // Product already exists in cart, increase quantity
        state.cart[existingProductIndex].quantity += 1;
      } else {
        // Product not in cart, add as new item
        state.cart.push({ id, quantity: 1 });
      }
    },
    removeFromCart:(state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item: { id: number }) => item.id !== id);
    }
  }
})

export const {addToCart, removeFromCart} = cartSlice.actions;
export const getCart = (state: RootState) => state.cart.cart
export default cartSlice.reducer;

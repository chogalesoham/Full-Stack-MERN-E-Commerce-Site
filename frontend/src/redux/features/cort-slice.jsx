import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotak: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log("Item Already Added");
      }
      state.selectedItems = setSelectedItem(state);
      state.totalPrice = setTotalPrice(state);
    },
  },
});

export const setSelectedItem = (state) => {
  state.products.reduce((total, product) => {
    return Number(total + product.quantity);
  });
};

export const setTotalPrice = (state) => {};

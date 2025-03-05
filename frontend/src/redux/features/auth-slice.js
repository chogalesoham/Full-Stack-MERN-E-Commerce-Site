import { createSlice } from "@reduxjs/toolkit";

const loadUsersFromLocalStorage = () => {
  try {
    const storageData = localStorage.getItem("user");
    if (storageData == null) return { user: null };
    return { user: JSON.parse(storageData) };
  } catch (error) {
    return { user: null };
  }
};
const initialState = loadUsersFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

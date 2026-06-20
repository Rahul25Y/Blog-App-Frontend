import { createSlice } from "@reduxjs/toolkit";
import { sanitizeUser } from "../services/api";

const initialToken = localStorage.getItem("token") || null;
let initialUser = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    // Sanitize any existing user data in local storage
    initialUser = sanitizeUser(JSON.parse(storedUser));
  }
} catch (e) {
  console.error("Failed to parse user from local storage", e);
}

const initialState = {
  user: initialUser,
  token: initialToken,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      const cleanUser = sanitizeUser(action.payload.user);
      state.user = cleanUser;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(cleanUser));
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      const cleanUser = sanitizeUser(action.payload);
      state.user = cleanUser;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(cleanUser));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { authStart, authSuccess, authFailure, updateProfileSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

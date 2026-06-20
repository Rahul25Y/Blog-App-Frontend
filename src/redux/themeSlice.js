import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initialTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.mode === "light" ? "dark" : "light";
      state.mode = newTheme;
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
      document.documentElement.setAttribute("data-theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

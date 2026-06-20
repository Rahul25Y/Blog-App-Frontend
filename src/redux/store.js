import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import blogReducer from "./blogSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    blog: blogReducer,
  },
});

export default store;

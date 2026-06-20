import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSun, FiMoon } from "react-icons/fi";
import { toggleTheme } from "../../redux/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      className="btn btn-link nav-link p-2 text-muted-custom hover-icon"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      style={{
        border: "none",
        background: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mode === "dark" ? (
        <FiSun size={20} className="text-warning fade-in-el" />
      ) : (
        <FiMoon size={20} className="text-dark fade-in-el" />
      )}
    </button>
  );
};

export default ThemeToggle;

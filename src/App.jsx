import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const mode = useSelector((state) => state.theme.mode);

  // Sync Redux theme state with the html attribute on mount and state changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <>
      <AppRoutes />
      
      {/* Toast notifications container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: mode === "dark" ? "#1E293B" : "#FFFFFF",
            color: mode === "dark" ? "#F8FAFC" : "#0F172A",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            fontSize: "0.9rem",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#2563EB",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
    </>
  );
}

export default App;

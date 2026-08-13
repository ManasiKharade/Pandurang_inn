import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// ⚠️ ORDER MATTERS: variables first, then reset, then typography
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/typography.css";
import "./styles/animations.css";
import "./styles/responsive.css";

// Keep this if global.css contains additional layout/component styles
import "./styles/global.css";
scrollRestoration = 'manual'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            duration: 3500,
            style: {
              zIndex: 999999,
              background: "#1a1a22",
              color: "#fff",
              border: "1px solid rgba(184, 134, 11, 0.3)"
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ReactLenis } from "lenis/react";
import { AlertProvider } from "./context/AlertContext.jsx";
// Fontsource imports
import "@fontsource/cormorant-garamond";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/merriweather";
import "@fontsource/merriweather/700.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AlertProvider>
          <ReactLenis root>
            <App />
          </ReactLenis>
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

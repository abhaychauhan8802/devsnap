import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { ThemeProvider } from "./context/theme-provider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>,
  // </StrictMode>,
);

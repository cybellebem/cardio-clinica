import { createRoot } from "react-dom/client";
import { AuthProvider } from "./auth/AuthContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./App"
import "./global.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
);
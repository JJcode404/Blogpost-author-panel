import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routes } from "./componets/routers/routers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./utilis/authContextapi";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

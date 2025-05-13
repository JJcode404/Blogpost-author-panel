import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./NoFound";
import { App } from "../App";
import { PostPreview } from "./PostPreview";
import { PostDraftProvider } from "../utilis/postDraftContext";

const routers = createBrowserRouter([
  {
    path: "users/author/:id",
    element: (
      <PostDraftProvider>
        <App />
      </PostDraftProvider>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/preview",
    element: (
      <PostDraftProvider>
        <PostPreview />
      </PostDraftProvider>
    ),
  },
]);

export { routers };

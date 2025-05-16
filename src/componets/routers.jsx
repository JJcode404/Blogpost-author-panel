import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./NoFound";
import { App } from "../App";
import { PostPreview } from "./PostPreview";
import { PostDraftProvider } from "../utilis/postDraftContext";
import { Forbidden } from "./forbiden";
import { Unauthorized } from "./unauthorized";

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
    path: "/forbiden",
    element: <Forbidden />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
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

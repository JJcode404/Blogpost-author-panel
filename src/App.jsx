import { AuthProvider } from "./utilis/authContextapi";
import { Header } from "./componets/header";
import { CommentsList } from "./componets/commentList";
import "./index.css";
import { PostsList } from "./componets/postList";
import { NewPostSection } from "./componets/Newpost";
import { Footer } from "./componets/footer.";
import { useParams } from "react-router";
import { PostDataProvider } from "./utilis/postContext";
import { useEffect } from "react";

function App() {
  const { id } = useParams();
  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    const token = params.get("token");
    console.log("here is the token", token);
    localStorage.setItem("jwt", token);
  });

  return (
    <AuthProvider>
      <div className="main">
        <Header />
        <PostDataProvider authorId={id}>
          <PostsList />
          <NewPostSection />
        </PostDataProvider>
        <CommentsList authorId={id} />
        <Footer />
      </div>
    </AuthProvider>
  );
}
export { App };

import { AuthProvider } from "./utilis/authContextapi";
import { Header } from "./componets/header";
import { CommentsList } from "./componets/commentList";
import "./index.css";
import { PostsList } from "./componets/postList";
import { NewPostSection } from "./componets/Newpost";
import { Footer } from "./componets/footer.";
function App() {
  return (
    <AuthProvider>
      <div className="main">
        <Header />
        <PostsList />
        <NewPostSection />
        <CommentsList />
        <Footer />
      </div>
    </AuthProvider>
  );
}
export { App };

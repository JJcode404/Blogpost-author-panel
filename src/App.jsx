import { AuthProvider } from "./utilis/authContextapi";
import { Header } from "./componets/header";
import { CommentsList } from "./componets/commentList";
import "./index.css";
import { PostsList } from "./componets/postList";
import { NewPostSection } from "./componets/Newpost";
import { Footer } from "./componets/footer.";
import { useParams } from "react-router";
import { PostDataProvider } from "./utilis/postContext";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const { id } = useParams();
  const [authReady, setAuthReady] = useState(false);
  const [userId, setUserId] = useState(id);

  // Extract and process token on initial load
  useEffect(() => {
    const setupToken = () => {
      try {
        // Extract token from URL parameters
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
          console.log("Token found in URL");

          // Validate token before storing
          try {
            const decoded = jwtDecode(token);

            // Check if token is expired
            const currentTime = Date.now() / 1000;
            if (decoded.exp && decoded.exp < currentTime) {
              console.error("Token is expired");
              localStorage.removeItem("jwt");
              return false;
            }

            // Check if userId matches the token's user id
            if (decoded.id && id && decoded.id.toString() !== id.toString()) {
              console.warn("Token user ID doesn't match route user ID");
            }

            // Store valid token in localStorage
            localStorage.setItem("jwt", token);

            // Clean URL after storing token (optional but recommended for security)
            if (window.history && window.history.replaceState) {
              const cleanUrl = window.location.pathname;
              window.history.replaceState({}, document.title, cleanUrl);
            }

            return true;
          } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem("jwt");
            return false;
          }
        } else {
          // If no token in URL, check localStorage
          const storedToken = localStorage.getItem("jwt");
          if (storedToken) {
            try {
              const decoded = jwtDecode(storedToken);
              // Token exists and is valid
              return true;
            } catch (error) {
              console.error("Invalid stored token:", error);
              localStorage.removeItem("jwt");
              return false;
            }
          }
        }

        return false;
      } catch (error) {
        console.error("Error setting up authentication:", error);
        return false;
      }
    };

    const isAuthenticated = setupToken();
    setAuthReady(true);
  }, [id]);

  if (!authReady) {
    return <div className="loading">Loading authentication...</div>;
  }

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

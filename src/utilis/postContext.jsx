import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext(null);

const PostDataProvider = ({ children, authorId }) => {
  const [posts, setPosts] = useState([]);
  const userId = authorId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/users/posts/${authorId}`
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) fetchPosts();
  }, [authorId]);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <PostContext.Provider
      value={{ posts, handleNewPost, loading, error, userId }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostDataProvider");
  }
  return context;
};

export { PostDataProvider, usePost };

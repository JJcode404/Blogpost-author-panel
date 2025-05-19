import { createContext, useContext, useEffect, useState } from "react";
import { usePatchReq } from "./usePatchReq";
import { useFetch } from "./userFetch";
import { useDeleteReq } from "./useDeleteReq";

const PostContext = createContext(null);

const PostDataProvider = ({ children, authorId }) => {
  const {
    data,
    loading: fetching,
    error: fetchingError,
    refetch,
  } = useFetch(
    `https://blog-post-api-posm.onrender.com/users/posts/${authorId}`
  );
  const { patchData, loading: patching, error: patchingError } = usePatchReq();
  const {
    deleteData,
    loading: deleting,
    error: deletingError,
  } = useDeleteReq();

  const [posts, setPosts] = useState([]);
  const userId = authorId;

  // Sync posts when data changes
  useEffect(() => {
    if (data) setPosts(data);
  }, [data]);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePublish = async (postId, currentStatus) => {
    try {
      await patchData(
        `https://blog-post-api-posm.onrender.com/posts/${postId}/publish`,
        {
          published: !currentStatus,
        }
      );
      await refetch(); // Refetch posts from useFetch
    } catch (err) {
      console.error("Failed to update publish status:", err);
    }
  };

  const deletePost = async (postId) => {
    try {
      await deleteData(
        `https://blog-post-api-posm.onrender.com/posts/${postId}`
      );
      await refetch(); // Refetch posts from useFetch
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const loading = fetching || patching || deleting;
  const error = fetchingError || patchingError || deletingError;

  return (
    <PostContext.Provider
      value={{
        posts,
        handleNewPost,
        updatePublish,
        deletePost,
        loading,
        error,
        userId,
      }}
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

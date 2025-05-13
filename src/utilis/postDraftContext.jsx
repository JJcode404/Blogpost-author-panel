// src/utilis/PostDraftContext.jsx
import { createContext, useContext, useState } from "react";

const PostDraftContext = createContext();

export function PostDraftProvider({ children }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  return (
    <PostDraftContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        tags,
        setTags,
        published,
        setPublished,
        thumbnailPreview,
        setThumbnailPreview,
        thumbnailFile,
        setThumbnailFile,
      }}
    >
      {children}
    </PostDraftContext.Provider>
  );
}

export function usePostDraft() {
  const context = useContext(PostDraftContext);
  if (!context) {
    throw new Error("usePostDraft must be used within a PostDraftProvider");
  }
  return context;
}

import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { usePost } from "../utilis/postContext";
import { usePostReq } from "../utilis/usePostReq";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { usePostDraft } from "../utilis/postDraftContext";

function NewPostSection() {
  const { handleNewPost, userId, loading: postLoading } = usePost();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { loading: reqLoading, postData } = usePostReq();
  const [thumbnailValid, setThumbnailValid] = useState(true);

  const {
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
  } = usePostDraft();

  const handleUploadBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
        setThumbnailValid(true);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview("Please upload a valid image file.");
      setThumbnailValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("authorId", userId);
    formData.append("published", published);

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    formData.append("tags", JSON.stringify(tagArray));
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    console.log("Form Data Content:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await postData("http://localhost:3000/posts", formData);
      console.log("this is the response form post data", response);

      handleNewPost(response);

      setTitle("");
      setContent("");
      setTags("");
      setThumbnailFile(null);
      setThumbnailPreview(null);
      setPublished(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handlePreview = () => {
    navigate("/preview");
  };

  return (
    <section id="new">
      {(postLoading || reqLoading) && <Loader />}
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your post title..."
        />

        <label htmlFor="thumbnail">Thumbnail</label>
        <div className="upload-box" onClick={handleUploadBoxClick}>
          {thumbnailPreview ? (
            typeof thumbnailPreview === "string" &&
            thumbnailPreview.startsWith("data:") ? (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {thumbnailPreview}
              </p>
            )
          ) : (
            <p>Click to upload or drag an image here</p>
          )}
        </div>

        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/jpeg,image/png,image/gif,image/webp"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g., tech, javascript"
        />

        <label htmlFor="content">Content</label>
        <Editor
          apiKey="9f9k5uzdnrutoftbl98w2rm2nmqn6gkeuvh0xldwh30hm7qd"
          onEditorChange={(newcontent) => setContent(newcontent)}
          value={content}
          init={{
            plugins: ["link", "image", "lists", "media", "wordcount"],
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image",
          }}
        />
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="published">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            &nbsp; Publish immediately
          </label>
        </div>

        <div className="action">
          <button
            type="submit"
            className="btn"
            disabled={!thumbnailValid}
            style={{ marginTop: "1rem" }}
          >
            Create Post
          </button>
          {content && (
            <button
              type="button"
              className="btn"
              onClick={handlePreview}
              style={{ marginTop: "1rem" }}
            >
              Preview
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export { NewPostSection };

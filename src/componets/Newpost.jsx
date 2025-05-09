import { useRef, useState } from "react";

function NewPostSection() {
  const fileInputRef = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleUploadBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="new">
      <h2>New Post</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter your post title..."
        />

        <label htmlFor="thumbnail">Thumbnail</label>
        <div className="upload-box" onClick={handleUploadBoxClick}>
          {thumbnailPreview ? (
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
            <p>Click to upload or drag an image here</p>
          )}
        </div>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          id="tags"
          placeholder="e.g., tech, javascript"
        />

        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          placeholder="Write your content here..."
        ></textarea>

        <button type="submit" className="btn" style={{ marginTop: "1rem" }}>
          Create Post
        </button>
      </form>
    </section>
  );
}

export { NewPostSection };

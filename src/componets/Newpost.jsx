import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function NewPostSection() {
  const fileInputRef = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const editorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log("Post Content:", content);
    }
  };

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
    } else {
      setThumbnailPreview(
        "The selected file is not a valid image. Please upload a .jpg, .png, or .gif file."
      );
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
        <Editor
          apiKey="9f9k5uzdnrutoftbl98w2rm2nmqn6gkeuvh0xldwh30hm7qd"
          init={{
            plugins: [
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "image",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
              "checklist",
              "mediaembed",
              "casechange",
              "formatpainter",
              "pageembed",
              "a11ychecker",
              "tinymcespellchecker",
              "permanentpen",
              "powerpaste",
              "advtable",
              "advcode",
              "editimage",
              "advtemplate",
              "ai",
              "mentions",
              "tinycomments",
              "tableofcontents",
              "footnotes",
              "mergetags",
              "autocorrect",
              "typography",
              "inlinecss",
              "markdown",
              "importword",
              "exportword",
              "exportpdf",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
          initialValue="Hellow, world!"
        />

        <button type="submit" className="btn" style={{ marginTop: "1rem" }}>
          Create Post
        </button>
      </form>
    </section>
  );
}

export { NewPostSection };

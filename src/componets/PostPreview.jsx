import { useNavigate } from "react-router-dom";
import { usePostDraft } from "../utilis/postDraftContext";
import styles from "../styles/PostPreview.module.css";

function PostPreview() {
  const navigate = useNavigate();
  const { title, content, tags, thumbnailPreview, published } = usePostDraft();

  const isEmpty =
    !title.trim() &&
    !content.trim() &&
    !tags.trim() &&
    !thumbnailPreview &&
    !published;

  if (isEmpty) {
    return (
      <section className={styles.container}>
        <p className={styles.emptyMessage}>Nothing to preview here.</p>
        <button className={styles.button} onClick={() => navigate(-1)}>
          Back to Edit
        </button>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      {thumbnailPreview && (
        <img
          src={thumbnailPreview}
          alt="Thumbnail Preview"
          className={styles.thumbnail}
        />
      )}

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <p className={styles.meta}>
        <strong>Tags:</strong> {tags}
      </p>
      <p className={styles.meta}>
        <strong>Published:</strong> {published ? "Yes" : "No"}
      </p>

      <button className={styles.button} onClick={() => navigate(-1)}>
        Back to Edit
      </button>
    </section>
  );
}

export { PostPreview };

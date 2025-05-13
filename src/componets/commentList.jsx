import { useState, useEffect } from "react";
import { format } from "date-fns";
import { usePatchReq } from "../utilis/usePatchReq";
import { useFetch } from "../utilis/userFetch";
import { useDeleteReq } from "../utilis/useDeleteReq";
import Loader from "./Loader";

function CommentsList({ authorId }) {
  const [page, setPage] = useState(1);
  const limit = 5;
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const {
    data,
    loading: fetching,
    error: fetchingError,
    refetch,
  } = useFetch(
    `http://localhost:3000/users/comments/${authorId}?page=${page}&limit=${limit}`
  );
  const { patchData, loading: patching, error: patchingError } = usePatchReq();
  const {
    deleteData,
    loading: deleting,
    error: deletingError,
  } = useDeleteReq();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    if (data) {
      setComments(data.comments);
      console.log(data);
    }
  }, [data]);

  const handleEditClick = (comment) => {
    console.log("here is the comment returned", comment);
    setSelectedComment(comment);
    setEditedContent(comment.content);
    setIsModalOpen(true);
  };
  const updateComment = async (comment) => {
    try {
      await patchData(`http://localhost:3000/comments/${comment.id}/`, {
        content: comment.content,
      });
      setSelectedComment(null);
      await refetch();
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };
  const deleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteData(`http://localhost:3000/comments/${commentId}`);
      await refetch();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <section id="comments">
      {(fetching || deleting || patching) && <Loader />}
      <h2>Manage Comments</h2>
      {isModalOpen && selectedComment && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Comment</h3>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={4}
              cols={50}
            />
            <div className="modal-actions">
              <button
                className="btn"
                onClick={async () => {
                  await updateComment({
                    ...selectedComment,
                    content: editedContent,
                  });
                  setIsModalOpen(false);
                }}
              >
                Save
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {comments.length === 0 && <p>No comments available.</p>}
      {comments.map((comment, index) => (
        <div className="comment" key={index}>
          <div className="left">
            <p>
              <strong>{comment.authorName || "Anonymous"}:</strong>{" "}
              {comment.content}
            </p>
            <p>
              <strong>Post title:</strong> {comment.postTitle}
            </p>
            <div className="action">
              <button className="btn" onClick={() => handleEditClick(comment)}>
                Edit
              </button>
              <button className="btn" onClick={() => deleteComment(comment.id)}>
                Delete
              </button>
            </div>
          </div>
          <div className="right">
            {format(new Date(comment.createdAt), "MMMM d, yyyy")}
          </div>
        </div>
      ))}

      <div className="pagination">
        <button
          className="btn"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export { CommentsList };

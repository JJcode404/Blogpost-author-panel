import { useState, useEffect } from "react";
import { format } from "date-fns";

function CommentsList({ authorId }) {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 5;

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/comments/user/${authorId}?page=${page}&limit=${limit}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setComments(data.comments);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [authorId, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching comments: {error.message}</p>;

  return (
    <section id="comments">
      <h2>Manage Comments</h2>
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
              <button className="btn">Edit</button>
              <button className="btn">Delete</button>
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
